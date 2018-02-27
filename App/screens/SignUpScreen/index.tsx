import React, {Component} from 'react';
import {Keyboard, KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {SXButton} from '../../components/Button';
import {SXTextInput, TKeyboardKeys, TRKeyboardKeys} from '../../components/TextInput';
import {Colors} from '../../theme';
import style from './style';

export interface ISignUpScreenState {
	email: string;
	name: string;
	username: string;
	password: string;
	confirmPassword: string;
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
	};

	private inputRefs: any = {};
	private inputRefsArr: SXTextInput[] = [];

	public render() {
		return (
			<KeyboardAwareScrollView
				style={style.keyboardView}
				contentContainerStyle={style.container}
				alwaysBounceVertical={false}
				keyboardDismissMode='interactive'
				keyboardVerticalOffset={20}
				getTextInputRefs={() => this.inputRefsArr}
			>
				<View style={style.buttonContainer}>
					<SXButton label={'IMPORT FROM DOCK.IO'} />
				</View>
				<Text style={style.orText}>{'or'}</Text>
				<View style={style.textInputContainer}>
					<SXTextInput
						iconColor={Colors.iron}
						icon={'ios-mail-outline'}
						placeholder={'Email'}
						returnKeyType={TRKeyboardKeys.next}
						canCancel={true}
						cancelButtonTextColor={Colors.postFullName}
						onSubmitPressed={() => this.handleInputSubmitPressed('name')}
						onChangeText={(value) => this.handleInputChangeText(value, 'email')}
						keyboardType={TKeyboardKeys.emailAddress}
						ref={(ref: any) => this.updateInputRef(ref, 'email')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						iconColor={Colors.iron}
						icon={'ios-person-outline'}
						placeholder={'Name'}
						returnKeyType={TRKeyboardKeys.next}
						canCancel={true}
						cancelButtonTextColor={Colors.postFullName}
						onSubmitPressed={() => this.handleInputSubmitPressed('username')}
						onChangeText={(value) => this.handleInputChangeText(value, 'name')}
						ref={(ref: any) => this.updateInputRef(ref, 'name')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						iconColor={Colors.iron}
						icon={'ios-person-outline'}
						placeholder={'Username'}
						returnKeyType={TRKeyboardKeys.next}
						canCancel={true}
						cancelButtonTextColor={Colors.postFullName}
						onSubmitPressed={() => this.handleInputSubmitPressed('password')}
						onChangeText={(value) => this.handleInputChangeText(value, 'username')}
						ref={(ref: any) => this.updateInputRef(ref, 'username')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						isPassword={true}
						iconColor={Colors.iron}
						icon={'ios-eye-off-outline'}
						placeholder={'Password'}
						returnKeyType={TRKeyboardKeys.next}
						canCancel={true}
						cancelButtonTextColor={Colors.postFullName}
						onSubmitPressed={() => this.handleInputSubmitPressed('confirmPassword')}
						onChangeText={(value) => this.handleInputChangeText(value, 'password')}
						ref={(ref: any) => this.updateInputRef(ref, 'password')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						isPassword={true}
						iconColor={Colors.iron}
						icon={'ios-eye-off-outline'}
						placeholder={'Confirm Password'}
						returnKeyType={TRKeyboardKeys.go}
						canCancel={true}
						cancelButtonTextColor={Colors.postFullName}
						onSubmitPressed={this.startRegister}
						onChangeText={(value) => this.handleInputChangeText(value, 'confirmPassword')}
						ref={(ref: any) => this.updateInputRef(ref, 'confirmPassword')}
						blurOnSubmit={true}
					/>
				</View>
				<View style={[style.buttonContainer, style.registerButtonContainer]}>
					<SXButton label={'REGISTER NOW!'} onPress={this.startRegister} />
				</View>
			</KeyboardAwareScrollView>
		);
	}

	private updateInputRef = (inputRef: SXTextInput, fieldName: string) => {
		this.inputRefs[fieldName] = inputRef;
		this.inputRefsArr.push(inputRef);
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
		// );
		Keyboard.dismiss();
		// this.props.navigation.navigate('MainScreen');
	}
}
