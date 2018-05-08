import {AvatarName, AvatarPicker} from 'components/Avatar';
import {SettingCheckbox, SXTextInput, TKeyboardKeys, TRKeyboardKeys} from 'components/Inputs';
import {SXButton} from 'components/Interaction';
import React, {Component} from 'react';
import {
	AsyncStorage,
	ImageRequireSource,
	ImageURISource,
	Text,
	TouchableOpacity,
	View,
	ViewAsyncStroage,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {connect, Dispatch} from 'react-redux';
import {Colors, Images, Sizes} from 'theme';
import style from './style';

import {addMediaHoc, createUpdateUserHoc, updateUserDataHoc, userHoc} from 'backend/graphql';
import {IUserDataResponse} from 'types/gql';

import {hideActivityIndicator, resetNavigationToRoute, showActivityIndicator} from 'backend/actions';

import {IBlobData} from 'ipfslib';
import {Signout} from 'utilities/amplify';
import {addBlob} from 'utilities/ipfs';

import RNFS from 'react-native-fs';

import {ipfsConfig as base} from 'configuration/ipfs';
const imagePlaceHolder = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

export interface SettingsData {
	updatedAvatarImageBase64: string | null;
	aboutText: string;
	firstName: string;
	lastName: string;
	email: string;
	miningEnabled: boolean;
}

interface ISettingsScreenProps {
	avatarImage: any;
	aboutText: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	miningEnabled: boolean;
	saveChanges: (data: SettingsData) => void;
	data: IUserDataResponse;
	// todo
	updateUserData: any;
	addMedia: any;
	navigation: NavigationScreenProp<any>;
	editingDataLoader: () => void;
	hideLoader: () => void;
}

interface IISettingsScreenState {
	hasChanges: boolean;
	avatarImage: any;
	aboutText: string;
	firstName: string;
	lastName: string;
	email: string;
}

class SettingsScreen extends Component<ISettingsScreenProps, IISettingsScreenState> {
	public static defaultProps: Partial<ISettingsScreenProps> = {
		avatarImage: Images.user_avatar_placeholder,
		aboutText: '',
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		miningEnabled: false,
		saveChanges: () => alert('saveChanges prop missing!'),
	};

	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'SETTINGS',
		headerRight: <View />,
	};

	public state = {
		hasChanges: false,
		avatarImage: this.props.avatarImage,
		aboutText: this.props.aboutText,
		firstName: this.props.firstName,
		lastName: this.props.lastName,
		email: this.props.email,
	};

	private updatedAvatarImageBase64: string | null = null;
	private miningEnabled: boolean = this.props.miningEnabled;

	public componentWillReceiveProps(nextProp: ISettingsScreenProps) {
		const {data} = nextProp;
		if (data.loading) {
			return;
		}

		const avatarImage = data.user.avatar ? `${base.ipfs_URL}${data.user.avatar.hash}` : imagePlaceHolder;
		console.log(`AvatarImage: ${avatarImage}`);

		this.setState({
			avatarImage: {url: avatarImage},
			aboutText: data.user.bio,
			firstName: data.user.name.split(' ')[0],
			lastName: data.user.name.split(' ')[1],
			email: data.user.email,
		});
	}

	public render() {
		const {data} = this.props;
		if (data.loading) {
			// TODO: Add loader here...
			return (
				<View>
					<Text>Loading...</Text>
				</View>
			);
		}

		return (
			<View style={{flex: 1}}>
				<KeyboardAwareScrollView
					style={style.keyboardView}
					contentContainerStyle={style.container}
					alwaysBounceVertical={false}
					enableOnAndroid={true}
					keyboardShouldPersistTaps={'handled'}
				>
					<View style={style.pickerContainer}>
						<AvatarPicker
							avatarImage={this.state.avatarImage}
							afterImagePick={this.updateAvatarImage}
							avatarSize={Sizes.smartHorizontalScale(103)}
						/>
					</View>
					<AvatarName
						fullName={this.getFullName()}
						username={this.props.username}
						fullNameColor={Colors.postFullName}
						userNameColor={Colors.postHour}
					/>
					<View style={style.aboutContainer}>
						<SXTextInput
							value={this.state.aboutText}
							placeholder={'About you text'}
							borderColor={Colors.dustWhite}
							multiline={true}
							onChangeText={(value: string) => this.handleInputChangeText(value, 'aboutText')}
						/>
					</View>
					<Text style={style.personalDetails}>{'PERSONAL DETAILS'}</Text>
					<View style={[style.textInputContainer, style.textInputContainerFirst]}>
						<SXTextInput
							value={this.state.firstName}
							iconColor={Colors.iron}
							placeholder={'First name'}
							placeholderColor={Colors.postText}
							borderColor={Colors.transparent}
							onChangeText={(value: string) => this.handleInputChangeText(value, 'firstName')}
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.done}
						/>
					</View>
					<View style={[style.textInputContainer]}>
						<SXTextInput
							value={this.state.lastName}
							iconColor={Colors.iron}
							placeholder={'Last name'}
							placeholderColor={Colors.postText}
							borderColor={Colors.transparent}
							onChangeText={(value: string) => this.handleInputChangeText(value, 'lastName')}
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.done}
						/>
					</View>
					<View style={[style.textInputContainer]}>
						<SXTextInput
							value={this.state.email}
							iconColor={Colors.iron}
							placeholder={'Email'}
							placeholderColor={Colors.postText}
							borderColor={Colors.transparent}
							onChangeText={(value: string) => this.handleInputChangeText(value, 'email')}
							keyboardType={TKeyboardKeys.emailAddress}
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.done}
						/>
					</View>
					<View>
						<SXButton
							label={'Sign Out'}
							autoWidth={true}
							borderColor={Colors.transparent}
							onPress={this.performSignOut}
							style={{ marginTop: '20%' }}
						/>
					</View>
					{/*<View style={style.miningContainer}>*/}
					{/*<SettingCheckbox*/}
					{/*title={'Mining (Beta)'}*/}
					{/*description={'Get rewarded for validating transactions within SocialX network'}*/}
					{/*initialValue={this.props.miningEnabled}*/}
					{/*valueUpdated={this.toggleMiningSetting}*/}
					{/*/>*/}
					{/*</View>*/}
				</KeyboardAwareScrollView>
				{this.renderSaveButton()}
			</View>
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
	};

	private getFullName = () => {
		return this.state.firstName + ' ' + this.state.lastName;
	};

	private renderSaveButton = () => {
		if (this.state.hasChanges) {
			return (
				<View style={style.bottomContainer}>
					<TouchableOpacity style={style.saveButton} onPress={this.saveChanges}>
						<Text style={style.saveButtonText}>{'Save'}</Text>
						<Icon name={'check'} size={Sizes.smartHorizontalScale(30)} color={Colors.green} />
					</TouchableOpacity>
				</View>
			);
		}
		return null;
	};

	private updateAvatarImage = (base64Photo: string) => {
		this.setState({
			avatarImage: {uri: base64Photo},
			hasChanges: true,
		});
		this.updatedAvatarImageBase64 = base64Photo;
	};

	private handleInputChangeText = (value: string, fieldName: string) => {
		const newState: any = {};
		newState[fieldName] = value;
		newState.hasChanges = true;
		this.setState(newState);
	};

	private toggleMiningSetting = (value: boolean) => {
		this.miningEnabled = value;
		if (value !== this.props.miningEnabled) {
			this.setState({
				hasChanges: true,
			});
		}
	};

	private handleImageChange = async () => {
		const {addMedia} = this.props;
		try {
			if (!this.updatedAvatarImageBase64) {
				return null;
			}
			// NOTE: Uppload image to IPFS
			let ipfsRes = await addBlob([{fileName: 'ProfileImage.jpg', data: this.updatedAvatarImageBase64, name: 'ProfileImage'}]);
			ipfsRes = JSON.parse(ipfsRes.data);
			console.log(ipfsRes);
			// NOTE: Add Midea file on AppSync
			const qVar = {
				variables: {
					hash: ipfsRes.Hash,
					type: 'ProfileImage',
					size: parseInt(ipfsRes.Size, undefined),
				},
			};

			const addRes = await addMedia(qVar);
			console.log(addRes.data);
			return addRes.data.addMedia.id;
		} catch (e) {
			//
			console.log(e);
		}
	};

	private saveChanges = async () => {
		const {updateUserData, editingDataLoader, hideLoader, data} = this.props;
		const saveData: SettingsData = {
			updatedAvatarImageBase64: this.updatedAvatarImageBase64,
			aboutText: this.state.aboutText,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			miningEnabled: this.miningEnabled,
		};
		// this.props.saveChanges(saveData);

		editingDataLoader();
		try {
			const avatar = (await this.handleImageChange()) || '';
			const bio = saveData.aboutText || '';
			console.log(`image: ${avatar}`);

			const mVar = {
				variables: {
					name: `${saveData.firstName || ''} ${saveData.lastName || ''}`,
					email: saveData.email,
					bio,
					avatar,
				},
			};
			console.log(mVar);

			await updateUserData(mVar);
			await data.refetch();

			this.setState({hasChanges: false});
		} catch (e) {
			//
			console.log(e);
		}

		hideLoader();
	};
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
