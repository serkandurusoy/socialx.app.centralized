import {AvatarName, AvatarPicker} from 'components/Avatar';
import {SettingCheckbox, SXTextInput, TKeyboardKeys, TRKeyboardKeys} from 'components/Inputs';
import React, {Component} from 'react';
import {ImageRequireSource, ImageURISource, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationStackScreenOptions} from 'react-navigation';
import {Colors, Images, Sizes} from 'theme/';
import style from './style';

import {addMediaHoc, createUpdateUserHoc, userHoc} from 'backend/graphql';
import {IUserDataResponse} from 'types';

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
	createUser: any;
	addMedia: any;
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

	public render() {
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

	private getFullName = () => {
		return this.state.firstName + ' ' + this.state.lastName;
	}

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
	}

	private updateAvatarImage = (base64Photo: string) => {
		this.setState({
			avatarImage: {uri: base64Photo},
			hasChanges: true,
		});
		this.updatedAvatarImageBase64 = base64Photo;
	}

	private handleInputChangeText = (value: string, fieldName: string) => {
		const newState: any = {};
		newState[fieldName] = value;
		newState.hasChanges = true;
		this.setState(newState);
	}

	private toggleMiningSetting = (value: boolean) => {
		this.miningEnabled = value;
		if (value !== this.props.miningEnabled) {
			this.setState({
				hasChanges: true,
			});
		}
	}

	private saveChanges = () => {
		const saveData: SettingsData = {
			updatedAvatarImageBase64: this.updatedAvatarImageBase64,
			aboutText: this.state.aboutText,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			miningEnabled: this.miningEnabled,
		};
		this.props.saveChanges(saveData);
	}
}

const userDataWrapper = userHoc(SettingsScreen);
const addMediaWrapper = addMediaHoc(userDataWrapper);
const updateUserWrapper = createUpdateUserHoc(addMediaWrapper);

export default updateUserWrapper;
