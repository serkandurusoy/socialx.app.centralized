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

import {AvatarName, AvatarPicker} from 'components/Avatar';
import {SXTextInput, TKeyboardKeys, TRKeyboardKeys} from 'components/Inputs';
import {IWithLoaderProps, withInlineLoader} from 'hoc';
import {IBlobData} from 'ipfslib';
import {Colors, Sizes} from 'theme';
import {SettingsData} from './index';
import style from './style';

interface ISettingsScreenComponentProps extends IWithLoaderProps {
	avatarImage: any;
	aboutText: string;
	firstName: string;
	lastName: string;
	username?: string;
	email: string;
	miningEnabled: boolean;
	saveChanges: (data: SettingsData) => void;
}

interface ISettingsScreenComponentState {
	avatarImage: any;
	aboutText: string;
	firstName: string;
	lastName: string;
	email: string;
	miningEnabled: boolean;
	selectedImage: boolean;
	hasChanges: boolean;
	localAvatarBase64: string | null;
}

class SettingsScreenComponent extends Component<ISettingsScreenComponentProps, ISettingsScreenComponentState> {
	public static getDerivedStateFromProps(
		nextProps: Readonly<ISettingsScreenComponentProps>,
		prevState: Readonly<ISettingsScreenComponentState>,
	) {
		if (!prevState.hasChanges) {
			return {
				avatarImage: nextProps.avatarImage,
				aboutText: nextProps.aboutText,
				firstName: nextProps.firstName,
				lastName: nextProps.lastName,
				email: nextProps.email,
				miningEnabled: nextProps.miningEnabled,
			};
		}
		return null;
	}

	public state = {
		avatarImage: this.props.avatarImage,
		aboutText: this.props.aboutText,
		firstName: this.props.firstName,
		lastName: this.props.lastName,
		email: this.props.email,
		miningEnabled: this.props.miningEnabled,
		selectedImage: false,
		hasChanges: false,
		localAvatarBase64: null,
	};

	public resetChanges = () => {
		this.setState({
			hasChanges: false,
			localAvatarBase64: null,
		});
	};

	public render() {
		// @ionut: todo -> add location-age fields
		return this.props.renderWithLoader(
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
							autoCapitalize={'sentences'}
							autoCorrect={true}
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
							autoCapitalize={'words'}
							autoCorrect={true}
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
							autoCapitalize={'words'}
							autoCorrect={true}
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
							autoCapitalize={'words'}
							autoCorrect={true}
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
					{/*initialValue={this.state.miningEnabled}*/}
					{/*valueUpdated={this.toggleMiningSetting}*/}
					{/*/>*/}
					{/*</View>*/}
				</KeyboardAwareScrollView>
				{this.renderSaveButton()}
			</View>,
		);
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
	};

	private getFullName = () => {
		return this.state.firstName + ' ' + this.state.lastName;
	};

	private updateAvatarImage = (base64Photo: string) => {
		const base64 = base64Photo.substring(base64Photo.indexOf(',') + 1, base64Photo.length);
		this.setState({
			avatarImage: {uri: base64Photo},
			hasChanges: true,
			selectedImage: true,
			localAvatarBase64: base64,
		});
	};

	private handleInputChangeText = (value: string, fieldName: string) => {
		const newState: any = {};
		newState[fieldName] = value;
		newState.hasChanges = true;
		this.setState(newState);
	};

	private toggleMiningSetting = (value: boolean) => {
		this.setState({
			hasChanges: true,
			miningEnabled: value,
		});
	};

	private saveChanges = () => {
		const saveData: SettingsData = {
			updatedAvatarImageBase64: this.state.localAvatarBase64,
			aboutText: this.state.aboutText,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			miningEnabled: this.state.miningEnabled,
		};
		this.props.saveChanges(saveData);
	};
}

export default withInlineLoader(SettingsScreenComponent as any, true);
