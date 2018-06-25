import {AvatarPicker} from 'components/Avatar';
import {SXTextInput, TKeyboardKeys, TRKeyboardKeys} from 'components/Inputs';
import {SXButton} from 'components/Interaction';
import {ModalInputSMSCode} from 'components/Modals';
import {CheckBox} from 'native-base';
import React, {Component} from 'react';
import {Alert, Keyboard, Platform, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {connect} from 'react-redux';
import {Colors, Images, Sizes} from 'theme';
import style from './style';

import {hideActivityIndicator, resetNavigationToRoute, showActivityIndicator} from 'backend/actions';
import {ConfirmSignup, ISignup, resendSignup, Signin, Signup, updateUserAttr} from 'utilities';

import {addMediaHoc, checkUsernameHoc, createUpdateUserHoc} from 'backend/graphql';
import {createUserFunc} from 'types';

import {ModalManager} from 'hoc/ManagedModal/manager';
import {addFileBN} from 'utilities/ipfs';

import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ICountryData {
	cca2: string;
	callingCode: string;
}

export interface ISignUpScreenState {
	email: string;
	name: string;
	username: string;
	password: string;
	confirmPassword: string;
	avatarImage: any;
	phone: string;
	updatedAvatarImagePath: string;
	showModalForSMSCode: boolean;
	smsCodeErrorMessage: string | null;
	countryCCA2: string;
	countryCallingCode: string;
	termsAccepted: boolean;
}

export interface ISignUpScreenProps {
	navigation: NavigationScreenProp<any>;
	SignupLoading: () => void;
	ConfirmSignupLoading: () => void;
	ResendCodeLoading: () => void;
	HideLoader: () => void;
	createUser: any;
	addMedia: any;
	checkUsername: any;
	countryCallingCode: string;
}

class SignUpScreen extends Component<ISignUpScreenProps, ISignUpScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'REGISTER',
		headerRight: <View />,
	};

	private inputRefs: any = {};
	private countryList: string[] = [];

	// TODO: @serkan @jake let's simplify this and eliminate needless reinitialization with all countries like this
	constructor(props: ISignUpScreenProps) {
		super(props);
		const deviceCountry = DeviceInfo.getDeviceCountry();
		const allCountries = getAllCountries();
		let deviceCountryCallingCode = '';
		allCountries.forEach((country: ICountryData) => {
			this.countryList.push(country.cca2);
			if (country.cca2 === deviceCountry) {
				deviceCountryCallingCode = country.callingCode;
			}
		});
		this.state = {
			email: '',
			name: '',
			username: '',
			phone: '',
			password: '',
			confirmPassword: '',
			avatarImage: Images.user_avatar_placeholder,
			updatedAvatarImagePath: '',
			showModalForSMSCode: false,
			smsCodeErrorMessage: null,
			countryCCA2: deviceCountry,
			countryCallingCode: deviceCountryCallingCode,
			termsAccepted: false,
		};
	}

	public render() {
		return (
			<KeyboardAwareScrollView
				style={style.keyboardView}
				contentContainerStyle={style.container}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
				enableOnAndroid={true}
			>
				<ModalInputSMSCode
					errorMessage={this.state.smsCodeErrorMessage}
					visible={this.state.showModalForSMSCode}
					confirmHandler={this.smsCodeConfirmedHandler}
					declineHandler={this.smsCodeDeclinedHandler}
					resendHandler={this.smsCodeResendHandler}
					phoneNumber={this.getPhoneNumber()}
				/>
				{/* <View style={style.buttonContainer}>
					<SXButton label={'IMPORT FROM DOCK.IO'} borderColor={Colors.transparent} disabled={true} />
				</View>
				<Text style={style.orText}>{'or'}</Text> */}
				<View style={style.avatarPickerContainer}>
					<AvatarPicker afterImagePick={this.updateAvatarImage} avatarImage={this.state.avatarImage} />
				</View>
				{/* TODO: disable all inputfields on submit */}
				<View style={[style.textInputContainer, style.textInputContainerFirst]}>
					<SXTextInput
						iconColor={Colors.iron}
						icon={'envelope'}
						placeholder={'Email'}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.next}
						onSubmitPressed={() => this.handleInputSubmitPressed('name')}
						onChangeText={(value: string) => this.handleInputChangeText(value, 'email')}
						keyboardType={TKeyboardKeys.emailAddress}
						ref={(ref: any) => this.updateInputRef(ref, 'email')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						autoCapitalize={'words'}
						autoCorrect={true}
						iconColor={Colors.iron}
						icon={'user'}
						placeholder={'Name'}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.next}
						onSubmitPressed={() => this.handleInputSubmitPressed('username')}
						onChangeText={(value: string) => this.handleInputChangeText(value, 'name')}
						ref={(ref: any) => this.updateInputRef(ref, 'name')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						iconColor={Colors.iron}
						icon={'user'}
						placeholder={'Username'}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.next}
						onSubmitPressed={() => this.handleInputSubmitPressed('phone')}
						onChangeText={(value: string) => this.handleInputChangeText(value, 'username')}
						ref={(ref: any) => this.updateInputRef(ref, 'username')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<View style={style.phoneInputIconContainer}>
						<Icon name={'phone'} size={Sizes.smartHorizontalScale(30)} color={Colors.iron} />
					</View>
					<View style={style.countryPickerContainer}>
						<CountryPicker
							countryList={this.countryList}
							translation={'eng'}
							cca2={this.state.countryCCA2}
							onChange={this.updatedSelectedCountryHandler}
							closeable={true}
							filterable={true}
							filterPlaceholder={'Search your country..'}
						/>
						<Text style={style.countryCode}>{`(+${this.state.countryCallingCode})`}</Text>
					</View>
					<TextInput
						placeholder={'Phone number'}
						placeholderTextColor={Colors.postText}
						style={style.phoneNumberInput}
						returnKeyType={TRKeyboardKeys.next}
						keyboardType={TKeyboardKeys.phonePad}
						onSubmitEditing={() => this.handleInputSubmitPressed('password')}
						onChangeText={(value: string) => this.handleInputChangeText(value, 'phone')}
						ref={(ref: any) => this.updateInputRef(ref, 'phone')}
						autoCorrect={false}
						underlineColorAndroid={Colors.transparent}
						autoCapitalize='none'
						clearButtonMode='while-editing'
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						isPassword={true}
						iconColor={Colors.iron}
						icon={'lock'}
						placeholder={'Password'}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.next}
						onSubmitPressed={() => this.handleInputSubmitPressed('confirmPassword')}
						onChangeText={(value: string) => this.handleInputChangeText(value, 'password')}
						ref={(ref: any) => this.updateInputRef(ref, 'password')}
					/>
				</View>
				<View style={style.textInputContainer}>
					<SXTextInput
						isPassword={true}
						iconColor={Colors.iron}
						icon={'lock'}
						placeholder={'Confirm Password'}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.go}
						onSubmitPressed={this.startRegister}
						onChangeText={(value: string) => this.handleInputChangeText(value, 'confirmPassword')}
						ref={(ref: any) => this.updateInputRef(ref, 'confirmPassword')}
						blurOnSubmit={true}
					/>
				</View>
				<View style={[style.buttonContainer, style.registerButtonContainer]}>
					<SXButton
						label={'REGISTER NOW!'}
						borderColor={Colors.transparent}
						onPress={this.startRegister}
						disabled={!this.state.termsAccepted}
					/>
					<SXButton
						label={'Already have the code? Click here!'}
						borderColor={Colors.transparent}
						onPress={this.alreadyHaveCode}
					/>
				</View>
				<View style={style.termContainer}>
					<Text style={style.acceptText}>{'Accept our'}</Text>
					<TouchableOpacity onPress={this.showTermsAndConditionsHandler}>
						<Text style={style.acceptTextLink}>{'Terms and Conditions'}</Text>
					</TouchableOpacity>
					<CheckBox
						checked={this.state.termsAccepted}
						onPress={this.termsAcceptedUpdatedHandler}
						color={Colors.pink}
						style={style.acceptCheckbox}
					/>
				</View>
			</KeyboardAwareScrollView>
		);
	}

	private alreadyHaveCode = async () => {
		if (!this.state.username) {
			alert('Please fill in the username you entered before inside the \'Username\' field above and click this again!');
		} else {
			this.toggleVisibleModalSMS();
		}
	};

	private showTermsAndConditionsHandler = () => {
		this.props.navigation.navigate('TermsAndConditionsScreen');
	};

	private termsAcceptedUpdatedHandler = () => {
		this.setState({
			termsAccepted: !this.state.termsAccepted,
		});
	};

	private updateInputRef = (inputRef: SXTextInput, fieldName: string) => {
		this.inputRefs[fieldName] = inputRef;
	};

	private handleInputChangeText = (value: string, fieldName: string) => {
		const newState: any = {};
		newState[fieldName] = value;
		this.setState(newState);
	};

	private handleInputSubmitPressed = (nextInputRef: string) => {
		if (nextInputRef in this.inputRefs) {
			if (this.inputRefs[nextInputRef].hasOwnProperty('focusInput')) {
				this.inputRefs[nextInputRef].focusInput();
			} else {
				this.inputRefs[nextInputRef].focus();
			}
		}
	};

	private toggleVisibleModalSMS = (visible = true) => {
		Keyboard.dismiss();
		this.setState({
			showModalForSMSCode: visible,
		});
	};

	private smsCodeConfirmedHandler = async (code: string) => {
		const {email, name, username, password, confirmPassword, updatedAvatarImagePath} = this.state;
		const {createUser, addMedia} = this.props;

		try {
			this.props.ConfirmSignupLoading();
			const res = await ConfirmSignup(this.state.username, code);

			if (!this.state.password) {
				Keyboard.dismiss();
				this.toggleVisibleModalSMS(false);
				resetNavigationToRoute('LoginScreen', this.props.navigation);
			}

			// signin to get access to appsync
			await Signin(username, password);

			await this.uploadAvatarAndCreateUser(updatedAvatarImagePath, addMedia, createUser, username, name, email);

			Keyboard.dismiss();
			this.toggleVisibleModalSMS(false);
			resetNavigationToRoute('IntroScreen', this.props.navigation);
			// this.props.navigation.navigate('SaveKeyScreen');
		} catch (ex) {
			console.log(ex);
			this.setState({
				smsCodeErrorMessage: ex.message,
			});
		}
		this.props.HideLoader();
	};

	private smsCodeDeclinedHandler = () => {
		// TODO: do something here.. (remove user data?)
		this.toggleVisibleModalSMS(false);
		// console.log('TODO: smsCodeDeclinedHandler');
	};

	private smsCodeResendHandler = async () => {
		try {
			this.props.ResendCodeLoading();
			const res = await resendSignup(this.state.username);
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert('App error', 'Could not resend confirmation code: ' + ex);
			});
		}
		this.props.HideLoader();
	};

	private getPhoneNumber = () => {
		return '+' + this.state.countryCallingCode + this.state.phone;
	};

	private startRegister = async () => {
		if (!this.state.termsAccepted) {
			return;
		}

		const {email, name, username, password, confirmPassword, updatedAvatarImagePath} = this.state;
		const {createUser, addMedia, checkUsername} = this.props;

		// closing the modla when using alerts, issue MD-163
		if (password !== confirmPassword) {
			this.toggleVisibleModalSMS();
			Alert.alert('Validation error', 'Your passwords don\'t match');
			return;
		}

		if (username.length < 4) {
			this.toggleVisibleModalSMS();
			Alert.alert('Validation error', 'Enter a username bigger than 4 letters');
			return;
		}

		if (name.length < 4) {
			this.toggleVisibleModalSMS();
			Alert.alert('Validation error', 'Enter a name bigger than 4 letters');
			return;
		}

		try {
			this.props.SignupLoading();

			// do cognito
			const signupParams: any = {
				username,
				password,
				attributes: {
					phone_number: this.getPhoneNumber(),
					email,
				},
			};
			const res = await Signup(signupParams);

			ModalManager.safeRunAfterModalClosed(() => {
				this.toggleVisibleModalSMS();
			});
		} catch (ex) {
			console.log(ex);
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert('Register failed', ex.message);
			});
			this.toggleVisibleModalSMS(false);
		}
		Keyboard.dismiss();
		this.props.HideLoader();
	};

	private uploadAvatarAndCreateUser = async (
		updatedAvatarImagePath: string,
		addMedia: any,
		createUser: any,
		username: string,
		name: string,
		email: string,
	) => {
		let mediaId: string | undefined;
		if (updatedAvatarImagePath) {
			// do ipfs
			const placeholderFunc = () => {};
			await addFileBN(updatedAvatarImagePath, placeholderFunc, placeholderFunc, placeholderFunc, async (rest) => {
				const {Hash, Size} = JSON.parse(rest.responseBody);
				// do addMedia
				const mediaObj = await addMedia({
					variables: {
						type: 'ProfileImage',
						size: parseInt(Size, undefined),
						hash: Hash,
					},
				});
				mediaId = mediaObj.data.addMedia.id;

				await createUser({
					variables: {
						username,
						name,
						avatar: mediaId,
						email,
					},
				});
			});
		} else {
			await createUser({
				variables: {
					username,
					name,
					email,
				},
			});
		}
	};

	private updateAvatarImage = (base64Photo: string) => {
		this.setState({
			updatedAvatarImagePath: base64Photo,
			avatarImage: {uri: base64Photo},
		});
	};

	private updatedSelectedCountryHandler = (country: ICountryData) => {
		this.setState({
			countryCCA2: country.cca2,
			countryCallingCode: country.callingCode,
		});
	};
}

const MapDispatchToProps = (dispatch: any) => ({
	SignupLoading: () => dispatch(showActivityIndicator('Signing you up', 'please wait..')),
	ConfirmSignupLoading: () => dispatch(showActivityIndicator('Confirming your code')),
	ResendCodeLoading: () => dispatch(showActivityIndicator('Resending code..')),
	HideLoader: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(
	null,
	MapDispatchToProps,
)(SignUpScreen as any);
const createUpdateUserWrapper = createUpdateUserHoc(reduxWrapper);
const addMediaWrapper = addMediaHoc(createUpdateUserWrapper);

export default addMediaWrapper;
