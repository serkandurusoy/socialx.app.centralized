import React, {Component} from 'react';
import {Alert, AsyncStorage, Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {SXButton} from '../../components/Button';
import {ModalInputSMSCode} from '../../components/ModalInputSMSCode';
import {SXTextInput, TKeyboardKeys, TRKeyboardKeys} from '../../components/TextInput';
import {Colors} from '../../theme/';
import UploadKeyScreen from '../UploadKeyScreen';
import style from './style';

import {hideActivityIndicator, showActivityIndicator} from '../../actions';
import {ModalManager} from '../../hoc/ManagedModal/manager';
import {ConfirmSignin, CurrentUserInfo, Signin} from '../../utils';

const PHONE_NUMBER = '+40721205279';

export interface ILoginScreenState {
	usernameValue: string;
	passwordValue: string;
	showModalForSMSCode: boolean;
}

export interface ILoginScreenProps {
	navigation: NavigationScreenProp<any>;
	SigninLoader: () => void;
	ConfirmLoader: () => void;
	HideLoader: () => void;
}

class LoginScreen extends Component<ILoginScreenProps, ILoginScreenState> {
	private static navigationOptions = {
		headerTitle: 'LOGIN',
	};

	public state = {
		usernameValue: '',
		passwordValue: '',
		showModalForSMSCode: false,
	};

	private passwordInput: SXTextInput | null = null;
	private usernameInput: SXTextInput | null = null;

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
					onSubmitPressed={this.usernameSubmitPressedHandler}
					onChangeText={this.handleUsernameInputKeyPressed}
					keyboardType={TKeyboardKeys.emailAddress}
					ref={(component) => (this.usernameInput = component)}
				/>
				<View style={style.passwordContainer}>
					<SXTextInput
						placeholder={'Password'}
						placeholderColor={Colors.postText}
						returnKeyType={TRKeyboardKeys.go}
						onSubmitPressed={() => this.fireSignin()}
						onChangeText={this.handlePasswordInputKeyPressed}
						isPassword={true}
						ref={(component) => (this.passwordInput = component)}
					/>
				</View>
				<SXButton
					label={'LOGIN'}
					onPress={() => this.fireSignin()}
					disabled={!this.state.passwordValue || !this.state.usernameValue}
					borderColor={Colors.transparent}
				/>
				<TouchableOpacity onPress={this.navigateToPasswordForgotScreen} style={style.forgotPassword}>
					<Text style={style.forgotPasswordText}>{'Forgot your password'}</Text>
				</TouchableOpacity>
				<SXButton
					label={'Or use unlock file'}
					onPress={this.selectUnlockFileHandler}
					borderColor={Colors.transparent}
					disabled={true}
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

	private usernameSubmitPressedHandler = () => {
		if (this.passwordInput && this.state.usernameValue) {
			this.passwordInput.focusInput();
		}
	}

	private handleUsernameInputKeyPressed = (value: string) => this.setState({usernameValue: value});

	private handlePasswordInputKeyPressed = (value: string) => this.setState({passwordValue: value});

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

	private fireSignin = async () => {
		const {usernameValue, passwordValue} = this.state;
		this.props.SigninLoader();
		try {
			const res = await Signin(usernameValue, passwordValue);
			// saving..
			await AsyncStorage.setItem('jwtToken', res.signInUserSession.idToken.jwtToken);
			await AsyncStorage.setItem('refreshToken', res.signInUserSession.refreshToken.token);
			await AsyncStorage.setItem('accessToken', res.signInUserSession.accessToken.jwtToken);
			this.props.navigation.navigate('MainScreen');
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				// better alert here
				Alert.alert('Wrong username/password');
				if (this.usernameInput) {
					this.usernameInput.focusInput();
				}
			});
		}
		this.props.HideLoader();
	}

	private smsCodeConfirmedHandler = async (code: string) => {
		const {usernameValue} = this.state;
		this.props.SigninLoader();
		try {
			const res = await ConfirmSignin(usernameValue, code);
			this.toggleVisibleModalSMS(false);
			this.props.navigation.navigate('MainScreen');
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				// better alert here
				Alert.alert('Wrong confirmation code'); // TODO: update here!
			});
		}
		this.props.HideLoader();
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

const MapDispatchToProps = (dispatch: any) => ({
	SigninLoader: () => dispatch(showActivityIndicator('Signing in..')),
	ConfirmLoader: () => dispatch(showActivityIndicator('Confirming code..')),
	HideLoader: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(null, MapDispatchToProps)(LoginScreen as any);
export default reduxWrapper;
