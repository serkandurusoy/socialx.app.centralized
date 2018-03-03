import React, {Component} from 'react';
import {ImageRequireSource, ImageURISource, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationStackScreenOptions} from 'react-navigation';
import {AvatarName} from '../../components/AvatarName';
import {AvatarPicker} from '../../components/AvatarPicker';
import {SettingCheckbox} from '../../components/SettingCheckbox';
import {SXTextInput, TKeyboardKeys, TRKeyboardKeys} from '../../components/TextInput';
import {Images} from '../../theme';
import {Colors, Sizes} from '../../theme/';
import style from './style';

export interface ISignUpScreenState {
	avatarImage: string;
	updatedAvatarLocalURL: string | null;
	aboutText: string;
	firstName: string;
	lastName: string;
	email: string;
	hasChanges: boolean;
}

const INITIAL_STATE: Partial<ISignUpScreenState> = {
	avatarImage: Images.user_avatar_placeholder,
	updatedAvatarLocalURL: null,
	aboutText: 'This is my very start on the SocialX network',
	firstName: 'Marcel',
	lastName: 'Fussinger',
	email: 'marcel@socialx.network',
};

export default class SettingsScreen extends Component {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'SETTINGS',
	};

	public state = {hasChanges: false, ...INITIAL_STATE};

	public render() {
		return (
			<View style={{flex: 1}}>
				<KeyboardAwareScrollView
					style={style.keyboardView}
					contentContainerStyle={style.container}
					alwaysBounceVertical={false}
				>
					<View style={style.pickerContainer}>
						<AvatarPicker
							avatarImage={this.state.avatarImage}
							afterImagePick={this.updateAvatarImage}
							avatarSize={Sizes.smartHorizontalScale(103)}
						/>
					</View>
					<AvatarName fullName={'Marcel Fussinger'} username={'marcelfussinger'} />
					<View style={style.aboutContainer}>
						<SXTextInput
							value={this.state.aboutText}
							placeholder={'About you text'}
							borderColor={Colors.dustWhite}
							numberOfLines={3}
							onChangeText={(value) => this.handleInputChangeText(value, 'firstName')}
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
							onChangeText={(value) => this.handleInputChangeText(value, 'firstName')}
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
							onChangeText={(value) => this.handleInputChangeText(value, 'lastName')}
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
							onChangeText={(value) => this.handleInputChangeText(value, 'email')}
							keyboardType={TKeyboardKeys.emailAddress}
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.done}
						/>
					</View>
					<View style={style.miningContainer}>
						<SettingCheckbox
							title={'Mining (Beta)'}
							description={'Get rewarded for validating transactions within SocialX network'}
						/>
					</View>
				</KeyboardAwareScrollView>
				{this.renderSaveButton()}
			</View>
		);
	}

	private renderSaveButton = () => {
		if (this.state.hasChanges) {
			return <View style={style.bottomContainer} />;
		}
		return null;
	}

	private updateAvatarImage = (localPath: string) => {
		this.setState({
			updatedAvatarLocalURL: localPath,
			avatarImage: {uri: 'file://' + localPath},
			hasChanges: true,
		});
	}

	private handleInputChangeText = (value: string, fieldName: string) => {
		const newState: any = {};
		newState[fieldName] = value;
		newState.hasChanges = true;
		this.setState(newState);
	}

	// private saveChanges = () => {
	//
	// }
}
