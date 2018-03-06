import React, {Component} from 'react';
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp} from 'react-navigation';
import {SXButton} from '../../components/Button';
import {SXTextInput, TKeyboardKeys, TRKeyboardKeys} from '../../components/TextInput';
import {Colors} from '../../theme/';
import UploadKeyScreen from '../UploadKeyScreen';
import style from './style';

export interface ILoginScreenState {
	emailValue: string;
	passwordValue: string;
}

export interface ILoginScreenProps {
	navigation: NavigationScreenProp<any, any>;
}

export default class LoginScreen extends Component<ILoginScreenProps, ILoginScreenState> {
	private static navigationOptions = {
		headerTitle: 'LOGIN',
	};

	public state = {
		emailValue: '',
		passwordValue: '',
	};

	private passwordInput: SXTextInput | null = null;

	public render() {
		return (
			<KeyboardAwareScrollView
				style={style.keyboardView}
				contentContainerStyle={style.container}
				alwaysBounceVertical={false}
				keyboardDismissMode='interactive'
			>
				<Text style={style.welcomeText}>{'Welcome Back!'}</Text>
				<SXTextInput
					placeholder={'Email'}
					placeholderColor={Colors.postText}
					returnKeyType={TRKeyboardKeys.next}
					onSubmitPressed={this.emailSubmitPressedHandler}
					onChangeText={this.handleEmailInputKeyPressed}
					keyboardType={TKeyboardKeys.emailAddress}
				/>
				<View style={style.passwordContainer}>
					<SXTextInput
						placeholder={'Password'}
						placeholderColor={Colors.postText}
						returnKeyType={TRKeyboardKeys.go}
						onSubmitPressed={this.startLogin}
						onChangeText={this.handlePasswordInputKeyPressed}
						isPassword={true}
						blurOnSubmit={true}
						ref={(component) => (this.passwordInput = component)}
					/>
				</View>
				<SXButton
					label={'LOGIN'}
					onPress={this.startLogin}
					disabled={!this.state.passwordValue || !this.state.emailValue}
					borderColor={Colors.transparent}
				/>
				<TouchableOpacity onPress={this.navigateToPasswordForgotScreen} style={style.forgotPassword}>
					<Text style={style.forgotPasswordText}>{'Forgot your password'}</Text>
				</TouchableOpacity>
				<SXButton
					label={'Or use unlock file'}
					onPress={this.selectUnlockFileHandler}
					borderColor={Colors.transparent}
				/>
				<View style={style.noAccountContainer}>
					<Text style={style.noAccountQuestion}>{'Don\'t have an account?'}</Text>
					<TouchableOpacity onPress={this.navigateToSignUpScreen}>
						<Text style={style.signUpText}>{'Sign up'}</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAwareScrollView>
		);
	}

	private navigateToPasswordForgotScreen = () => {
		Keyboard.dismiss();
		this.props.navigation.navigate('ForgotPasswordScreen');
	}

	private navigateToSignUpScreen = () => {
		Keyboard.dismiss();
		this.props.navigation.navigate('SignUpScreen');
	}

	private emailSubmitPressedHandler = () => {
		if (this.passwordInput) {
			this.passwordInput.focusInput();
		}
	}

	private handleEmailInputKeyPressed = (value: string) => {
		this.setState({
			emailValue: value,
		});
	}

	private handlePasswordInputKeyPressed = (value: string) => {
		this.setState({
			passwordValue: value,
		});
	}

	private startLogin = () => {
		// TODO: hookup login here
		// console.log('Start login: ' + this.state.emailValue + ' : ' + this.state.passwordValue);
		Keyboard.dismiss();
		this.props.navigation.navigate('SettingsScreen');
	}

	private selectUnlockFileHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.navigate('UploadKeyScreen');
	}
}
