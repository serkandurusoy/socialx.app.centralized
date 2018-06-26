import {SXTextInput, TRKeyboardKeys} from 'components/Inputs/TextInput';
import {SXButton} from 'components/Interaction/Button';
import React, {Component} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {connect} from 'react-redux';
import {Colors} from 'theme';
import style from './style';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {ModalManager} from 'hoc/ManagedModal/manager';
import {ForgotPassword, getText} from 'utilities';

interface IForgotPasswordScreenProps {
	navigation: NavigationScreenProp<any>;
	showLoader: (message: string) => void;
	hideLoader: () => void;
}

interface IForgotPasswordScreenState {
	username: string;
	requested: boolean;
}

class ForgotPasswordScreen extends Component<IForgotPasswordScreenProps, IForgotPasswordScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: getText('forgotPasswordScreenTitle'),
		headerRight: <View />,
	};

	public state = {
		username: '',
		requested: false,
	};

	public render() {
		return (
			<ScrollView
				contentContainerStyle={style.container}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
			>
				<Text style={style.descriptionText}>{getText('forgotPasswordInstructions')}</Text>
				<View style={style.usernameInputContainer}>
					<SXTextInput
						placeholder={getText('forgotPasswordUsername')}
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
					label={getText('forgotPasswordSendButton')}
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
		const {showLoader, hideLoader} = this.props;

		showLoader(getText('forgotPasswordRequesting'));
		try {
			const forgotRes = await ForgotPassword(username);
			this.setState({requested: true});
			this.props.navigation.navigate('ResetPasswordScreen', {username});
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('forgotPasswordRequestError', ex.message));
			});
		}
		hideLoader();
	};
}

const MapDispatchToState = (dispatch: any) => ({
	showLoader: (message: string) => dispatch(showActivityIndicator(message)),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

export default connect(
	null,
	MapDispatchToState,
)(ForgotPasswordScreen as any);
