import {FormikErrors, FormikProps, withFormik} from 'formik';
import React from 'react';
import {ImageSourcePropType, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {string} from 'yup';

import {
	AvatarName,
	AvatarPicker,
	InputSizes,
	SettingCheckbox,
	SXTextInput,
	TKeyboardKeys,
	TRKeyboardKeys,
} from 'components';
import {IWithLoaderProps, WithInlineLoader} from 'hoc';
import {Colors, Sizes} from 'theme';
import {IWithTranslationProps, withTranslations} from 'utilities';
import {SettingsData} from './index';
import style from './style';

const EMAIL_SCHEMA = string().email();

interface ISettingsScreenComponentProps extends IWithTranslationProps {
	aboutText: string;
	firstName: string;
	lastName: string;
	email: string;
	miningEnabled: boolean;
	avatarImage: ImageSourcePropType;
	username: string;
	onSaveChanges: (values: SettingsData) => Promise<void>;
}

interface ISettingScreenWithLoaderProps extends ISettingsScreenComponentProps, IWithLoaderProps {}

interface TranslatedSettings extends SettingsData, IWithTranslationProps {}

const SettingsScreenComponent: React.SFC<FormikProps<TranslatedSettings>> = ({
	values: {aboutText, firstName, lastName, email, avatarImage, username, miningEnabled, getText},
	errors,
	handleChange,
	handleBlur,
	handleSubmit,
	isValid,
	isSubmitting,
	setFieldValue,
}) => (
	<View style={{flex: 1}}>
		<KeyboardAwareScrollView
			style={style.keyboardView}
			contentContainerStyle={style.container}
			alwaysBounceVertical={false}
			enableOnAndroid={true}
			keyboardShouldPersistTaps={'handled'}
		>
			<View style={style.pickerContainer}>
				<AvatarPicker
					avatarImage={avatarImage}
					afterImagePick={(localPhotoPath: string) => setFieldValue('avatarImage', {uri: localPhotoPath}, false)}
					avatarSize={Sizes.smartHorizontalScale(103)}
				/>
			</View>
			<AvatarName
				fullName={firstName + ' ' + lastName}
				username={username}
				fullNameColor={Colors.postFullName}
				userNameColor={Colors.postHour}
			/>
			<View style={style.aboutContainer}>
				<SXTextInput
					autoCapitalize={'sentences'}
					autoCorrect={true}
					value={aboutText}
					placeholder={getText('settings.screen.about.text.placeholder')}
					borderColor={Colors.dustWhite}
					multiline={true}
					onChangeText={handleChange('aboutText')}
					focusUpdateHandler={(value) => !value && handleBlur('aboutText')}
				/>
			</View>
			<Text style={style.personalDetails}>{getText('settings.screen.personal.details')}</Text>
			<View style={[style.textInputContainer, style.textInputContainerFirst]}>
				<SXTextInput
					autoCapitalize={'words'}
					autoCorrect={true}
					value={firstName}
					iconColor={Colors.iron}
					placeholder={getText('settings.screen.first.name.placeholder')}
					placeholderColor={Colors.postText}
					size={InputSizes.Small}
					borderColor={Colors.transparent}
					blurOnSubmit={true}
					returnKeyType={TRKeyboardKeys.done}
					onChangeText={handleChange('firstName')}
					focusUpdateHandler={(value) => !value && handleBlur('firstName')}
				/>
				{errors.firstName && <Text style={style.errorText}>{errors.firstName}</Text>}
			</View>
			<View style={[style.textInputContainer]}>
				<SXTextInput
					autoCapitalize={'words'}
					autoCorrect={true}
					value={lastName}
					iconColor={Colors.iron}
					placeholder={getText('settings.screen.last.name.placeholder')}
					placeholderColor={Colors.postText}
					borderColor={Colors.transparent}
					size={InputSizes.Small}
					blurOnSubmit={true}
					returnKeyType={TRKeyboardKeys.done}
					onChangeText={handleChange('lastName')}
					focusUpdateHandler={(value) => !value && handleBlur('lastName')}
				/>
				{errors.lastName && <Text style={style.errorText}>{errors.lastName}</Text>}
			</View>
			<View style={[style.textInputContainer]}>
				<SXTextInput
					autoCapitalize={'words'}
					value={email}
					iconColor={Colors.iron}
					placeholder={getText('settings.screen.email.placeholder')}
					placeholderColor={Colors.postText}
					borderColor={Colors.transparent}
					size={InputSizes.Small}
					keyboardType={TKeyboardKeys.emailAddress}
					blurOnSubmit={true}
					returnKeyType={TRKeyboardKeys.done}
					onChangeText={handleChange('email')}
					focusUpdateHandler={(value) => !value && handleBlur('email')}
				/>
				{errors.email && <Text style={style.errorText}>{errors.email}</Text>}
			</View>
			<View style={style.miningContainer}>
				<SettingCheckbox
					title={getText('settings.screen.mining.title')}
					description={getText('settings.screen.mining.description')}
					value={miningEnabled}
					onValueUpdated={() => setFieldValue('miningEnabled', !miningEnabled, false)}
				/>
			</View>
		</KeyboardAwareScrollView>
		{isValid &&
			!isSubmitting && (
				<View style={style.bottomContainer}>
					<TouchableOpacity style={style.saveButton} onPress={handleSubmit}>
						<Text style={style.saveButtonText}>{getText('settings.screen.save.button')}</Text>
						<Icon name={'check'} size={Sizes.smartHorizontalScale(30)} color={Colors.green} />
					</TouchableOpacity>
				</View>
			)}
	</View>
);

const SettingsForm = withFormik({
	mapPropsToValues: ({
		aboutText,
		firstName,
		lastName,
		email,
		avatarImage,
		username,
		miningEnabled,
		getText,
	}: ISettingsScreenComponentProps) => ({
		aboutText,
		firstName,
		lastName,
		email,
		avatarImage,
		username,
		miningEnabled,
		getText,
	}),
	validate: (values: TranslatedSettings) => {
		const {firstName, lastName, email, getText} = values;
		const errors: FormikErrors<TranslatedSettings> = {};
		if (!email) {
			errors.email = getText('settings.screen.email.required');
		} else if (!EMAIL_SCHEMA.isValidSync(email)) {
			errors.email = getText('settings.screen.email.invalid');
		}
		if (!firstName) {
			errors.firstName = getText('settings.screen.first.name.required');
		}
		if (!lastName) {
			errors.lastName = getText('settings.screen.last.name.required');
		}
		return errors;
	},
	handleSubmit: async (values: TranslatedSettings, {props, setSubmitting, resetForm, setErrors}) => {
		setSubmitting(true);
		await props.onSaveChanges(values);
		setSubmitting(false);
		resetForm(values);
	},
})(SettingsScreenComponent as any);

const SettingScreenWithLoader: React.SFC<ISettingScreenWithLoaderProps> = (props) => (
	<WithInlineLoader isLoading={props.isLoading}>
		<SettingsForm {...props} />
	</WithInlineLoader>
);

export default withTranslations(SettingScreenWithLoader as any);
