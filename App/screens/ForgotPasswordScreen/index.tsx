import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationStackScreenOptions} from 'react-navigation';
import {ApplicationStyles, Colors} from '../../theme';
import style from './style';

export default class ForgotPasswordScreen extends Component {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'FORGOT PASSWORD',
	};

	public render() {
		return (
			<View>
				<Text>Forgot password screen</Text>
			</View>
		);
	}
}
