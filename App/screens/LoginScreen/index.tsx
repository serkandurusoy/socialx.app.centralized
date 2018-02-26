import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {SXButton} from '../../components/Button';
import {SXTextInput, TKeyboardKeys, TRKeyboardKeys} from '../../components/TextInput';
import {ApplicationStyles, Colors} from '../../theme/';
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
		headerTintColor: Colors.white, // color for screen title and back button
		headerTitleStyle: ApplicationStyles.screenHeader,
		headerBackTitle: null,
	};

	public state = {
		emailValue: '',
		passwordValue: '',
	};

	private passwordInput?: SXTextInput;

	public render() {
		return (
			<View style={style.container}>
				<Text style={style.welcomeText}>{'Welcome Back!'}</Text>
				<SXTextInput
					placeholder={'Email'}
					value={this.state.emailValue}
					returnKeyType={TRKeyboardKeys.next}
					canCancel={true}
					keyboardType={TKeyboardKeys.emailAddress}
					cancelButtonTextColor={Colors.postFullName}
					onSubmitPressed={this.emailSubmitPressedHandler}
					onChangeText={this.handleEmailInputKeyPressed}
				/>
				<View style={style.passwordContainer}>
					<SXTextInput
						placeholder={'Password'}
						value={this.state.passwordValue}
						isPassword={true}
						returnKeyType={TRKeyboardKeys.go}
						canCancel={true}
						cancelButtonTextColor={Colors.postFullName}
						onSubmitPressed={this.startLogin}
						onChangeText={this.handlePasswordInputKeyPressed}
						blurOnSubmit={true}
						ref={(component) => (this.passwordInput = component)}
					/>
				</View>
				<SXButton
					label={'LOGIN'}
					onPress={this.startLogin}
					disabled={!this.state.passwordValue || !this.state.emailValue}
				/>
				<TouchableOpacity onPress={this.navigateToPasswordForgotScreen} style={style.forgotPassword}>
					<Text style={style.forgotPasswordText}>{'Forgot your password'}</Text>
				</TouchableOpacity>
				<View style={style.noAccountContainer}>
					<Text style={style.noAccountQuestion}>{'Don\'t have an account?'}</Text>
					<TouchableOpacity onPress={this.navigateToSignUpScreen}>
						<Text style={style.signUpText}>{'Sign up'}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	private navigateToPasswordForgotScreen = () => {
		alert('navigateToPasswordForgotScreen');
	}

	private navigateToSignUpScreen = () => {
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
	}
}
