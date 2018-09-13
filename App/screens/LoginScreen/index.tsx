// MIGRATION: migrated screens/preAuth/LoginScreen

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
				phoneNumber={'+38163544805'} // TODO: check this value if we will use SMS code login!
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
		const res = await Signin(username, password);

		await AsyncStorage.setItem('jwtToken', res.signInUserSession.idToken.jwtToken);
		await AsyncStorage.setItem('refreshToken', res.signInUserSession.refreshToken.token);
		await AsyncStorage.setItem('accessToken', res.signInUserSession.accessToken.jwtToken);

		this.navigateToMainScreen();
	};

	private smsCodeConfirmedHandler = (code: string) => {
		// TODO: later check if this will be used or not!
		// 	It can be implemented similar with SignuUpScreen!
	};

	private smsCodeDeclinedHandler = () => {
		this.toggleVisibleModalSMS(false);
	};

	private smsCodeResendHandler = () => {
		this.toggleVisibleModalSMS(false);
	};
}

export default LoginScreen;
