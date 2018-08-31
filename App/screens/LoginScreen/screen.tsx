import {FormikErrors, FormikProps, withFormik} from 'formik';
import React, {RefObject} from 'react';
import {Alert, Keyboard, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {ModalInputSMSCode, SXButton, SXTextInput, TKeyboardKeys, TRKeyboardKeys} from 'components';
import {IResizeProps, ModalManager, WithResizeOnKeyboardShow} from 'hoc';
import {Colors} from 'theme';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

interface ILoginScreenComponentProps extends IWithTranslationProps {
	showModalForSMSCode: boolean;
	phoneNumber: string;
	onSmsCodeConfirmed: (code: string) => void;
	onSmsCodeDeclined: () => void;
	onSmsCodeResend: () => void;
	onStartLogin: (username: string, password: string) => Promise<void>;
	onNavigateToPasswordForgot: () => void;
	onNavigateToRegister: () => void;
	onNavigateToUploadKey: () => void;
	loginLoader: () => void;
	confirmLoader: () => void;
	hideLoader: () => void;
}

interface IValidatedLoginFormProps extends IWithTranslationProps {
	username: string;
	password: string;
}

interface ILoginFormProps extends IWithTranslationProps, IResizeProps {
	onStartLogin: (username: string, password: string) => Promise<void>;
	loginLoader: () => void;
	hideLoader: () => void;
}

const passwordRef: RefObject<SXTextInput> = React.createRef();
const usernameRef: RefObject<SXTextInput> = React.createRef();

const ValidatedLoginForm: React.SFC<FormikProps<IValidatedLoginFormProps>> = ({
	values: {getText, username, password},
	errors,
	touched,
	handleSubmit,
	isValid,
	isSubmitting,
	setFieldTouched,
	setFieldValue,
}) => (
	<React.Fragment>
		<SXTextInput
			placeholder={getText('login.username.input')}
			placeholderColor={Colors.postText}
			returnKeyType={TRKeyboardKeys.next}
			keyboardType={TKeyboardKeys.emailAddress}
			value={username}
			onChangeText={(value: string) => {
				setFieldValue('username', value);
				setFieldTouched('username');
			}}
			focusUpdateHandler={(hasFocus) => !hasFocus && setFieldTouched('username')}
			onSubmitPressed={() => passwordRef.current && passwordRef.current.focusInput()}
			ref={usernameRef}
		/>
		{touched.username && errors.username && <Text style={style.errorText}>{errors.username}</Text>}
		<View style={style.passwordContainer}>
			<SXTextInput
				placeholder={getText('login.password.input')}
				placeholderColor={Colors.postText}
				returnKeyType={TRKeyboardKeys.go}
				onSubmitPressed={handleSubmit}
				isPassword={true}
				blurOnSubmit={true}
				value={password}
				onChangeText={(value: string) => {
					setFieldValue('password', value);
					setFieldTouched('password');
				}}
				focusUpdateHandler={(hasFocus) => !hasFocus && setFieldTouched('password')}
				ref={passwordRef}
			/>
			{touched.password && errors.password && <Text style={style.errorText}>{errors.password}</Text>}
		</View>
		<View style={style.fullWidth}>
			<SXButton
				label={getText('login.login.button')}
				onPress={handleSubmit}
				disabled={!isValid || isSubmitting}
				borderColor={Colors.transparent}
			/>
		</View>
	</React.Fragment>
);

const LoginForm = withFormik({
	mapPropsToValues: ({getText}: ILoginFormProps) => ({
		password: '',
		username: '',
		getText,
	}),
	validate: (values: IValidatedLoginFormProps) => {
		const {username, password, getText} = values;
		const errors: FormikErrors<IValidatedLoginFormProps> = {};
		if (!username) {
			errors.username = getText('login.username.required');
		}
		if (!password) {
			errors.password = getText('login.password.required');
		}
		return errors;
	},
	handleSubmit: async (values: IValidatedLoginFormProps, {props, setSubmitting, setTouched}) => {
		const {safeRunAfterKeyboardHide, getText, loginLoader, hideLoader} = props;
		safeRunAfterKeyboardHide(async () => {
			try {
				setSubmitting(true);
				loginLoader();
				await props.onStartLogin(values.username, values.password);
			} catch (e) {
				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert(getText('login.wrong.credentials'), undefined, [
						{
							text: getText('button.OK'),
							onPress: () => {
								setTouched({username: false, password: false});
								setSubmitting(false);
								if (usernameRef.current) {
									usernameRef.current.focusInput();
								}
							},
						},
					]);
				});
			}
			hideLoader();
		});
		Keyboard.dismiss();
	},
})(ValidatedLoginForm as any);

const LoginScreenComponent: React.SFC<ILoginScreenComponentProps> = ({
	getText,
	showModalForSMSCode,
	phoneNumber,
	onSmsCodeConfirmed,
	onSmsCodeDeclined,
	onSmsCodeResend,
	onStartLogin,
	onNavigateToPasswordForgot,
	onNavigateToRegister,
	onNavigateToUploadKey,
	loginLoader,
	hideLoader,
}) => (
	<SafeAreaView style={style.safeAreaContainer}>
		<KeyboardAwareScrollView
			style={style.keyboardView}
			contentContainerStyle={style.container}
			alwaysBounceVertical={false}
			keyboardDismissMode='interactive'
			keyboardShouldPersistTaps={'handled'}
		>
			<ModalInputSMSCode
				visible={showModalForSMSCode}
				confirmHandler={onSmsCodeConfirmed}
				declineHandler={onSmsCodeDeclined}
				resendHandler={onSmsCodeResend}
				phoneNumber={phoneNumber}
			/>
			<Text style={style.welcomeText}>{getText('login.welcome.message')}</Text>
			<WithResizeOnKeyboardShow>
				{({safeRunAfterKeyboardHide}) => (
					<LoginForm
						getText={getText}
						onStartLogin={onStartLogin}
						safeRunAfterKeyboardHide={safeRunAfterKeyboardHide}
						marginBottom={0} // dummy value here
						loginLoader={loginLoader}
						hideLoader={hideLoader}
					/>
				)}
			</WithResizeOnKeyboardShow>
			<TouchableOpacity onPress={onNavigateToPasswordForgot} style={style.forgotPassword}>
				<Text style={style.forgotPasswordText}>{getText('login.forgot.password')}</Text>
			</TouchableOpacity>
			<SXButton
				label={getText('login.use.unlock.file')}
				onPress={onNavigateToUploadKey}
				borderColor={Colors.transparent}
				disabled={false}
			/>
			<View style={style.noAccountContainer}>
				<Text style={style.noAccountQuestion}>{getText('login.no.account.text')}</Text>
				<TouchableOpacity onPress={onNavigateToRegister}>
					<Text style={style.signUpText}>{getText('login.signUp.button')}</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAwareScrollView>
	</SafeAreaView>
);

const MapDispatchToProps = (dispatch: any, props: ILoginScreenComponentProps) => ({
	loginLoader: () => dispatch(showActivityIndicator(props.getText('login.progress.message'))),
	confirmLoader: () => dispatch(showActivityIndicator(props.getText('login.code.confirm.wait'))),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

export default compose(
	withTranslations,
	connect(
		null,
		MapDispatchToProps,
	),
)(LoginScreenComponent as any);
