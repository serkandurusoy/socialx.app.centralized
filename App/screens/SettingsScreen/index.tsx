import React, {Component} from 'react';
import {
	AsyncStorage,
	ImageRequireSource,
	ImageURISource,
	InteractionManager,
	Text,
	TouchableOpacity,
	View,
	ViewAsyncStroage,
} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';

import SettingsScreenComponent from './screen';

import {hideActivityIndicator, resetNavigationToRoute, showActivityIndicator} from 'backend/actions';
import {addMediaHoc, createUpdateUserHoc, updateUserDataHoc, userHoc} from 'backend/graphql';
import {IUserDataResponse} from 'types/gql';

import {IBlobData} from 'ipfslib';
import {Signout} from 'utilities/amplify';
import {addBlob} from 'utilities/ipfs';

import {ScreenHeaderButton} from 'components';
import {ipfsConfig as base} from 'configuration/ipfs';
import {Images} from 'theme';

export interface SettingsData {
	updatedAvatarImageBase64: string | null;
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
		headerRight: <ScreenHeaderButton iconName={'md-log-out'} onPress={() => SettingsScreen.runLogoutHandler(props)} />,
	})

	private static runLogoutHandler = (props: ISettingsScreenProps) => {
		props.navigation.state.params.logoutHandler();
	}

	public state = {
		avatarImage: null,
		aboutText: '',
		firstName: '',
		lastName: '',
		email: '',
	};

	private screenRef: any;

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({logoutHandler: this.performSignOut});
		});
	}

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
				ref={(ref) => (this.screenRef = ref)}
			/>
		);
	}

	private performSignOut = async () => {
		try {
			await Signout();
			await AsyncStorage.clear();
			resetNavigationToRoute('PreAuthScreen', this.props.navigation);
		} catch (ex) {
			//
			console.log(ex);
		}
	}

	private handleImageChange = async (updatedAvatarImageBase64: string | null) => {
		const {addMedia} = this.props;
		try {
			if (!updatedAvatarImageBase64) {
				return null;
			}

			// NOTE: Uppload image to IPFS
			let ipfsRes = await addBlob([
				{filename: 'ProfileImage.jpeg', data: updatedAvatarImageBase64, name: 'ProfileImage'},
			]);
			ipfsRes = JSON.parse(ipfsRes.data);
			// NOTE: Add Media file on AppSync
			const qVar = {
				variables: {
					hash: ipfsRes.Hash,
					type: 'ProfileImage',
					size: parseInt(ipfsRes.Size, undefined),
				},
			};

			const addRes = await addMedia(qVar);
			return addRes.data.addMedia.id;
		} catch (e) {
			//
			console.log(e);
		}
	}

	private saveChanges = async (saveData: SettingsData) => {
		const {updateUserData, editingDataLoader, hideLoader, data} = this.props;

		editingDataLoader();
		try {
			const avatar = (await this.handleImageChange(saveData.updatedAvatarImageBase64)) || '';
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

			this.screenRef.getOriginalRef().resetChanges();
		} catch (e) {
			//
			console.log(e);
		}

		hideLoader();
	}
}

const MapDispatchToProp = (dispatch: any) => ({
	editingDataLoader: () => dispatch(showActivityIndicator('Saving Your Data...')),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(null, MapDispatchToProp)(SettingsScreen as any);
const userDataWrapper = userHoc(reduxWrapper);
const addMediaWrapper = addMediaHoc(userDataWrapper);
// const updateUserWrapper = createUpdateUserHoc(addMediaWrapper);
const updateUserWrapper = updateUserDataHoc(addMediaWrapper);

export default updateUserWrapper;
