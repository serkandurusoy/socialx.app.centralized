import {FormikBag, FormikErrors, FormikProps, withFormik} from 'formik';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {compose} from 'recompose';

import {SXButton, SXTextInput, TRKeyboardKeys} from 'components';
import {Colors} from 'theme';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

interface IForgotPasswordScreenCompProps extends IWithTranslationProps {
	onSendResetCode: (username: string) => Promise<void>;
}

interface IForgotPasswordForm extends IWithTranslationProps {
	username: string;
}

const ForgotPasswordScreenComponent: React.SFC<FormikProps<IForgotPasswordForm>> = ({
	values: {getText, username},
	isValid,
	handleSubmit,
	isSubmitting,
	errors,
	setFieldValue,
}) => (
	<ScrollView
		contentContainerStyle={style.container}
		alwaysBounceVertical={false}
		keyboardShouldPersistTaps={'handled'}
	>
		<Text style={style.descriptionText}>{getText('forgot.password.instructions')}</Text>
		<View style={style.usernameInputContainer}>
			<SXTextInput
				placeholder={getText('forgot.password.username')}
				iconColor={Colors.iron}
				icon={'user'}
				blurOnSubmit={true}
				returnKeyType={TRKeyboardKeys.go}
				value={username}
				onSubmitPressed={handleSubmit}
				onChangeText={(value: string) => {
					setFieldValue('username', value);
				}}
			/>
			{errors.username && <Text style={style.errorText}>{errors.username}</Text>}
		</View>
		<SXButton
			disabled={!isValid || isSubmitting}
			label={getText('forgot.password.send.button')}
			autoWidth={true}
			borderColor={Colors.transparent}
			onPress={handleSubmit}
		/>
	</ScrollView>
);

const formikSettings = {
	mapPropsToValues: ({getText}: IForgotPasswordScreenCompProps) => ({getText, username: ''}),
	validate: ({username, getText}: IForgotPasswordForm) => {
		const errors: FormikErrors<IForgotPasswordForm> = {};
		if (!username) {
			errors.username = getText('forgot.password.username.required');
		}
		return errors;
	},
	handleSubmit: async (
		{username}: IForgotPasswordForm,
		{props, setSubmitting}: FormikBag<IForgotPasswordScreenCompProps, IForgotPasswordForm>,
	) => {
		setSubmitting(true);
		await props.onSendResetCode(username);
		setSubmitting(false);
	},
};

export default compose(
	withTranslations,
	withFormik(formikSettings),
)(ForgotPasswordScreenComponent as any);
