import noop from 'lodash/noop';
import React from 'react';
import {AsyncStorage, ImageSourcePropType, ImageURISource} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, resetNavigationToRoute, showActivityIndicator} from 'backend/actions';
import {addMediaHoc, updateUserDataHoc, userHoc} from 'backend/graphql';
import {ScreenHeaderButton} from 'components';
import {ipfsConfig as base} from 'configuration';
import {ModalManager} from 'hoc';
import {Images} from 'theme';
import {IUserDataResponse} from 'types/gql';
import {addFileBN, IWithTranslationProps, withTranslations } from 'utilities';
import {Signout} from 'utilities/amplify';
import SettingsScreenComponent from './screen';

export interface SettingsData {
	aboutText: string;
	firstName: string;
	lastName: string;
	email: string;
	miningEnabled: boolean;
	avatarImage: ImageSourcePropType;
	username: string;
}

interface ISettingsScreenProps extends IWithTranslationProps {
	data: IUserDataResponse;
	updateUserData: any;
	addMedia: any;
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
	editingDataLoader: () => void;
	hideLoader: () => void;
}

// TODO: this is a workaround to know when avatar image was updated and requires upload at save
// why? because in Formik handleSubmit there is no proper way to know what fields were touched?
let lastSavedAvatarImage: string;

const runLogoutHandler = async (navigation: NavigationScreenProp<any>) => {
	try {
		await Signout();
		await AsyncStorage.clear();
		resetNavigationToRoute('PreAuthScreen', navigation);
	} catch (e) {
		console.log(e);
	}
};

const saveErrorHandler = (e: Error, hideLoader: () => void) => {
	console.log(e);
	hideLoader();
	ModalManager.safeRunAfterModalClosed(() => {
		alert('Save error: ' + e.message);
	});
};

const uploadAvatarImage = async (
	updatedAvatarImagePath: string | undefined,
	addMedia: any,
	hideLoader: () => void,
	afterUpload: (mediaId: string) => void,
) => {
	if (!updatedAvatarImagePath) {
		afterUpload('');
		return null;
	}
	try {
		await addFileBN(updatedAvatarImagePath, noop, noop, noop, async (resp) => {
			try {
				const {Hash, Size} = JSON.parse(resp.responseBody);
				// NOTE: Add Media file on AppSync
				const qVar = {
					variables: {
						type: 'ProfileImage',
						size: parseInt(Size, undefined),
						hash: Hash,
					},
				};
				const addRes = await addMedia(qVar);
				lastSavedAvatarImage = updatedAvatarImagePath;
				afterUpload(addRes.data.addMedia.id);
			} catch (e) {
				saveErrorHandler(e, hideLoader);
			}
		});
	} catch (e) {
		saveErrorHandler(e, hideLoader);
	}
};

const saveChanges = async (saveData: SettingsData, props: ISettingsScreenProps) => {
	// TODO: check with @Serkan what is the best error handling for save.
	// Here save is a sample case with many async calls + callbacks.
	// TODO: later decide if we have any server side field errors

	const updatedLocalAvatarImage =
		!!saveData.avatarImage.uri && saveData.avatarImage.uri !== lastSavedAvatarImage
			? (saveData.avatarImage as ImageURISource).uri
			: undefined;

	const {updateUserData, editingDataLoader, hideLoader, addMedia} = props;

	editingDataLoader();

	await uploadAvatarImage(updatedLocalAvatarImage, addMedia, hideLoader, async (avatar: string) => {
		try {
			const baseVar = {
				name: `${saveData.firstName} ${saveData.lastName}`,
				email: saveData.email,
				bio: saveData.aboutText,
			};
			await updateUserData({variables: avatar ? {...baseVar, avatar} : baseVar});
			hideLoader();
		} catch (e) {
			saveErrorHandler(e, hideLoader);
		}
	});
};

const SettingsScreen: React.SFC<ISettingsScreenProps> = (props) => {
	const {data} = props;
	let aboutText = '';
	let firstName = '';
	let lastName = '';
	let userEmail = '';
	let userName = '';
	let avatarImage = Images.user_avatar_placeholder;
	const miningEnabled = false; // later update HC value here!
	if (!data.loading && data && data.user) {
		const {bio, name, email, username, avatar} = data.user;
		if (avatar) {
			lastSavedAvatarImage = `${base.ipfs_URL}${avatar.hash}`;
			avatarImage = {uri: `${base.ipfs_URL}${avatar.hash}`};
		}
		aboutText = bio || '';
		firstName = name.split(' ')[0] || '';
		lastName = name.split(' ')[1] || '';
		userEmail = email || '';
		userName = username;
	}

	return (
		<SettingsScreenComponent
			isLoading={data.loading}
			aboutText={aboutText}
			firstName={firstName}
			lastName={lastName}
			email={userEmail}
			miningEnabled={miningEnabled}
			avatarImage={avatarImage}
			username={userName}
			onSaveChanges={(saveData: SettingsData) => saveChanges(saveData, props)}
		/>
	);
};

SettingsScreen.navigationOptions = ({navigation, navigationOptions}: ISettingsScreenProps) => ({
	title: navigationOptions.getText('settings.screen.title'),
	headerRight: <ScreenHeaderButton iconName={'ios-log-out'} onPress={() => runLogoutHandler(navigation)} />,
});

const MapDispatchToProp = (dispatch: any, {getText}: ISettingsScreenProps) => ({
	editingDataLoader: () => dispatch(showActivityIndicator(getText('settings.screen.saving.data'))),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

export default compose(
	updateUserDataHoc,
	addMediaHoc,
	userHoc,
	withTranslations,
	connect(
		null,
		MapDispatchToProp,
	),
)(SettingsScreen as any);
