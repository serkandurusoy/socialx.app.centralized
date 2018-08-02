import {AvatarPicker} from 'components/Avatar';
import {SXTextInput, TKeyboardKeys, TRKeyboardKeys} from 'components/Inputs';
import {SXButton} from 'components/Interaction';
import {ModalInputSMSCode} from 'components/Modals';
import {CheckBox} from 'native-base';
import React, {Component} from 'react';
import {Alert, Keyboard, Platform, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {Colors, Images, Sizes} from 'theme';
import style from './style';

import {hideActivityIndicator, resetNavigationToRoute, showActivityIndicator} from 'backend/actions';
import {
	ConfirmSignup,
	ISignup,
	IWithTranslationProps,
	resendSignup,
	Signin,
	Signup,
	updateUserAttr,
	withTranslations,
} from 'utilities';

import {addMediaHoc, checkUsernameHoc, createUpdateUserHoc} from 'backend/graphql';
import {createUserFunc} from 'types';

import {ModalManager} from 'hoc/ManagedModal/manager';
import {addFileBN} from 'utilities/ipfs';

import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import {compose} from 'recompose';
import ValidatedPassword from './components/ValidatedPassword';

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

export interface ISignUpScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
	SignupLoading: () => void;
	CreatingUserProfile: () => void;
	ResendCodeLoading: () => void;
	HideLoader: () => void;
	createUser: any;
	addMedia: any;
	checkUsername: any;
	countryCallingCode: string;
}

class SignUpScreen extends Component<ISignUpScreenProps, ISignUpScreenState> {
	private static navigationOptions = ({navigationOptions}) => ({
		title: navigationOptions.getText('register.screen.title'),
		headerRight: <View />,
	});

	private inputRefs: any = {};
	private countryList: string[] = [];
	private mounted = false;

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

	public componentDidMount(): void {
		this.mounted = true;
	}

	public componentWillUnmount(): void {
		this.mounted = false;
	}

