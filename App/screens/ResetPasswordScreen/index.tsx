import React, {Component} from 'react';
import {Alert, Platform, Text, View} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {SXButton, SXTextInput, TRKeyboardKeys} from 'components';
import {OS_TYPES} from 'consts';
import {Colors} from 'theme';
import style from './style';

import {hideActivityIndicator, resetNavigationToRoute, showActivityIndicator} from 'backend/actions';
import {ModalManager} from 'hoc/ManagedModal/manager';
import {ForgotPasswordConfirm, IWithTranslationProps, withTranslations} from 'utilities';

interface IResetPasswordScreenProps extends IWithTranslationProps {
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
	private static navigationOptions = (props: IResetPasswordScreenProps) => ({
		// TODO: this is a bad hack, we should reconsider the architecture!
		title: props.navigationOptions.getText('reset.password.screen.title'),
		headerRight: <View />,
	});

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
		const {getText} = this.props;
		return (
			<KeyboardAwareScrollView
				style={containerStyles}
				contentContainerStyle={style.scrollContent}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
			>
				<Text style={style.descriptionText}>{getText('reset.password.description')}</Text>
				<View style={style.inputContainer}>
					<SXTextInput
						placeholder={getText('reset.password.reset.code')}
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
						placeholder={getText('reset.password.new.password')}
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
						placeholder={getText('reset.password.confirm.password')}
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
					label={getText('reset.password.set.button')}
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
		const {showLoader, hideLoader, navigation, getText} = this.props;

		const params = this.props.navigation.state.params;

		showLoader(getText('reset.password.resetting'));
		try {
			if (password !== confirmPassword) {
				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert(getText('reset.password.mismatch'));
				});
				return;
			}

			if (!params.username) {
				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert(getText('general.error.message'));
				});
				resetNavigationToRoute('MainScreen', this.props.navigation);
				return;
			}

			const resetRes = await ForgotPasswordConfirm(params.username, resetCode, password);
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('reset.password.success'));
			});
			resetNavigationToRoute('MainScreen', this.props.navigation);
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('reset.password.wrong.code'));
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

export default compose(
	withTranslations,
	connect(
		null,
		MapDispatchToState,
	),
)(ResetPasswordScreen as any);
