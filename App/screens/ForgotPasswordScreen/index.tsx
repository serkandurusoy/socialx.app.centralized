import React, {Component} from 'react';
import {Platform, ScrollView, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {SXTextInput, TRKeyboardKeys} from '../../components/Inputs/TextInput';
import {SXButton} from '../../components/Interaction/Button';
import {Colors} from '../../theme';
import style from './style';

interface IForgotPasswordScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface IForgotPasswordScreenState {
	username: string;
}

export default class ForgotPasswordScreen extends Component<IForgotPasswordScreenProps, IForgotPasswordScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'FORGOT PASSWORD',
		headerRight: <View />,
	};

	public state = {
		username: '',
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
					disabled={this.state.username.length === 0}
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
	}

	private sendResetCodeHandler = () => {
		// console.log('TODO: sendResetCodeHandler for username', this.state.username);
		this.props.navigation.navigate('ResetPasswordScreen');
	}
}
