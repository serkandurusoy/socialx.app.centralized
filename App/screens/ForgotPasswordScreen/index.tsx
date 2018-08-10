import React from 'react';
import {Alert, View} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {ModalManager} from 'hoc';
import {ForgotPassword, IWithTranslationProps, withTranslations} from 'utilities';
import ForgotPasswordScreenComponent from './screen';

interface IForgotPasswordScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
	showLoader: (message: string) => void;
	hideLoader: () => void;
}

const sendResetCodeHandler = async (
	username: string,
	getText: (value: string, ...args: any[]) => string,
	showLoader: (message: string) => void,
	hideLoader: () => void,
	navigation: NavigationScreenProp<any>,
) => {
	showLoader(getText('forgot.password.requesting'));
	try {
		await ForgotPassword(username);
		navigation.navigate('ResetPasswordScreen', {username});
	} catch (ex) {
		ModalManager.safeRunAfterModalClosed(() => {
			Alert.alert(getText('forgot.password.request.error', ex.message));
		});
	}
	hideLoader();
};

const ForgotPasswordScreen: React.SFC<IForgotPasswordScreenProps> = ({getText, navigation, showLoader, hideLoader}) => (
	<ForgotPasswordScreenComponent
		onSendResetCode={async (username: string) =>
			sendResetCodeHandler(username, getText, showLoader, hideLoader, navigation)
		}
	/>
);

ForgotPasswordScreen.navigationOptions = ({navigationOptions}: IForgotPasswordScreenProps) => ({
	title: navigationOptions.getText('forgot.password.screen.title'),
	headerRight: <View />,
});

const MapDispatchToProps = (dispatch: any) => ({
	showLoader: (message: string) => dispatch(showActivityIndicator(message)),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

export default compose(
	withTranslations,
	connect(
		null,
		MapDispatchToProps,
	),
)(ForgotPasswordScreen as any);
