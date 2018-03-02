import React, {Component} from 'react';
import {ImageRequireSource, ImageURISource, Keyboard, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {AvatarPicker} from '../../components/AvatarPicker';
import {SXButton} from '../../components/Button';
import {SXTextInput, TKeyboardKeys, TRKeyboardKeys} from '../../components/TextInput';
import {Colors, Images} from '../../theme';
import style from './style';

export interface ISignUpScreenState {
	email: string;
	name: string;
	username: string;
	password: string;
	confirmPassword: string;
	avatarImage: ImageURISource | ImageRequireSource | null;
	updatedAvatarLocalURL: string | null;
}

export interface ISignUpScreenProps {
	navigation: NavigationScreenProp<any, any>;
}

export default class SignUpScreen extends Component<ISignUpScreenProps, ISignUpScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'REGISTER',
	};

	public state = {
		email: '',
		name: '',
		username: '',
		password: '',
		confirmPassword: '',
		updatedAvatarLocalURL: null,
		avatarImage: Images.user_avatar_placeholder,
	};

	private inputRefs: any = {};

	public render() {
		return (
			<KeyboardAwareScrollView
				style={style.keyboardView}
				contentContainerStyle={style.container}
				alwaysBounceVertical={false}
			>
				<View style={style.buttonContainer}>
					<SXButton label={'IMPORT FROM DOCK.IO'} borderColor={Colors.transparent} />
				</View>
				<Text style={style.orText}>{'or'}</Text>
				<AvatarPicker afterImagePick={this.updateAvatarImage} avatarImage={this.state.avatarImage} />
				<View style={[style.textInputContainer, style.textInputContainerFirst]}>
					<SXTextInput
						iconColor={Colors.iron}
						icon={'envelope'}
						placeholder={'Email'}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.next}
						onSubmitPressed={() => this.handleInputSubmitPressed('name')}
						onChangeText={(value) => this.handleInputChangeText(value, 'email')}
						keyboardType={TKeyboardKeys.emailAddress}
						ref={(ref: any) => this.updateInputRef(ref, 'email')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						iconColor={Colors.iron}
						icon={'user'}
						placeholder={'Name'}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.next}
						onSubmitPressed={() => this.handleInputSubmitPressed('username')}
						onChangeText={(value) => this.handleInputChangeText(value, 'name')}
						ref={(ref: any) => this.updateInputRef(ref, 'name')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						iconColor={Colors.iron}
						icon={'user'}
						placeholder={'Username'}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.next}
						onSubmitPressed={() => this.handleInputSubmitPressed('password')}
						onChangeText={(value) => this.handleInputChangeText(value, 'username')}
						ref={(ref: any) => this.updateInputRef(ref, 'username')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						isPassword={true}
						iconColor={Colors.iron}
						icon={'lock'}
						placeholder={'Password'}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.next}
						onSubmitPressed={() => this.handleInputSubmitPressed('confirmPassword')}
						onChangeText={(value) => this.handleInputChangeText(value, 'password')}
						ref={(ref: any) => this.updateInputRef(ref, 'password')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						isPassword={true}
						iconColor={Colors.iron}
						icon={'lock'}
						placeholder={'Confirm Password'}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.go}
						onSubmitPressed={this.startRegister}
						onChangeText={(value) => this.handleInputChangeText(value, 'confirmPassword')}
						ref={(ref: any) => this.updateInputRef(ref, 'confirmPassword')}
						blurOnSubmit={true}
					/>
				</View>
				<View style={[style.buttonContainer, style.registerButtonContainer]}>
					<SXButton label={'REGISTER NOW!'} borderColor={Colors.transparent} onPress={this.startRegister} />
				</View>
			</KeyboardAwareScrollView>
		);
	}

	private updateInputRef = (inputRef: SXTextInput, fieldName: string) => {
		this.inputRefs[fieldName] = inputRef;
	}

	private handleInputChangeText = (value: string, fieldName: string) => {
		const newState: any = {};
		newState[fieldName] = value;
		this.setState(newState);
	}

	private handleInputSubmitPressed = (nextInputRef: string) => {
		if (nextInputRef in this.inputRefs) {
			this.inputRefs[nextInputRef].focusInput();
		}
	}

	private startRegister = () => {
		// TODO: hookup register here
		// console.log(
		// 	'Start register',
		// 	this.state.email,
		// 	this.state.name,
		// 	this.state.username,
		// 	this.state.password,
		// 	this.state.confirmPassword,
		// 	this.state.updatedAvatarLocalURL,
		// );
		Keyboard.dismiss();
		this.props.navigation.navigate('SaveKeyScreen');
	}

	private updateAvatarImage = (localPath: string) => {
		this.setState({
			updatedAvatarLocalURL: localPath,
			avatarImage: {uri: 'file://' + localPath},
		});
	}
}
