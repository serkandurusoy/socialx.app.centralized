import {ModalInputSMSCode, SXButton, SXTextInput, TKeyboardKeys, TRKeyboardKeys} from 'components';
import {ModalManager} from 'hoc';
import React, {Component} from 'react';
import {Alert, AsyncStorage, Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {Colors} from 'theme/';
import UploadKeyScreen from '../UploadKeyScreen';
import style from './style';

import {hideActivityIndicator, resetNavigationToRoute, showActivityIndicator} from 'backend/actions';
import {IWithResizeOnKeyboardShowProps, withResizeOnKeyboardShow} from 'hoc/ResizeOnKeyboardShow';
import {ConfirmSignin, CurrentUserInfo, Signin} from 'utilities';

const PHONE_NUMBER = '+40721205279';

export interface ILoginScreenState {
	usernameValue: string;
	passwordValue: string;
	showModalForSMSCode: boolean;
}

export interface ILoginScreenProps extends IWithResizeOnKeyboardShowProps {
	navigation: NavigationScreenProp<any>;
	SigninLoader: () => void;
	ConfirmLoader: () => void;
	HideLoader: () => void;
}

class LoginScreen extends Component<ILoginScreenProps, ILoginScreenState> {
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
						onSubmitPressed={this.fireSignin}
						onChangeText={this.handlePasswordInputKeyPressed}
						isPassword={true}
						ref={(component) => (this.passwordInput = component)}
						blurOnSubmit={true}
					/>
				</View>
				<View style={style.fullWidth}>
					<SXButton
						label={'LOGIN'}
						onPress={this.fireSignin}
						disabled={!this.state.passwordValue || !this.state.usernameValue}
						borderColor={Colors.transparent}
					/>
				</View>
				<TouchableOpacity
					onPress={() => this.safeNavigateToScreen('ForgotPasswordScreen')}
					style={style.forgotPassword}
				>
					<Text style={style.forgotPasswordText}>{'Forgot your password'}</Text>
				</TouchableOpacity>
				{/*<SXButton*/}
				{/*label={'Or use unlock file'}*/}
				{/*onPress={() => this.safeNavigateToScreen('UploadKeyScreen')}*/}
				{/*borderColor={Colors.transparent}*/}
				{/*disabled={false}*/}
				{/*/>*/}
				<View style={style.noAccountContainer}>
					<Text style={style.noAccountQuestion}>{'Don\'t have an account?'}</Text>
					<TouchableOpacity onPress={() => this.safeNavigateToScreen('SignUpScreen')}>
						<Text style={style.signUpText}>{'Sign up'}</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAwareScrollView>
		);
	}

	private safeNavigateToScreen = (screenName: string) => {
		Keyboard.dismiss();
		this.props.navigation.navigate(screenName);
	}

	private navigateToMainScreen = () => {
		Keyboard.dismiss();
		resetNavigationToRoute('MainScreen', this.props.navigation);
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

	private fireSignin = () => {
		const {usernameValue, passwordValue} = this.state;
		Keyboard.dismiss();
		this.props.safeRunAfterKeyboardHide(async () => {
			this.props.SigninLoader();
			try {
				const res = await Signin(usernameValue, passwordValue);
				// // saving..
				await AsyncStorage.setItem('jwtToken', res.signInUserSession.idToken.jwtToken);
				await AsyncStorage.setItem('refreshToken', res.signInUserSession.refreshToken.token);
				await AsyncStorage.setItem('accessToken', res.signInUserSession.accessToken.jwtToken);
				this.navigateToMainScreen();
			} catch (ex) {
				console.log(ex);
				ModalManager.safeRunAfterModalClosed(() => {
					// better alert here
					Alert.alert('Wrong username/password');
					if (this.usernameInput) {
						this.usernameInput.focusInput();
					}
				});
			}
			this.props.HideLoader();
		});
	}

	private smsCodeConfirmedHandler = (code: string) => {
		const {usernameValue} = this.state;
		Keyboard.dismiss();
		this.props.safeRunAfterKeyboardHide(async () => {
			this.props.SigninLoader();
			try {
				const res = await ConfirmSignin(usernameValue, code);
				this.toggleVisibleModalSMS(false);
				this.navigateToMainScreen();
			} catch (ex) {
				ModalManager.safeRunAfterModalClosed(() => {
					// better alert here
					Alert.alert('Wrong confirmation code'); // TODO: update here!
				});
			}
			this.props.HideLoader();
		});
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

const navigationOptions = {
	title: 'LOGIN',
	headerRight: <View />,
};

const MapDispatchToProps = (dispatch: any) => ({
	SigninLoader: () => dispatch(showActivityIndicator('Signing in..')),
	ConfirmLoader: () => dispatch(showActivityIndicator('Confirming code..')),
	HideLoader: () => dispatch(hideActivityIndicator()),
});

const loginScreenWithResize = withResizeOnKeyboardShow(LoginScreen, navigationOptions);
const reduxWrapper = connect(null, MapDispatchToProps)(loginScreenWithResize as any);
export default reduxWrapper;
