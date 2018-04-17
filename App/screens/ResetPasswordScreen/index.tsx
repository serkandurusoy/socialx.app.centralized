import React, {Component} from 'react';
import {Alert, Platform, ScrollView, Text, View} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {connect} from 'react-redux';
import {SXTextInput, TRKeyboardKeys} from '../../components/Inputs/TextInput';
import {SXButton} from '../../components/Interaction/Button';
import {OS_TYPES} from '../../constants';
import {Colors} from '../../theme';
import style from './style';

import {hideActivityIndicator, showActivityIndicator} from '../../actions';
import {ModalManager} from '../../hoc/ManagedModal/manager';
import {ForgotPasswordConfirm} from '../../utils';

interface IResetPasswordScreenProps {
	navigation: NavigationScreenProp<any>;
	showLoader: (message: string) => void;
	hideLoader: () => void;
}

interface IResetPasswordScreenState {
	resetCode: string;
	password: string;
	confirmPassword: string;
}

class ResetPasswordScreen extends Component<IResetPasswordScreenProps, IResetPasswordScreenState> {
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

	private setNewPasswordHandler = async () => {
		const {resetCode, password, confirmPassword} = this.state;
		const {showLoader, hideLoader, navigation} = this.props;

		const params = this.props.navigation.state.params;

		showLoader('Restting your password..');
		try {
			if (password !== confirmPassword) {
				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert('You\'r passwords do\'nt match');
				});
				return;
			}

			if (!params.username) {
				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert('Something went wrong.');
				});
				this.props.navigation.navigate('MainScreen');
				return;
			}

			const resetRes = await ForgotPasswordConfirm(params.username, resetCode, password);
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert('You\'r password has been successfully reseted!');
			});
			this.props.navigation.navigate('MainScreen');
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert('Wrong reset code entered, please try again.');
			});
			console.log(ex);
		}
		hideLoader();
	}
}

const MapDispatchToState = (dispatch: any) => ({
	showLoader: (message: string) => dispatch(showActivityIndicator(message)),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

export default connect(null, MapDispatchToState)(ResetPasswordScreen as any);
