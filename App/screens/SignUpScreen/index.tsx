import noop from 'lodash/noop';
import React, {Component} from 'react';
import {Alert, ImageSourcePropType, ImageURISource, Keyboard, View} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, resetNavigationToRoute, showActivityIndicator} from 'backend/actions';
import {addMediaHoc, createUpdateUserHoc} from 'backend/graphql';
import {addFileBN, ConfirmSignup, IWithTranslationProps, resendSignup, Signin, Signup, withTranslations} from 'utilities';
import {ModalManager} from 'hoc';
import SignUpScreenComponent from './screen';

interface ISignUpScreenState {
	registerData?: RegisterData;
	resendingCode: boolean;
	showModalForSMSCode: boolean;
	smsCodeErrorMessage: string | null;
}

interface ISignUpScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
	RegisterLoading: () => void;
	CreatingUserProfile: () => void;
	HideLoader: () => void;
	createUser: any;
	addMedia: any;
	checkUsername: any;
	countryCallingCode: string;
}

export interface RegisterData {
	email: string;
	name: string;
	username: string;
	phoneNumber: string;
	password: string;
	avatarImage: ImageSourcePropType;
}

class SignUpScreen extends Component<ISignUpScreenProps, ISignUpScreenState> {
	private static navigationOptions = ({navigationOptions}: ISignUpScreenProps) => ({
		title: navigationOptions.getText('register.screen.title'),
		headerRight: <View />,
	});

	public state = {
		registerData: undefined,
		resendingCode: false,
		showModalForSMSCode: false,
		smsCodeErrorMessage: null,
	};

	public render() {
		const {showModalForSMSCode, smsCodeErrorMessage, registerData, resendingCode} = this.state;
		return (
			<SignUpScreenComponent
				phoneNumber={registerData !== undefined ? registerData.phoneNumber : ''}
				resendingCode={resendingCode}
				showModalForSMSCode={showModalForSMSCode}
				smsCodeErrorMessage={smsCodeErrorMessage}
				onSmsCodeConfirmed={this.smsCodeConfirmedHandler}
				onSmsCodeDeclined={this.smsCodeDeclinedHandler}
				onSmsCodeResend={this.smsCodeResendHandler}
				onStartRegister={this.startRegisterHandler}
				onAlreadyHaveCode={this.toggleVisibleModalSMS} // TODO: we will have to revisit this later!
				onNavigateToTermsAndConditions={this.onNavigateToTermsAndConditionsHandler}
			/>
		);
	}

	private onNavigateToTermsAndConditionsHandler = () => {
		this.props.navigation.navigate('TermsAndConditionsScreen');
	};

	private toggleVisibleModalSMS = (visible = true) => {
		Keyboard.dismiss();
		this.setState({
			showModalForSMSCode: visible,
		});
	};

	private startRegisterHandler = async (userData: RegisterData) => {
		const {username, password, email, phoneNumber} = userData;
		const {getText} = this.props;

		this.setState({
			registerData: userData,
		});

		try {
			this.props.RegisterLoading();

			// do cognito
			const signupParams: any = {
				username,
				password,
				attributes: {
					phone_number: phoneNumber,
					email,
				},
			};
			await Signup(signupParams);

			ModalManager.safeRunAfterModalClosed(() => {
				this.toggleVisibleModalSMS();
			});
		} catch (ex) {
			console.log(ex);
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('register.failed'), ex.message);
			});
		}
		Keyboard.dismiss();
		this.props.HideLoader();
	};

	private smsCodeConfirmedHandler = async (code: string) => {
		// TODO: @Serkan why TS error below?
		const {email, name, username, password, avatarImage} = this.state.registerData!;
		const {createUser, addMedia} = this.props;

		try {
			await ConfirmSignup(username, code);

			ModalManager.safeRunAfterModalClosed(this.props.CreatingUserProfile);
			Keyboard.dismiss();
			this.toggleVisibleModalSMS(false);

			// signin to get access to appsync
			await Signin(username, password);

			const avatarImagePath = typeof avatarImage === 'object' ? (avatarImage as ImageURISource).uri : undefined;

			await this.uploadAvatarAndCreateUser(avatarImagePath, addMedia, createUser, username, name, email);
		} catch (ex) {
			console.log(ex);
			this.setState({
				smsCodeErrorMessage: ex.message,
			});
			this.props.HideLoader();
		}
	};

	private smsCodeDeclinedHandler = () => {
		// TODO: do something here.. (remove user data?)
		this.toggleVisibleModalSMS(false);
	};

	private smsCodeResendHandler = async () => {
		const {getText} = this.props;
		this.setState({
			resendingCode: true,
			smsCodeErrorMessage: null,
		});
		try {
			await resendSignup(this.state.registerData!.username); // TODO: same TS error here, why?
		} catch (ex) {
			this.setState({
				smsCodeErrorMessage: `${getText('register.could.not.resend.code')} ${ex}`,
			});
		}
		this.setState({
			resendingCode: false,
		});
	};

	private uploadAvatarAndCreateUser = async (
		avatarImagePath: string | undefined,
		addMedia: any,
		createUser: any,
		username: string,
		name: string,
		email: string,
	) => {
		let mediaId: string | undefined;
		if (avatarImagePath) {
			// do ipfs
			await addFileBN(avatarImagePath, noop, noop, noop, async (rest) => {
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

				this.afterUserCreate();
			});
		} else {
			await createUser({
				variables: {
					username,
					name,
					email,
				},
			});
			this.afterUserCreate();
		}
	};

	private afterUserCreate = () => {
		resetNavigationToRoute('IntroScreen', this.props.navigation);
		this.props.HideLoader();
	};
}

const MapDispatchToProps = (dispatch: any, {getText}: ISignUpScreenProps) => ({
	RegisterLoading: () => dispatch(showActivityIndicator(getText('register.signingUp'), getText('please.wait'))),
	CreatingUserProfile: () => dispatch(showActivityIndicator(getText('register.confirming.code'))),
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
)(SignUpScreen as any);
