import {FormikBag, FormikErrors, FormikProps, withFormik} from 'formik';
import React from 'react';
import {ActivityIndicator, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {compose} from 'recompose';

import {TKeyboardKeys} from 'components';
import {OS_TYPES} from 'consts';
import {IManagedModal, IWithResizeOnKeyboardShowProps, withManagedTransitions, withResizeOnKeyboardShow} from 'hoc';
import {Colors} from 'theme';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

const NUMBER_OF_DIGITS = 6;

export interface IModalInputSMSCodeComponentProps
	extends IManagedModal,
		IWithResizeOnKeyboardShowProps,
		IWithTranslationProps {
	visible: boolean;
	phoneNumber: string;
	errorMessage?: string;
	resendingCode: boolean;
	confirmHandler: (code: string) => void;
	declineHandler: () => void;
	resendHandler: () => void;
}

export interface IWithSMSCodeProps extends IModalInputSMSCodeComponentProps {
	smsCode: string;
}

const ModalInputSMSCodeComponent: React.SFC<FormikProps<IWithSMSCodeProps>> = ({
	values: {
		visible,
		phoneNumber,
		marginBottom,
		errorMessage,
		declineHandler,
		resendHandler,
		onDismiss,
		onModalHide,
		smsCode,
		getText,
		resendingCode,
	},
	isValid,
	handleSubmit,
	setFieldTouched,
	setFieldValue,
}) => (
	<Modal
		onDismiss={onDismiss}
		onModalHide={onModalHide}
		isVisible={visible}
		backdropOpacity={0.7}
		animationIn={'zoomIn'}
		animationOut={'zoomOut'}
		onBackdropPress={declineHandler}
		style={[style.container, Platform.OS === OS_TYPES.IOS ? {marginBottom} : {}]}
	>
		<View style={style.boxContainer}>
			<Text style={style.title}>{getText('modal.sms.code.title')}</Text>
			<View style={style.borderContainer}>
				<Text style={style.message}>{`${getText('modal.sms.code.type.code.message')} ${phoneNumber}`}</Text>
				<View style={style.inputCellsContainer}>
					<TextInput
						style={[style.codeInput, style.inputText]}
						placeholder={'123456'}
						keyboardType={TKeyboardKeys.numeric}
						maxLength={6}
						autoFocus={true}
						onChangeText={(value: string) => {
							setFieldValue('smsCode', value);
							setFieldTouched('smsCode');
						}}
						underlineColorAndroid={Colors.transparent}
					>
						<Text style={style.inputText}>{smsCode}</Text>
					</TextInput>
				</View>
			</View>
			{errorMessage && <Text style={style.errorMessage}>{errorMessage}</Text>}
			<View style={style.buttonsContainer}>
				<TouchableOpacity
					style={[style.button, resendingCode ? style.disabledButton : {}]}
					onPress={resendHandler}
					disabled={resendingCode}
				>
					<Text style={[style.buttonText, style.buttonTextConfirm]}>{getText('modal.sms.code.resend.button')}</Text>
				</TouchableOpacity>
				{resendingCode && <ActivityIndicator size='small' color={Colors.grayText} style={style.activityResend} />}
			</View>
			<View style={style.buttonsContainer}>
				<TouchableOpacity style={[style.button, style.leftButton, style.flexButton]} onPress={declineHandler}>
					<Text style={[style.buttonText, style.buttonTextCancel]}>{getText('button.CANCEL')}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[style.button, style.flexButton, !isValid ? style.disabledButton : {}]}
					onPress={handleSubmit}
					disabled={!isValid}
				>
					<Text style={[style.buttonText, style.buttonTextConfirm]}>{getText('button.OK')}</Text>
				</TouchableOpacity>
			</View>
		</View>
	</Modal>
);

const formikSettings = {
	mapPropsToValues: (props: IModalInputSMSCodeComponentProps) => ({...props, smsCode: ''}),
	validate: ({smsCode}: IWithSMSCodeProps) => {
		const errors: FormikErrors<IWithSMSCodeProps> = {};
		if (!smsCode || smsCode.length < NUMBER_OF_DIGITS) {
			errors.smsCode = true;
		}
		return errors;
	},
	handleSubmit: async (
		{smsCode}: IWithSMSCodeProps,
		{props}: FormikBag<IModalInputSMSCodeComponentProps, IModalInputSMSCodeComponentProps>,
	) => props.confirmHandler(smsCode),
	enableReinitialize: true,
};

export const ModalInputSMSCode = compose(
	withTranslations,
	withManagedTransitions,
	withResizeOnKeyboardShow,
	withFormik(formikSettings),
)(ModalInputSMSCodeComponent as any);
