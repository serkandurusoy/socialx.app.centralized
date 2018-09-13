// MIGRATION: migrated to screens/preAuth

import React, {PureComponent} from 'react';
import {Alert, View} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {ModalManager} from 'hoc';
import {ForgotPasswordConfirm, IWithTranslationProps, withTranslations} from 'utilities';
import ResetPasswordScreenComponent from './screen';

interface IResetPasswordScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
	showLoader: (message: string) => void;
	hideLoader: () => void;
}

class ResetPasswordScreen extends PureComponent<IResetPasswordScreenProps> {
	private static navigationOptions = ({navigationOptions}: IResetPasswordScreenProps) => ({
		title: navigationOptions.getText('reset.password.screen.title'),
		headerRight: <View />,
	});

	public render() {
		return <ResetPasswordScreenComponent onSetNewPassword={this.setNewPasswordHandler} />;
	}

	private setNewPasswordHandler = async (resetCode: string, password: string) => {
		const {showLoader, hideLoader, navigation, getText} = this.props;

		const params = navigation.state.params;

		showLoader(getText('reset.password.resetting'));
		try {
			if (!params.username) {
				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert(getText('general.error.message'));
				});
			} else {
				await ForgotPasswordConfirm(params.username, resetCode, password);

				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert(getText('reset.password.success'));
				});
				// TODO: this is not enough to go to MainScreen!
				// later implement logic for login here!
				// resetNavigationToRoute('MainScreen', navigation);
			}
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('reset.password.wrong.code'));
			});
			console.log(ex);
		}
		hideLoader();
	};
}

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
)(ResetPasswordScreen as any);
