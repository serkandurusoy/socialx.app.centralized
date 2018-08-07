import React, {Component} from 'react';
import {AsyncStorage, Keyboard, View} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';

import {resetNavigationToRoute} from 'backend/actions';
import {Signin} from 'utilities';
import LoginScreenComponent from './screen';

interface ILoginScreenState {
	showModalForSMSCode: boolean;
}

interface ILoginScreenProps {
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
}

class LoginScreen extends Component<ILoginScreenProps, ILoginScreenState> {
	private static navigationOptions = ({navigationOptions}: ILoginScreenProps) => ({
		// TODO: this is a bad hack, we should reconsider the architecture!
		title: navigationOptions.getText('login.screen.title'),
		headerRight: <View />,
	});

	public state = {
		showModalForSMSCode: false,
	};

	public render() {
		const {showModalForSMSCode} = this.state;
		return (
			<LoginScreenComponent
				showModalForSMSCode={showModalForSMSCode}
				phoneNumber={'+38163544805'}
				onSmsCodeConfirmed={this.smsCodeConfirmedHandler}
				onSmsCodeDeclined={this.smsCodeDeclinedHandler}
				onSmsCodeResend={this.smsCodeResendHandler}
				onStartLogin={this.onStartLoginHandler}
				onNavigateToPasswordForgot={() => this.safeNavigateToScreen('ForgotPasswordScreen')}
				onNavigateToRegister={() => this.safeNavigateToScreen('SignUpScreen')}
				onNavigateToUploadKey={() => this.safeNavigateToScreen('UploadKeyScreen')}
			/>
		);
	}

	private safeNavigateToScreen = (screenName: string) => {
		Keyboard.dismiss();
		this.props.navigation.navigate(screenName);
	};

	private navigateToMainScreen = () => {
		Keyboard.dismiss();
		resetNavigationToRoute('MainScreen', this.props.navigation);
	};

	private toggleVisibleModalSMS = (visible = true) => {
		Keyboard.dismiss();
		this.setState({
			showModalForSMSCode: visible,
		});
	};

	private onStartLoginHandler = async (username: string, password: string) => {
		console.log('onStartLoginHandler', username, password);
		const res = await Signin(username, password);

		await AsyncStorage.setItem('jwtToken', res.signInUserSession.idToken.jwtToken);
		await AsyncStorage.setItem('refreshToken', res.signInUserSession.refreshToken.token);
		await AsyncStorage.setItem('accessToken', res.signInUserSession.accessToken.jwtToken);

		this.navigateToMainScreen();
	};

	private smsCodeConfirmedHandler = (code: string) => {
		// TODO: later check if this will be used or not!
		// Keyboard.dismiss();
		// this.props.safeRunAfterKeyboardHide(async () => {
		// 	const {getText} = this.props;
		// 	this.props.SigninLoader();
		// 	try {
		// 		const res = await ConfirmSignin(this.username, code);
		// 		this.toggleVisibleModalSMS(false);
		// 		this.navigateToMainScreen();
		// 	} catch (ex) {
		// 		ModalManager.safeRunAfterModalClosed(() => {
		// 			Alert.alert(getText('login.wrong.confirmation.code'));
		// 		});
		// 	}
		// 	this.props.HideLoader();
		// });
	};

	private smsCodeDeclinedHandler = () => {
		this.toggleVisibleModalSMS(false);
		// console.log('TODO: smsCodeDeclinedHandler');
	};

	private smsCodeResendHandler = () => {
		this.toggleVisibleModalSMS(false);
		// console.log('TODO: smsCodeResendHandler');
	};
}

export default LoginScreen;
