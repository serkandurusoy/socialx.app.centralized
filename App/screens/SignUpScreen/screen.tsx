import {FormikBag, FormikErrors, FormikProps, withFormik} from 'formik';
import {CheckBox} from 'native-base';
import PasswordValidator from 'password-validator';
import React, {RefObject} from 'react';
import {ImageSourcePropType, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';
import DeviceInfo from 'react-native-device-info';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {string} from 'yup';

import {AvatarPicker, ModalInputSMSCode, SXButton, SXTextInput, TKeyboardKeys, TRKeyboardKeys} from 'components';
import {Colors, Images, Sizes} from 'theme';
import {IWithTranslationProps, withTranslations} from 'utilities';
import {RegisterData} from './index';
import style from './style';

interface ISignUpFormikProps extends IWithTranslationProps {
	onAlreadyHaveCode: () => void;
	onNavigateToTermsAndConditions: () => void;
	onStartRegister: (userData: RegisterData) => void;
}

interface ISignUpScreenComponentProps extends ISignUpFormikProps {
	showModalForSMSCode: boolean;
	smsCodeErrorMessage: string;
	phoneNumber: string;
	onSmsCodeConfirmed: (code: string) => void;
	onSmsCodeDeclined: () => void;
	onSmsCodeResend: () => void;
}

interface ISignUpFormProps extends IWithTranslationProps {
	email: string;
	name: string;
	username: string;
	phoneNumber: string;
	password: string;
	confirmPassword: string;
	termsAccepted: boolean;
	avatarImage: ImageSourcePropType;
	countryCCA2: string;
	countryCallingCode: string;
	onAlreadyHaveCode: () => void;
	onNavigateToTermsAndConditions: () => void;
}

interface ICountryData {
	cca2: string;
	callingCode: string;
}

const MIN_PASSWORD_LENGTH = 8;
const VALIDATOR_SCHEMA = new PasswordValidator()
	.is()
	.min(MIN_PASSWORD_LENGTH)
	.has()
	.lowercase()
	.has()
	.uppercase()
	.has()
	.digits()
	.has()
	.symbols();

const ERROR_MESSAGES: {[key: string]: string} = {
	min: 'register.password.min.length',
	uppercase: 'register.password.invalid.uppercase',
	lowercase: 'register.password.invalid.lowercase',
	digits: 'register.password.invalid.numbers',
	symbols: 'register.password.invalid.symbols',
};

const nameRef: RefObject<SXTextInput> = React.createRef();
const usernameRef: RefObject<SXTextInput> = React.createRef();
const phoneNumberRef: RefObject<TextInput> = React.createRef();
const passwordRef: RefObject<SXTextInput> = React.createRef();
const confirmPasswordRef: RefObject<SXTextInput> = React.createRef();

const EMAIL_SCHEMA = string().email();

const DEVICE_COUNTRY = DeviceInfo.getDeviceCountry();
const ALL_COUNTRIES = getAllCountries();
const COUNTRY_LIST = ALL_COUNTRIES.map((country: ICountryData) => country.cca2);
const DEVICE_COUNTRY_CALLING_CODE = ALL_COUNTRIES.reduce(
	(value: string, country: ICountryData) => (country.cca2 === DEVICE_COUNTRY ? country.callingCode : value),
	'',
);

const ErrorMessage: React.SFC<{text: any; visible: boolean}> = ({text, visible}) => (
	<React.Fragment>
		{visible && (
			<View style={style.errorContainer}>
				<Text style={style.errorText}>{text}</Text>
			</View>
		)}
	</React.Fragment>
);

const SignUpForm: React.SFC<FormikProps<ISignUpFormProps>> = ({
	values: {
		email,
		name,
		username,
		phoneNumber,
		password,
		confirmPassword,
		termsAccepted,
		avatarImage,
		countryCCA2,
		countryCallingCode,
		getText,
		onAlreadyHaveCode,
		onNavigateToTermsAndConditions,
	},
	errors,
	touched,
	handleSubmit,
	isValid,
	setFieldTouched,
	setFieldValue,
}) => (
	<React.Fragment>
		{/*<View style={style.buttonContainer}>*/}
		{/*<SXButton label={'IMPORT FROM DOCK.IO'} borderColor={Colors.transparent} disabled={true}/>*/}
		{/*</View>*/}
		{/*<Text style={style.orText}>{'or'}</Text>*/}
		<View style={style.avatarPickerContainer}>
			<AvatarPicker
				avatarImage={avatarImage}
				afterImagePick={(localPhotoPath: string) => setFieldValue('avatarImage', {uri: localPhotoPath}, false)}
			/>
		</View>
		<View style={[style.textInputContainer, style.textInputContainerFirst]}>
			<ErrorMessage text={errors.email} visible={!!touched.email && !!errors.email} />
			<SXTextInput
				iconColor={Colors.iron}
				icon={'envelope'}
				placeholder={getText('register.email')}
				placeholderColor={Colors.postText}
				borderColor={Colors.transparent}
				returnKeyType={TRKeyboardKeys.next}
				value={email}
				onChangeText={(value: string) => {
					setFieldValue('email', value);
					setFieldTouched('email');
				}}
				onSubmitPressed={() => nameRef.current && nameRef.current.focusInput()}
				keyboardType={TKeyboardKeys.emailAddress}
			/>
		</View>
		<View style={style.textInputContainer}>
			<ErrorMessage text={errors.name} visible={!!touched.name && !!errors.name} />
			<SXTextInput
				autoCapitalize={'words'}
				autoCorrect={true}
				iconColor={Colors.iron}
				icon={'user'}
				placeholder={getText('register.name')}
				placeholderColor={Colors.postText}
				borderColor={Colors.transparent}
				returnKeyType={TRKeyboardKeys.next}
				value={name}
				ref={nameRef}
				onChangeText={(value: string) => {
					setFieldValue('name', value);
					setFieldTouched('name');
				}}
				onSubmitPressed={() => usernameRef.current && usernameRef.current.focusInput()}
			/>
		</View>
		<View style={style.textInputContainer}>
			<ErrorMessage text={errors.username} visible={!!touched.username && !!errors.username} />
			<SXTextInput
				iconColor={Colors.iron}
				icon={'user'}
				placeholder={getText('register.username')}
				placeholderColor={Colors.postText}
				borderColor={Colors.transparent}
				returnKeyType={TRKeyboardKeys.next}
				value={username}
				ref={usernameRef}
				onChangeText={(value: string) => {
					setFieldValue('username', value);
					setFieldTouched('username');
				}}
				onSubmitPressed={() => phoneNumberRef.current && phoneNumberRef.current.focus()}
			/>
		</View>
		<View style={style.textInputContainer}>
			<ErrorMessage text={errors.phoneNumber} visible={!!touched.phoneNumber && !!errors.phoneNumber} />
			<View style={style.directionRow}>
				<View style={style.phoneInputIconContainer}>
					<Icon name={'phone'} size={Sizes.smartHorizontalScale(30)} color={Colors.iron} />
				</View>
				<View style={style.countryPickerContainer}>
					<CountryPicker
						countryList={COUNTRY_LIST}
						translation={'eng'}
						cca2={countryCCA2}
						onChange={(country: ICountryData) => {
							setFieldValue('countryCCA2', country.cca2);
							setFieldValue('countryCallingCode', country.callingCode);
						}}
						closeable={true}
						filterable={true}
						filterPlaceholder={getText('register.country.select')}
					/>
					<Text style={style.countryCode}>{`(+${countryCallingCode})`}</Text>
				</View>
				<TextInput
					placeholder={getText('register.phone.number')}
					placeholderTextColor={Colors.postText}
					style={style.phoneNumberInput}
					returnKeyType={TRKeyboardKeys.next}
					keyboardType={TKeyboardKeys.phonePad}
					autoCorrect={false}
					underlineColorAndroid={Colors.transparent}
					autoCapitalize='none'
					clearButtonMode='while-editing'
					value={phoneNumber}
					ref={phoneNumberRef}
					onChangeText={(value: string) => {
						setFieldValue('phoneNumber', value);
						setFieldTouched('phoneNumber');
					}}
					onSubmitEditing={() => passwordRef.current && passwordRef.current.focusInput()}
				/>
			</View>
		</View>
		<View style={style.textInputContainer}>
			<ErrorMessage text={errors.password} visible={!!touched.password && !!errors.password} />
			<SXTextInput
				isPassword={true}
				iconColor={Colors.iron}
				icon={'lock'}
				placeholder={getText('register.password')}
				placeholderColor={Colors.postText}
				borderColor={Colors.transparent}
				returnKeyType={TRKeyboardKeys.next}
				value={password}
				ref={passwordRef}
				onChangeText={(value: string) => {
					setFieldValue('password', value);
					setFieldTouched('password');
				}}
				onSubmitPressed={() => confirmPasswordRef.current && confirmPasswordRef.current.focusInput()}
			/>
		</View>
		<View style={style.textInputContainer}>
			<ErrorMessage text={errors.confirmPassword} visible={!!touched.confirmPassword && !!errors.confirmPassword} />
			<SXTextInput
				isPassword={true}
				iconColor={Colors.iron}
				icon={'lock'}
				placeholder={getText('register.confirm.password')}
				placeholderColor={Colors.postText}
				borderColor={Colors.transparent}
				returnKeyType={TRKeyboardKeys.go}
				value={confirmPassword}
				ref={confirmPasswordRef}
				onChangeText={(value: string) => {
					setFieldValue('confirmPassword', value);
					setFieldTouched('confirmPassword');
				}}
				onSubmitPressed={handleSubmit}
				blurOnSubmit={true}
			/>
		</View>
		<View style={style.termsContainer}>
			<Text style={style.acceptText}>{getText('register.accept.part1')}</Text>
			<TouchableOpacity onPress={onNavigateToTermsAndConditions}>
				<Text style={style.acceptTextLink}>{getText('register.accept.part2')}</Text>
			</TouchableOpacity>
			<CheckBox
				checked={termsAccepted}
				onPress={() => setFieldValue('termsAccepted', !termsAccepted)}
				color={Colors.pink}
				style={style.acceptCheckbox}
			/>
		</View>
		<View style={style.buttonContainer}>
			<SXButton
				label={getText('register.button.label')}
				onPress={handleSubmit}
				disabled={!(isValid && termsAccepted)}
				borderColor={Colors.transparent}
			/>
		</View>
		<View style={style.buttonContainer}>
			<SXButton
				label={getText('register.button.have.code')}
				onPress={onAlreadyHaveCode}
				disabled={username === '' || !!errors.username}
				borderColor={Colors.transparent}
			/>
		</View>
	</React.Fragment>
);

const SignUpFormik = withFormik({
	mapPropsToValues: ({getText, onAlreadyHaveCode, onNavigateToTermsAndConditions}: ISignUpFormikProps) => ({
		email: 'ionut.movila@gmail.com',
		name: 'Ionut Movila',
		username: '',
		phoneNumber: '721205279',
		password: 'Socx@0000',
		confirmPassword: 'Socx@0000',
		termsAccepted: false,
		avatarImage: Images.user_avatar_placeholder,
		getText,
		countryCCA2: DEVICE_COUNTRY,
		countryCallingCode: DEVICE_COUNTRY_CALLING_CODE,
		onAlreadyHaveCode,
		onNavigateToTermsAndConditions,
	}),
	validate: (values: ISignUpFormProps) => {
		const {email, name, username, phoneNumber, password, confirmPassword, getText} = values;
		const errors: FormikErrors<ISignUpFormProps> = {};
		if (!email) {
			errors.email = getText('register.screen.email.required');
		} else if (!EMAIL_SCHEMA.isValidSync(email)) {
			errors.email = getText('register.screen.email.invalid');
		}
		if (!name) {
			errors.name = getText('register.screen.name.required');
		}
		if (!username) {
			errors.username = getText('register.screen.username.required');
		}
		if (!phoneNumber) {
			errors.phoneNumber = getText('register.screen.phone.number.required');
		}
		if (!password) {
			errors.password = getText('register.screen.confirm.password.required');
		} else {
			const passwordErrors = VALIDATOR_SCHEMA.validate(password, {list: true});
			if (passwordErrors.length > 0) {
				errors.password = (
					<React.Fragment>
						<Text style={style.boldText}>{`${getText('register.password.invalid.policy')}: `}</Text>
						{passwordErrors.map((error: string) => getText(ERROR_MESSAGES[error])).join(', ')}
					</React.Fragment>
				);
			}
		}
		if (!confirmPassword) {
			errors.confirmPassword = getText('register.screen.confirm.password.required');
		} else if (!errors.password && confirmPassword !== password) {
			errors.confirmPassword = getText('register.screen.confirm.password.mismatch');
		}
		return errors;
	},
	handleSubmit: async (
		{email, name, username, phoneNumber, countryCallingCode, password, avatarImage}: ISignUpFormProps,
		{props}: FormikBag<ISignUpFormikProps, ISignUpFormProps>,
	) => {
		props.onStartRegister({
			email,
			name,
			username,
			phoneNumber: `+${countryCallingCode}${phoneNumber}`,
			password,
			avatarImage,
		});
	},
})(SignUpForm as any);

const SignUpScreenComponent: React.SFC<ISignUpScreenComponentProps> = ({
	showModalForSMSCode,
	smsCodeErrorMessage,
	onSmsCodeConfirmed,
	onSmsCodeDeclined,
	onSmsCodeResend,
	phoneNumber,
	onAlreadyHaveCode,
	onNavigateToTermsAndConditions,
	onStartRegister,
	getText,
}) => (
	<KeyboardAwareScrollView
		style={style.keyboardView}
		contentContainerStyle={style.container}
		alwaysBounceVertical={false}
		keyboardShouldPersistTaps={'handled'}
		enableOnAndroid={true}
	>
		{showModalForSMSCode && (
			<ModalInputSMSCode
				errorMessage={smsCodeErrorMessage}
				visible={true}
				confirmHandler={onSmsCodeConfirmed}
				declineHandler={onSmsCodeDeclined}
				resendHandler={onSmsCodeResend}
				phoneNumber={phoneNumber}
			/>
		)}
		<SignUpFormik
			onAlreadyHaveCode={onAlreadyHaveCode}
			onNavigateToTermsAndConditions={onNavigateToTermsAndConditions}
			onStartRegister={onStartRegister}
			getText={getText}
		/>
	</KeyboardAwareScrollView>
);

export default withTranslations(SignUpScreenComponent as any);