	public render() {
		const {getText} = this.props;
		const {email, name, username, phone, password, confirmPassword} = this.state;
		const signupEnabled = this.state.termsAccepted && email && name && username && phone && password && confirmPassword;
		return (
			<KeyboardAwareScrollView
				style={style.keyboardView}
				contentContainerStyle={style.container}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
				enableOnAndroid={true}
			>
				{this.state.showModalForSMSCode && (
					<ModalInputSMSCode
						errorMessage={this.state.smsCodeErrorMessage}
						visible={this.state.showModalForSMSCode}
						confirmHandler={this.smsCodeConfirmedHandler}
						declineHandler={this.smsCodeDeclinedHandler}
						resendHandler={this.smsCodeResendHandler}
						phoneNumber={this.getPhoneNumber()}
					/>
				)}
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
						placeholder={getText('register.email')}
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
						placeholder={getText('register.name')}
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
						placeholder={getText('register.username')}
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
							filterPlaceholder={getText('register.country.select')}
						/>
						<Text style={style.countryCode}>{`(+${this.state.countryCallingCode})`}</Text>
					</View>
					<TextInput
						placeholder={getText('register.phone.number')}
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
				<ValidatedPassword value={this.state.password} />
				<View style={style.textInputContainer}>
					<SXTextInput
						isPassword={true}
						iconColor={Colors.iron}
						icon={'lock'}
						placeholder={getText('register.password')}
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
						placeholder={getText('register.confirm.password')}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.go}
						onSubmitPressed={this.startRegister}
						onChangeText={(value: string) => this.handleInputChangeText(value, 'confirmPassword')}
						ref={(ref: any) => this.updateInputRef(ref, 'confirmPassword')}
						blurOnSubmit={true}
					/>
				</View>
				<View style={style.termsContainer}>
					<Text style={style.acceptText}>{getText('register.accept.part1')}</Text>
					<TouchableOpacity onPress={this.showTermsAndConditionsHandler}>
						<Text style={style.acceptTextLink}>{getText('register.accept.part2')}</Text>
					</TouchableOpacity>
					<CheckBox
						checked={this.state.termsAccepted}
						onPress={this.termsAcceptedUpdatedHandler}
						color={Colors.pink}
						style={style.acceptCheckbox}
					/>
				</View>
				<View style={style.buttonContainer}>
					<SXButton
						label={getText('register.button.label')}
						borderColor={Colors.transparent}
						onPress={this.startRegister}
						disabled={!signupEnabled}
					/>
				</View>
				<View style={style.buttonContainer}>
					<SXButton
						label={getText('register.button.have.code')}
						borderColor={Colors.transparent}
						onPress={this.alreadyHaveCode}
					/>
				</View>
			</KeyboardAwareScrollView>
		);
	}

	private alreadyHaveCode = async () => {
		if (!this.state.username) {
			alert(this.props.getText('register.alert.username.missing'));
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
		if (this.mounted) {
			this.setState({
				showModalForSMSCode: visible,
			});
		}
	};

	private smsCodeConfirmedHandler = async (code: string) => {
		const {email, name, username, password, confirmPassword, updatedAvatarImagePath} = this.state;
		const {createUser, addMedia} = this.props;

		try {
			const res = await ConfirmSignup(this.state.username, code);

			if (!this.state.password) {
				resetNavigationToRoute('LoginScreen', this.props.navigation);
			}

			ModalManager.safeRunAfterModalClosed(() => {
				this.props.CreatingUserProfile();
			});
			Keyboard.dismiss();
			this.toggleVisibleModalSMS(false);

			// signin to get access to appsync
			await Signin(username, password);

			await this.uploadAvatarAndCreateUser(updatedAvatarImagePath, addMedia, createUser, username, name, email);

			this.afterUserCreate();
		} catch (ex) {
			console.log(ex);
			this.setState({
				smsCodeErrorMessage: ex.message,
			});
			this.props.HideLoader();
		}
	};

	private afterUserCreate = () => {
		resetNavigationToRoute('IntroScreen', this.props.navigation);
		this.props.HideLoader();
	};

	private smsCodeDeclinedHandler = () => {
		// TODO: do something here.. (remove user data?)
		this.toggleVisibleModalSMS(false);
		// console.log('TODO: smsCodeDeclinedHandler');
	};

	private smsCodeResendHandler = async () => {
		const {getText} = this.props;
		try {
			this.props.ResendCodeLoading();
			const res = await resendSignup(this.state.username);
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('app.error'), `${getText('register.could.not.resend.code')} ${ex}`);
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
		const {createUser, addMedia, checkUsername, getText} = this.props;

		// closing the modla when using alerts, issue MD-163
		if (password !== confirmPassword) {
			this.toggleVisibleModalSMS();
			Alert.alert(getText('validation.error'), getText('register.password.mismatch'));
			return;
		}

		if (username.length < 4) {
			this.toggleVisibleModalSMS();
			Alert.alert(getText('validation.error'), getText('register.username.length.error'));
			return;
		}

		if (name.length < 4) {
			this.toggleVisibleModalSMS();
			Alert.alert(getText('validation.error'), getText('register.name.length.error'));
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
				Alert.alert(getText('register.failed'), ex.message);
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

const MapDispatchToProps = (dispatch: any, {getText}: ISignUpScreenProps) => ({
	SignupLoading: () => dispatch(showActivityIndicator(getText('register.signingUp'), getText('please.wait'))),
	CreatingUserProfile: () => dispatch(showActivityIndicator(getText('register.confirming.code'))),
	ResendCodeLoading: () => dispatch(showActivityIndicator(getText('register.resending.code'))),
	HideLoader: () => dispatch(hideActivityIndicator()),
});

export default compose(
	withTranslations,
	connect(
		null,
		MapDispatchToProps,
	),
	createUpdateUserHoc,
	addMediaHoc,
)(SignUpScreen);
