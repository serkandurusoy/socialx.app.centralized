import React, {Component} from 'react';
import {Alert, Keyboard, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {connect} from 'react-redux';
import {AvatarPicker} from '../../components/Avatar';
import {SXTextInput, TKeyboardKeys, TRKeyboardKeys} from '../../components/Inputs';
import {SXButton} from '../../components/Interaction';
import {ModalInputSMSCode} from '../../components/Modals';
import {Colors, Images} from '../../theme';
import style from './style';

import {hideActivityIndicator, showActivityIndicator} from '../../actions';
import {ConfirmSignup, ISignup, resendSignup, Signin, Signup, updateUserAttr} from '../../utils';

import {addMediaHoc, checkUsernameHoc, createUpdateUserHoc} from '../../graphql';
import {createUserFunc} from '../../types/gql';

import {ModalManager} from '../../hoc/ManagedModal/manager';
import {addBlob} from '../../utils/ipfs';

export interface ISignUpScreenState {
	email: string;
	name: string;
	username: string;
	password: string;
	confirmPassword: string;
	avatarImage: any;
	phone: string;
	updatedAvatarImageBase64: string;
	showModalForSMSCode: boolean;
	smsCodeErrorMessage: string | null;
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
}

class SignUpScreen extends Component<ISignUpScreenProps, ISignUpScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'REGISTER',
	};

	public state = {
		email: '',
		name: '',
		username: '',
		phone: '',
		password: '',
		confirmPassword: '',
		avatarImage: Images.user_avatar_placeholder,
		updatedAvatarImageBase64: '',
		showModalForSMSCode: false,
		smsCodeErrorMessage: null,
	};

	private inputRefs: any = {};

	public render() {
		return (
			<KeyboardAwareScrollView
				style={style.keyboardView}
				contentContainerStyle={style.container}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
			>
				<ModalInputSMSCode
					errorMessage={this.state.smsCodeErrorMessage}
					visible={this.state.showModalForSMSCode}
					confirmHandler={this.smsCodeConfirmedHandler}
					declineHandler={this.smsCodeDeclinedHandler}
					resendHandler={this.smsCodeResendHandler}
					phoneNumber={this.state.phone}
				/>
				<View style={style.buttonContainer}>
					<SXButton label={'IMPORT FROM DOCK.IO'} borderColor={Colors.transparent} disabled={true} />
				</View>
				<Text style={style.orText}>{'or'}</Text>
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
					<SXTextInput
						iconColor={Colors.iron}
						icon={'phone'}
						placeholder={'Phone number (with country code)'}
						placeholderColor={Colors.postText}
						borderColor={Colors.transparent}
						returnKeyType={TRKeyboardKeys.next}
						onSubmitPressed={() => this.handleInputSubmitPressed('password')}
						onChangeText={(value: string) => this.handleInputChangeText(value, 'phone')}
						ref={(ref: any) => this.updateInputRef(ref, 'phone')}
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
					<SXButton label={'REGISTER NOW!'} borderColor={Colors.transparent} onPress={this.startRegister} />
				</View>
			</KeyboardAwareScrollView>
		);
	}

	private updateInputRef = (inputRef: SXTextInput, fieldName: string) => {
		this.inputRefs[fieldName] = inputRef;
	}

	private handleInputChangeText = (value: string, fieldName: string) => {
		const newState: any = {};
		newState[fieldName] = value;
		this.setState(newState);
	}

	private handleInputSubmitPressed = (nextInputRef: string) => {
		if (nextInputRef in this.inputRefs) {
			this.inputRefs[nextInputRef].focusInput();
		}
	}

	private toggleVisibleModalSMS = (visible = true) => {
		Keyboard.dismiss();
		this.setState({
			showModalForSMSCode: visible,
		});
	}

	private smsCodeConfirmedHandler = async (code: string) => {
		const {email, name, username, password, confirmPassword, updatedAvatarImageBase64, phone} = this.state;
		const {createUser, addMedia} = this.props;

		let mediaId: string | undefined;

		try {
			this.props.ConfirmSignupLoading();
			const res = await ConfirmSignup(this.state.username, code);

			// signin to get access to appsync
			await Signin(username, password);

			if (updatedAvatarImageBase64 !== '') {
				// do ipfs
				const ipfsResp: any = await addBlob([
					{
						name: 'avatar',
						filename: 'avatar.jpg',
						data: updatedAvatarImageBase64,
					},
				]);
				const {Hash, Size} = JSON.parse(ipfsResp.data);

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
			} else {
				await createUser({
					variables: {
						username,
						name,
						email,
					},
				});
			}

			Keyboard.dismiss();
			this.toggleVisibleModalSMS(false);
			this.props.navigation.navigate('MainScreen');
			// this.props.navigation.navigate('SaveKeyScreen');
		} catch (ex) {
			console.log(ex);
			this.setState({
				smsCodeErrorMessage: ex.message,
			});
		}
		this.props.HideLoader();
	}

	private smsCodeDeclinedHandler = () => {
		// TODO: do something here.. (remove user data?)
		this.toggleVisibleModalSMS(false);
		// console.log('TODO: smsCodeDeclinedHandler');
	}

	private smsCodeResendHandler = async () => {
		try {
			this.props.ResendCodeLoading();
			const res = await resendSignup(this.state.username);
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert('Could not resend confirmation code');
			});
		}
		this.props.HideLoader();
	}

	private startRegister = async () => {
		const {email, name, username, password, confirmPassword, updatedAvatarImageBase64, phone} = this.state;
		const {createUser, addMedia, checkUsername} = this.props;

		// closing the modla when using alerts, issue MD-163
		if (password !== confirmPassword) {
			this.toggleVisibleModalSMS();
			Alert.alert('Your passwords don\'t match');
			return;
		}

		if (username.length < 4) {
			this.toggleVisibleModalSMS();
			Alert.alert('Enter a username bigger than 4 letters');
			return;
		}

		if (name.length < 4) {
			this.toggleVisibleModalSMS();
			Alert.alert('Enter a name bigger than 4 letters');
			return;
		}

		// try {
		// 	const checkUser = await checkUsername({variables: {username}});
		// 	if (checkUser.data.checkUsername.userId) {
		// 		Alert.alert('This username is taken');
		// 		return;
		// 	}
		// } catch (e) {
		// 	// --
		// 	console.log(e);
		// }

		try {
			this.props.SignupLoading();

			// do cognito
			const signupParams: any = {
				username,
				password,
				attributes: {
					phone_number: phone,
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
				Alert.alert(ex.message);
			});
			this.toggleVisibleModalSMS(false);
		}
		Keyboard.dismiss();
		this.props.HideLoader();
	}

	private updateAvatarImage = (base64Photo: string) => {
		this.setState({
			updatedAvatarImageBase64: base64Photo,
			avatarImage: {uri: base64Photo},
		});
	}
}

const MapDispatchToProps = (dispatch: any) => ({
	SignupLoading: () => dispatch(showActivityIndicator('Signing you up', 'please wait..')),
	ConfirmSignupLoading: () => dispatch(showActivityIndicator('Confirming your code')),
	ResendCodeLoading: () => dispatch(showActivityIndicator('Resending code..')),
	HideLoader: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(null, MapDispatchToProps)(SignUpScreen as any);
const createUpdateUserWrapper = createUpdateUserHoc(reduxWrapper);
const addMediaWrapper = addMediaHoc(createUpdateUserWrapper);

export default addMediaWrapper;
