import {FormikBag, FormikErrors, FormikProps, withFormik} from 'formik';
import React, {RefObject} from 'react';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {compose} from 'recompose';

import {SXButton, SXTextInput, TKeyboardKeys, TRKeyboardKeys} from 'components';
import {Colors} from 'theme';
import {IWithTranslationProps, PASSWORD_ERROR_MESSAGES, PASSWORD_VALIDATOR_SCHEMA, withTranslations} from 'utilities';
import style from './style';

interface IResetPasswordScreenComponentProps extends IWithTranslationProps {
	onSetNewPassword: (resetCode: string, password: string) => void;
}

interface IResetPasswordForm extends IWithTranslationProps {
	resetCode: string;
	password: string;
	confirmPassword: string;
}

const passwordRef: RefObject<SXTextInput> = React.createRef();
const confirmPasswordRef: RefObject<SXTextInput> = React.createRef();

const ErrorMessage: React.SFC<{text: any; visible: boolean}> = ({text, visible}) => (
	<React.Fragment>{visible && <Text style={style.errorText}>{text}</Text>}</React.Fragment>
);

const ResetPasswordScreenComponent: React.SFC<FormikProps<IResetPasswordForm>> = ({
	values: {resetCode, password, confirmPassword, getText},
	isValid,
	handleSubmit,
	errors,
	touched,
	setFieldValue,
	setFieldTouched,
}) => (
	<KeyboardAwareScrollView
		style={style.scrollView}
		contentContainerStyle={style.scrollContent}
		alwaysBounceVertical={false}
		keyboardShouldPersistTaps={'handled'}
		enableOnAndroid={true}
	>
		<Text style={style.descriptionText}>{getText('reset.password.description')}</Text>
		<View style={style.inputContainer}>
			<SXTextInput
				placeholder={getText('reset.password.reset.code')}
				iconColor={Colors.iron}
				icon={'key'}
				keyboardType={TKeyboardKeys.numeric}
				blurOnSubmit={false}
				returnKeyType={TRKeyboardKeys.next}
				value={resetCode}
				onChangeText={(value: string) => {
					setFieldValue('resetCode', value);
					setFieldTouched('resetCode');
				}}
				onSubmitPressed={() => passwordRef.current && passwordRef.current.focusInput()}
			/>
			<ErrorMessage text={errors.resetCode} visible={!!errors.resetCode && !!touched.resetCode} />
		</View>
		<View style={style.inputContainer}>
			<SXTextInput
				placeholder={getText('reset.password.new.password')}
				iconColor={Colors.iron}
				icon={'eye-slash'}
				blurOnSubmit={false}
				isPassword={true}
				returnKeyType={TRKeyboardKeys.next}
				value={password}
				onChangeText={(value: string) => {
					setFieldValue('password', value);
					setFieldTouched('password');
				}}
				onSubmitPressed={() => confirmPasswordRef.current && confirmPasswordRef.current.focusInput()}
				ref={passwordRef}
			/>
			<ErrorMessage text={errors.password} visible={!!errors.password && !!touched.password} />
		</View>
		<View style={style.inputContainer}>
			<SXTextInput
				placeholder={getText('reset.password.confirm.password')}
				iconColor={Colors.iron}
				icon={'eye-slash'}
				blurOnSubmit={true}
				isPassword={true}
				returnKeyType={TRKeyboardKeys.go}
				value={confirmPassword}
				onChangeText={(value: string) => {
					setFieldValue('confirmPassword', value);
					setFieldTouched('confirmPassword');
				}}
				onSubmitPressed={handleSubmit}
				ref={confirmPasswordRef}
			/>
			<ErrorMessage text={errors.confirmPassword} visible={!!errors.confirmPassword && !!touched.confirmPassword} />
		</View>
		<SXButton
			disabled={!isValid}
			label={getText('reset.password.set.button')}
			autoWidth={true}
			borderColor={Colors.transparent}
			onPress={handleSubmit}
		/>
	</KeyboardAwareScrollView>
);

const formikSettings = {
	mapPropsToValues: ({getText}: IResetPasswordScreenComponentProps) => ({getText, username: ''}),
	validate: ({resetCode, password, confirmPassword, getText}: IResetPasswordForm) => {
		const errors: FormikErrors<IResetPasswordForm> = {};
		if (!resetCode) {
			errors.resetCode = getText('reset.password.code.required');
		}
		if (!password) {
			errors.password = getText('reset.password.password.required');
		} else {
			const passwordErrors = PASSWORD_VALIDATOR_SCHEMA.validate(password, {list: true});
			if (passwordErrors.length > 0) {
				errors.password = (
					<React.Fragment>
						<Text style={style.boldText}>{`${getText('register.password.invalid.policy')}: `}</Text>
						{passwordErrors.map((error: string) => getText(PASSWORD_ERROR_MESSAGES[error])).join(', ')}
					</React.Fragment>
				);
			}
		}
		if (!confirmPassword) {
			errors.confirmPassword = getText('reset.password.confirm.password.required');
		} else if (!errors.password && confirmPassword !== password) {
			errors.confirmPassword = getText('reset.password.error.mismatch');
		}
		return errors;
	},
	handleSubmit: async (
		{resetCode, password}: IResetPasswordForm,
		{props}: FormikBag<IResetPasswordScreenComponentProps, IResetPasswordForm>,
	) => props.onSetNewPassword(resetCode, password),
};

export default compose(
	withTranslations,
	withFormik(formikSettings),
)(ResetPasswordScreenComponent as any);
