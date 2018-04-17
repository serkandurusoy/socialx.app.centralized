import React, {Component} from 'react';
import {Platform, ScrollView, Text, View} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {SXTextInput, TRKeyboardKeys} from '../../components/Inputs/TextInput';
import {SXButton} from '../../components/Interaction/Button';
import {OS_TYPES} from '../../constants';
import {Colors} from '../../theme';
import style from './style';

interface IResetPasswordScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface IResetPasswordScreenState {
	resetCode: string;
	password: string;
	confirmPassword: string;
}

export default class ResetPasswordScreen extends Component<IResetPasswordScreenProps, IResetPasswordScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'RESET PASSWORD',
		headerRight: <View />,
	};

	public state = {
		resetCode: '',
		password: '',
		confirmPassword: '',
	};

	private inputRefs: any = {};

	public componentDidMount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustResize();
		}
	}

	public componentWillUnmount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
	}

	public render() {
		const containerStyles = [style.scrollView];
		return (
			<KeyboardAwareScrollView
				style={containerStyles}
				contentContainerStyle={style.scrollContent}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
			>
				<Text style={style.descriptionText}>
					{'In order to set a new password please verify your email and enter' + ' the reset code we have sent to you.'}
				</Text>
				<View style={style.inputContainer}>
					<SXTextInput
						placeholder={'Reset code'}
						iconColor={Colors.iron}
						icon={'key'}
						blurOnSubmit={false}
						returnKeyType={TRKeyboardKeys.next}
						onChangeText={(value: string) => this.handleInputChangeText(value, 'resetCode')}
						onSubmitPressed={() => this.moveToNextInput('password')}
						ref={(ref: any) => this.updateInputRef(ref, 'resetCode')}
					/>
				</View>
				<View style={style.inputContainer}>
					<SXTextInput
						placeholder={'Password'}
						iconColor={Colors.iron}
						icon={'eye-slash'}
						blurOnSubmit={false}
						isPassword={true}
						returnKeyType={TRKeyboardKeys.next}
						onChangeText={(value: string) => this.handleInputChangeText(value, 'password')}
						onSubmitPressed={() => this.moveToNextInput('confirmPassword')}
						ref={(ref: any) => this.updateInputRef(ref, 'password')}
					/>
				</View>
				<View style={style.inputContainer}>
					<SXTextInput
						placeholder={'Confirm password'}
						iconColor={Colors.iron}
						icon={'eye-slash'}
						blurOnSubmit={true}
						isPassword={true}
						returnKeyType={TRKeyboardKeys.go}
						onChangeText={(value: string) => this.handleInputChangeText(value, 'confirmPassword')}
						onSubmitPressed={this.setNewPasswordHandler}
						ref={(ref: any) => this.updateInputRef(ref, 'confirmPassword')}
					/>
				</View>
				<SXButton
					label={'Set new password'}
					autoWidth={true}
					borderColor={Colors.transparent}
					onPress={this.setNewPasswordHandler}
				/>
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

	private moveToNextInput = (nextInputRef: string) => {
		if (nextInputRef in this.inputRefs) {
			this.inputRefs[nextInputRef].focusInput();
		}
	}

	private setNewPasswordHandler = () => {
		// console.log('TODO: setNewPasswordHandler for resetCode, password, confirmPassword',
		// 	this.state.resetCode, this.state.password, this.state.confirmPassword);
		// later
		// this.props.navigation.navigate('MainScreen');
	}
}
