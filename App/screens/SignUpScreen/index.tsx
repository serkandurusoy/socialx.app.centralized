import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationStackScreenOptions} from 'react-navigation';
import {ApplicationStyles, Colors} from '../../theme';

export default class SignUpScreen extends Component {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'REGISTER',
		headerTintColor: Colors.white, // color for screen title and back button
		headerTitleStyle: ApplicationStyles.screenHeader,
	};

	public render() {
		return (
			<View>
				<Text>SignUp screen</Text>
			</View>
		);
	}
}
