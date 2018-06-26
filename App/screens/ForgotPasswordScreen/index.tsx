import React, {Component} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {SXButton, SXTextInput, TRKeyboardKeys} from 'components';
import {ModalManager} from 'hoc';
import {Colors} from 'theme';
import {ForgotPassword, IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

interface IForgotPasswordScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
	showLoader: (message: string) => void;
	hideLoader: () => void;
}

interface IForgotPasswordScreenState {
	username: string;
	requested: boolean;
}

class ForgotPasswordScreen extends Component<IForgotPasswordScreenProps, IForgotPasswordScreenState> {
	private static navigationOptions = (props: IForgotPasswordScreenProps) => ({
		// TODO: this is a bad hack, we should reconsider the architecture!
		title: props.navigationOptions.getText('forgot.password.screen.title'),
		headerRight: <View />,
	});

	public state = {
		username: '',
		requested: false,
	};

	public render() {
		const {getText} = this.props;
		return (
			<ScrollView
				contentContainerStyle={style.container}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
			>
				<Text style={style.descriptionText}>{getText('forgot.password.instructions')}</Text>
				<View style={style.usernameInputContainer}>
					<SXTextInput
						placeholder={getText('forgot.password.username')}
						iconColor={Colors.iron}
						icon={'user'}
						blurOnSubmit={true}
						returnKeyType={TRKeyboardKeys.go}
						onSubmitPressed={this.sendResetCodeHandler}
						onChangeText={this.usernameUpdated}
					/>
				</View>
				<SXButton
					disabled={this.state.username.length === 0 || this.state.requested}
					label={getText('forgot.password.send.button')}
					autoWidth={true}
					borderColor={Colors.transparent}
					onPress={this.sendResetCodeHandler}
				/>
			</ScrollView>
		);
	}

	private usernameUpdated = (value: string) => {
		this.setState({
			username: value,
		});
	};

	private sendResetCodeHandler = async () => {
		const {username} = this.state;
		const {showLoader, hideLoader, getText} = this.props;

		showLoader(getText('forgot.password.requesting'));
		try {
			const forgotRes = await ForgotPassword(username);
			this.setState({requested: true});
			this.props.navigation.navigate('ResetPasswordScreen', {username});
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('forgot.password.request.error', ex.message));
			});
		}
		hideLoader();
	};
}

const MapDispatchToState = (dispatch: any) => ({
	showLoader: (message: string) => dispatch(showActivityIndicator(message)),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

export default compose(
	withTranslations,
	connect(
		null,
		MapDispatchToState,
	),
)(ForgotPasswordScreen as any);
