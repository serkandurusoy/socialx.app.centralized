import {ModalInputSMSCode, SXButton, SXTextInput, TKeyboardKeys, TRKeyboardKeys} from 'components';
import {ModalManager} from 'hoc';
import React, {Component} from 'react';
import {Alert, AsyncStorage, Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Colors} from 'theme/';
import UploadKeyScreen from '../UploadKeyScreen';
import style from './style';

import {hideActivityIndicator, resetNavigationToRoute, showActivityIndicator} from 'backend/actions';
import {IWithResizeOnKeyboardShowProps, withResizeOnKeyboardShow} from 'hoc/ResizeOnKeyboardShow';
import {ConfirmSignin, CurrentUserInfo, IWithTranslationProps, Signin, withTranslations} from 'utilities';

const PHONE_NUMBER = '+40721205279';

export interface ILoginScreenState {
	usernameValue: string;
	passwordValue: string;
	showModalForSMSCode: boolean;
}

export interface ILoginScreenProps extends IWithResizeOnKeyboardShowProps, IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
	SigninLoader: () => void;
	ConfirmLoader: () => void;
	HideLoader: () => void;
}

class LoginScreen extends Component<ILoginScreenProps, ILoginScreenState> {
	private static navigationOptions = (props: ILoginScreenProps) => ({
		// TODO: this is a bad hack, we should reconsider the architecture!
		title: props.navigationOptions.getText('login.screen.title'),
		headerRight: <View />,
	});

	public state = {
		usernameValue: '',
		passwordValue: '',
		showModalForSMSCode: false,
	};

	private passwordInput: SXTextInput | null = null;
	private usernameInput: SXTextInput | null = null;

	public render() {
		const {getText} = this.props;
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
				<Text style={style.welcomeText}>{getText('login.welcome.message')}</Text>
				<SXTextInput
					placeholder={getText('login.username.input')}
					placeholderColor={Colors.postText}
					returnKeyType={TRKeyboardKeys.next}
					onSubmitPressed={this.usernameSubmitPressedHandler}
					onChangeText={this.handleUsernameInputKeyPressed}
					keyboardType={TKeyboardKeys.emailAddress}
					ref={(component) => (this.usernameInput = component)}
				/>
				<View style={style.passwordContainer}>
					<SXTextInput
						placeholder={getText('login.password.input')}
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
						label={getText('login.login.button')}
						onPress={this.fireSignin}
						disabled={!this.state.passwordValue || !this.state.usernameValue}
						borderColor={Colors.transparent}
					/>
				</View>
				<TouchableOpacity
					onPress={() => this.safeNavigateToScreen('ForgotPasswordScreen')}
					style={style.forgotPassword}
				>
					<Text style={style.forgotPasswordText}>{getText('login.forgot.password')}</Text>
				</TouchableOpacity>
				{/*<SXButton*/}
				{/*label={'Or use unlock file'}*/}
				{/*onPress={() => this.safeNavigateToScreen('UploadKeyScreen')}*/}
				{/*borderColor={Colors.transparent}*/}
				{/*disabled={false}*/}
				{/*/>*/}
				<View style={style.noAccountContainer}>
					<Text style={style.noAccountQuestion}>{getText('login.no.account.text')}</Text>
					<TouchableOpacity onPress={() => this.safeNavigateToScreen('SignUpScreen')}>
						<Text style={style.signUpText}>{getText('login.signUp.button')}</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAwareScrollView>
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

	private usernameSubmitPressedHandler = () => {
		if (this.passwordInput && this.state.usernameValue) {
			this.passwordInput.focusInput();
		}
	};

	private handleUsernameInputKeyPressed = (value: string) => this.setState({usernameValue: value});

	private handlePasswordInputKeyPressed = (value: string) => this.setState({passwordValue: value});

	private toggleVisibleModalSMS = (visible = true) => {
		Keyboard.dismiss();
		this.setState({
			showModalForSMSCode: visible,
		});
	};

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
				const {getText} = this.props;
				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert(getText('login.wrong.credentials'), undefined, [
						{
							text: getText('button.OK'),
							onPress: () => {
								if (this.usernameInput) {
									this.usernameInput.focusInput();
								}
							},
						},
					]);
				});
			}
			this.props.HideLoader();
		});
	};

	private smsCodeConfirmedHandler = (code: string) => {
		const {usernameValue} = this.state;
		Keyboard.dismiss();
		this.props.safeRunAfterKeyboardHide(async () => {
			const {getText} = this.props;
			this.props.SigninLoader();
			try {
				const res = await ConfirmSignin(usernameValue, code);
				this.toggleVisibleModalSMS(false);
				this.navigateToMainScreen();
			} catch (ex) {
				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert(getText('login.wrong.confirmation.code'));
				});
			}
			this.props.HideLoader();
		});
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

const MapDispatchToProps = (dispatch: any, props: ILoginScreenProps) => ({
	SigninLoader: () => dispatch(showActivityIndicator(props.getText('login.progress.message'))),
	ConfirmLoader: () => dispatch(showActivityIndicator(props.getText('login.code.confirm.wait'))),
	HideLoader: () => dispatch(hideActivityIndicator()),
});

export default compose(
	withResizeOnKeyboardShow,
	withTranslations,
	connect(
		null,
		MapDispatchToProps,
	),
)(LoginScreen);
