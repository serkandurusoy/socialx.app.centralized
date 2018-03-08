import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationStackScreenOptions} from 'react-navigation';
import style from './style';

export default class MyProfileScreen extends Component {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'PROFILE',
	};

	public render() {
		return (
			<View>
				<Text>MyProfile screen</Text>
			</View>
		);
	}
}
