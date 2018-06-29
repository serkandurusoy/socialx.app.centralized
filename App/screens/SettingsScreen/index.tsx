import noop from 'lodash/noop';
import React, {Component, RefObject} from 'react';
import {AsyncStorage} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';

import SettingsScreenComponent from './screen';

import {hideActivityIndicator, resetNavigationToRoute, showActivityIndicator} from 'backend/actions';
import {addMediaHoc, updateUserDataHoc, userHoc} from 'backend/graphql';
import {IUserDataResponse} from 'types/gql';

import {IBlobData} from 'ipfslib';
import {Signout} from 'utilities/amplify';
import {addFileBN} from 'utilities/ipfs';

import {ScreenHeaderButton} from 'components';
import {ipfsConfig as base} from 'configuration/ipfs';
import {Images} from 'theme';

export interface SettingsData {
	updatedAvatarImagePath: string | null;
	aboutText: string;
	firstName: string;
	lastName: string;
	email: string;
	miningEnabled: boolean;
}

interface ISettingsScreenProps {
	data: IUserDataResponse;
	// todo
	updateUserData: any;
	addMedia: any;
	navigation: NavigationScreenProp<any>;
	editingDataLoader: () => void;
	hideLoader: () => void;
}

interface IISettingsScreenState {
	avatarImage: any;
	aboutText?: string;
	firstName: string;
	lastName: string;
	email: string;
}

class SettingsScreen extends Component<ISettingsScreenProps, IISettingsScreenState> {
	public static getDerivedStateFromProps(
		nextProps: Readonly<ISettingsScreenProps>,
		prevState: Readonly<IISettingsScreenState>,
	) {
		const {data} = nextProps;
		if (!data.loading) {
			const avatarImage = data.user.avatar
				? {uri: `${base.ipfs_URL}${data.user.avatar.hash}`}
				: Images.user_avatar_placeholder;
			console.log(`AvatarImage: ${avatarImage.uri}`);
			// if (prevState.avatarImage) {
			// 	console.log(`Previous avatar: ${prevState.avatarImage.uri}`);
			// }
			return {
				avatarImage,
				aboutText: data.user.bio,
				firstName: data.user.name.split(' ')[0] || '',
				lastName: data.user.name.split(' ')[1] || '',
				email: data.user.email || '',
			};
		}
		return null;
	}

	private static navigationOptions = (props: ISettingsScreenProps) => ({
		title: 'SETTINGS',
		headerRight: <ScreenHeaderButton iconName={'ios-log-out'} onPress={() => SettingsScreen.runLogoutHandler(props)} />,
	});

	private static runLogoutHandler = async (props: ISettingsScreenProps) => {
		try {
			await Signout();
			await AsyncStorage.clear();
			resetNavigationToRoute('PreAuthScreen', props.navigation);
		} catch (ex) {
			//
			console.log(ex);
		}
	};

	public state = {
		avatarImage: null,
		aboutText: '',
		firstName: '',
		lastName: '',
		email: '',
	};

	private screenRef: RefObject<any> = React.createRef();

	public render() {
		const {data} = this.props;
		return (
			<SettingsScreenComponent
				avatarImage={this.state.avatarImage}
				aboutText={this.state.aboutText}
				firstName={this.state.firstName}
				lastName={this.state.lastName}
				email={this.state.email}
				miningEnabled={false} // later update hc value
				saveChanges={this.saveChanges}
				isLoading={data.loading}
				ref={this.screenRef}
			/>
		);
	}

	private handleImageChange = async (updatedAvatarImagePath: string | null, afterUpload: (mediaId: string) => void) => {
		if (!updatedAvatarImagePath) {
			afterUpload('');
			return null;
		}
		try {
			await addFileBN(updatedAvatarImagePath, noop, noop, noop, async (resp) => {
				const {Hash, Size} = JSON.parse(resp.responseBody);

				// NOTE: Add Media file on AppSync
				const qVar = {
					variables: {
						type: 'ProfileImage',
						size: parseInt(Size, undefined),
						hash: Hash,
					},
				};

				const addRes = await this.props.addMedia(qVar);
				afterUpload(addRes.data.addMedia.id);
			});
		} catch (e) {
			//
			console.log(e);
		}
	};

	private saveChanges = async (saveData: SettingsData) => {
		const {updateUserData, editingDataLoader, hideLoader, data} = this.props;

		editingDataLoader();

		await this.handleImageChange(saveData.updatedAvatarImagePath, async (avatar: string) => {
			try {
				const bio = saveData.aboutText || '';

				let mVar: any = null;
				if (avatar) {
					mVar = {
						variables: {
							name: `${saveData.firstName || ''} ${saveData.lastName || ''}`,
							email: saveData.email,
							bio,
							avatar,
						},
					};
				} else {
					mVar = {
						variables: {
							name: `${saveData.firstName || ''} ${saveData.lastName || ''}`,
							email: saveData.email,
							bio,
						},
					};
				}
				await updateUserData(mVar);
				await data.refetch();

				this.screenRef.current.getOriginalRef().current.resetChanges();
			} catch (e) {
				//
				console.log(e);
			}
			hideLoader();
		});
	};
}

const MapDispatchToProp = (dispatch: any) => ({
	editingDataLoader: () => dispatch(showActivityIndicator('Saving Your Data...')),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(
	null,
	MapDispatchToProp,
)(SettingsScreen as any);
const userDataWrapper = userHoc(reduxWrapper);
const addMediaWrapper = addMediaHoc(userDataWrapper);
const updateUserWrapper = updateUserDataHoc(addMediaWrapper);

export default updateUserWrapper;
