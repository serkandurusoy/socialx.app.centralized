import {withFormik} from 'formik';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {compose} from 'recompose';
import * as yup from 'yup';

import {AvatarName, AvatarPicker, SXTextInput, TKeyboardKeys, TRKeyboardKeys} from 'components';
import {IWithLoaderProps, withInlineLoader} from 'hoc';
import {IBlobData} from 'ipfslib';
import {Colors, Sizes} from 'theme';
import style from './style';

interface ISettingsScreenComponentProps extends IWithLoaderProps {
	aboutText: string;
	firstName: string;
	lastName: string;
	email: string;
	avatarImage: any;
	username?: string;
	onSaveChanges: () => void;
	// miningEnabled: boolean;
}

// interface ISettingsScreenComponentState {
// 	avatarImage: any;
// 	aboutText: string;
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	miningEnabled: boolean;
// 	selectedImage: boolean;
// 	localAvatarPath: string | null;
// }

const SettingsScreenComponent = ({
	values: {aboutText, firstName, lastName, email, avatarImage, username},
	errors,
	touched,
	handleChange,
	handleBlur,
	handleSubmit,
	isValid,
	isSubmitting,
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
					afterImagePick={this.updateAvatarImage}
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
					placeholder={'About you text'}
					borderColor={Colors.dustWhite}
					multiline={true}
					onChangeText={handleChange('email')}
					focusUpdateHandler={(value) => !value && handleBlur('email')}
				/>
			</View>
			<Text style={style.personalDetails}>{'PERSONAL DETAILS'}</Text>
			<View style={[style.textInputContainer, style.textInputContainerFirst]}>
				<SXTextInput
					autoCapitalize={'words'}
					autoCorrect={true}
					value={firstName}
					iconColor={Colors.iron}
					placeholder={'First name'}
					placeholderColor={Colors.postText}
					borderColor={Colors.transparent}
					blurOnSubmit={true}
					returnKeyType={TRKeyboardKeys.done}
				/>
			</View>
			<View style={[style.textInputContainer]}>
				<SXTextInput
					autoCapitalize={'words'}
					autoCorrect={true}
					value={lastName}
					iconColor={Colors.iron}
					placeholder={'Last name'}
					placeholderColor={Colors.postText}
					borderColor={Colors.transparent}
					blurOnSubmit={true}
					returnKeyType={TRKeyboardKeys.done}
				/>
			</View>
			<View style={[style.textInputContainer]}>
				<SXTextInput
					autoCapitalize={'words'}
					autoCorrect={true}
					value={email}
					iconColor={Colors.iron}
					placeholder={'Email'}
					placeholderColor={Colors.postText}
					borderColor={Colors.transparent}
					keyboardType={TKeyboardKeys.emailAddress}
					blurOnSubmit={true}
					returnKeyType={TRKeyboardKeys.done}
				/>
			</View>
			{/*<View style={style.miningContainer}>*/}
			{/*<SettingCheckbox*/}
			{/*title={'Mining (Beta)'}*/}
			{/*description={'Get rewarded for validating transactions within SocialX network'}*/}
			{/*initialValue={miningEnabled}*/}
			{/*valueUpdated={this.toggleMiningSetting}*/}
			{/*/>*/}
			{/*</View>*/}
		</KeyboardAwareScrollView>
		{touched &&
			isValid && (
				<View style={style.bottomContainer}>
					<TouchableOpacity style={style.saveButton} onPress={handleSubmit}>
						<Text style={style.saveButtonText}>{'Save'}</Text>
						<Icon name={'check'} size={Sizes.smartHorizontalScale(30)} color={Colors.green} />
					</TouchableOpacity>
				</View>
			)}
	</View>
);

class SettingsScreenComponent1 extends Component<ISettingsScreenComponentProps> {
	private updateAvatarImage = (localPhotoPath: string) => {
		this.setState({
			avatarImage: {uri: localPhotoPath},
			hasChanges: true,
			selectedImage: true,
			localAvatarPath: localPhotoPath,
		});
	};

	private handleInputChangeText = (value: string, fieldName: string) => {
		const newState: any = {};
		newState[fieldName] = value;
		newState.hasChanges = true;
		this.setState(newState);
	};

	private toggleMiningSetting = (value: boolean) => {
		this.setState({
			hasChanges: true,
			miningEnabled: value,
		});
	};

	// private saveChanges = () => {
	// 	const saveData: SettingsData = {
	// 		updatedAvatarImagePath: this.state.localAvatarPath,
	// 		aboutText: this.state.aboutText,
	// 		firstName: this.state.firstName,
	// 		lastName: this.state.lastName,
	// 		email: this.state.email,
	// 		miningEnabled: this.state.miningEnabled,
	// 	};
	// 	this.props.saveChanges(saveData);
	// };
}

interface IFormValues {
	aboutText: string;
	firstName: string;
	lastName: string;
	email: string;
}

const formikForm = {
	mapPropsToValues: (props: IFormValues) => ({aboutText: '', firstName: '', lastName: '', email: ''}),
	validationSchema: yup.object().shape({
		aboutText: yup.string(),
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		email: yup
			.string()
			.email()
			.required(),
	}),
	handleSubmit: (values, {props, setSubmitting, setErrors, resetForm}) => {
		console.log('handleSubmit props', props);
		console.log('Send form with values', values);
	},
};

export default compose(
	withInlineLoader,
	withFormik(formikForm),
)(SettingsScreenComponent as any);
