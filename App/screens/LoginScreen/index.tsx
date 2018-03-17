import React, {Component} from 'react';
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp} from 'react-navigation';
import {SXButton} from '../../components/Button';
import {ModalInputSMSCode} from '../../components/ModalInputSMSCode';
import {SXTextInput, TKeyboardKeys, TRKeyboardKeys} from '../../components/TextInput';
import {Colors} from '../../theme/';
import UploadKeyScreen from '../UploadKeyScreen';
import style from './style';

const PHONE_NUMBER = '+40721205279';

export interface ILoginScreenState {
	emailValue: string;
	passwordValue: string;
	showModalForSMSCode: boolean;
}

export interface ILoginScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class LoginScreen extends Component<ILoginScreenProps, ILoginScreenState> {
	private static navigationOptions = {
		headerTitle: 'LOGIN',
	};

	public state = {
		emailValue: '',
		passwordValue: '',
		showModalForSMSCode: false,
	};

	private passwordInput: SXTextInput | null = null;

	public render() {
		return (
			<KeyboardAwareScrollView
				style={style.keyboardView}
				contentContainerStyle={style.container}
				alwaysBounceVertical={false}
				keyboardDismissMode='interactive'
				keyboardShouldPersistTaps={'handled'}
			>
				<ModalInputSMSCode
					visible={this.state.showModalForSMSCode}
					confirmHandler={this.smsCodeConfirmedHandler}
					declineHandler={this.smsCodeDeclinedHandler}
					resendHandler={this.smsCodeResendHandler}
					phoneNumber={PHONE_NUMBER}
				/>
				<Text style={style.welcomeText}>{'Welcome Back!'}</Text>
				<SXTextInput
					placeholder={'Username'}
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
						onSubmitPressed={() => this.toggleVisibleModalSMS()}
						onChangeText={this.handlePasswordInputKeyPressed}
						isPassword={true}
						ref={(component) => (this.passwordInput = component)}
					/>
				</View>
				<SXButton
					label={'LOGIN'}
					onPress={() => this.toggleVisibleModalSMS()}
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

	private toggleVisibleModalSMS = (visible = true) => {
		Keyboard.dismiss();
		this.setState({
			showModalForSMSCode: visible,
		});
	}

	private selectUnlockFileHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.navigate('UploadKeyScreen');
	}

	private smsCodeConfirmedHandler = () => {
		// console.log('TODO: Start login', this.state.emailValue, this.state.passwordValue);
		this.toggleVisibleModalSMS(false);
		this.props.navigation.navigate('MainScreen');
	}

	private smsCodeDeclinedHandler = () => {
		this.toggleVisibleModalSMS(false);
		// console.log('TODO: smsCodeDeclinedHandler');
	}

	private smsCodeResendHandler = () => {
		this.toggleVisibleModalSMS(false);
		// console.log('TODO: smsCodeResendHandler');
	}
}
