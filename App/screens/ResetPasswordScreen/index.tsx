import {SXTextInput, TRKeyboardKeys} from 'components/Inputs/TextInput';
import {SXButton} from 'components/Interaction/Button';
import {OS_TYPES} from 'consts';
import React, {Component} from 'react';
import {Alert, Platform, ScrollView, Text, View} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {connect} from 'react-redux';
import {Colors} from 'theme';
import style from './style';

import {hideActivityIndicator, resetNavigationToRoute, showActivityIndicator} from 'backend/actions';
import {ModalManager} from 'hoc/ManagedModal/manager';
import {ForgotPasswordConfirm, getText} from 'utilities';

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
		title: getText('resetPasswordScreenTitle'),
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
				<Text style={style.descriptionText}>{getText('resetPasswordDescription')}</Text>
				<View style={style.inputContainer}>
					<SXTextInput
						placeholder={getText('resetPasswordResetCode')}
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
						placeholder={getText('resetPasswordNewPassword')}
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
						placeholder={getText('resetPasswordConfirmPassword')}
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
					label={getText('resetPasswordSetButton')}
					autoWidth={true}
					borderColor={Colors.transparent}
					onPress={this.setNewPasswordHandler}
				/>
			</KeyboardAwareScrollView>
		);
	}

	private updateInputRef = (inputRef: SXTextInput, fieldName: string) => {
		this.inputRefs[fieldName] = inputRef;
	};

	private handleInputChangeText = (value: string, fieldName: string) => {
		const newState: any = {};
		newState[fieldName] = value;
		this.setState(newState);
	};

	private moveToNextInput = (nextInputRef: string) => {
		if (nextInputRef in this.inputRefs) {
			this.inputRefs[nextInputRef].focusInput();
		}
	};

	private setNewPasswordHandler = async () => {
		const {resetCode, password, confirmPassword} = this.state;
		const {showLoader, hideLoader, navigation} = this.props;

		const params = this.props.navigation.state.params;

		showLoader(getText('resetPasswordResetting'));
		try {
			if (password !== confirmPassword) {
				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert(getText('resetPasswordMismatch'));
				});
				return;
			}

			if (!params.username) {
				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert(getText('generalErrorMessage'));
				});
				resetNavigationToRoute('MainScreen', this.props.navigation);
				return;
			}

			const resetRes = await ForgotPasswordConfirm(params.username, resetCode, password);
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('resetPasswordSuccess'));
			});
			resetNavigationToRoute('MainScreen', this.props.navigation);
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('resetPasswordWrongCode'));
			});
			console.log(ex);
		}
		hideLoader();
	};
}

const MapDispatchToState = (dispatch: any) => ({
	showLoader: (message: string) => dispatch(showActivityIndicator(message)),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

export default connect(
	null,
	MapDispatchToState,
)(ResetPasswordScreen as any);
