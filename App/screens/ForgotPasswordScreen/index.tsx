import {SXTextInput, TRKeyboardKeys} from 'components/Inputs/TextInput';
import {SXButton} from 'components/Interaction/Button';
import React, {Component} from 'react';
import {Alert, Platform, ScrollView, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {connect} from 'react-redux';
import {Colors} from 'theme';
import style from './style';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {ModalManager} from 'hoc/ManagedModal/manager';
import {ForgotPassword} from 'utilities';

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
		title: 'FORGOT PASSWORD',
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
				<Text style={style.descriptionText}>{'Enter your username to get a new password.'}</Text>
				<View style={style.usernameInputContainer}>
					<SXTextInput
						placeholder={'Username'}
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
					label={'Send reset code'}
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

		showLoader('Requesting Password Code..');
		try {
			const forgotRes = await ForgotPassword(username);
			this.setState({requested: true});
			this.props.navigation.navigate('ResetPasswordScreen', {username});
		} catch (ex) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert('Something wrong, Bad username/Servers down');
			});
			console.log(ex);
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
