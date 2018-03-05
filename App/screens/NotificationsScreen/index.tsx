import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationStackScreenOptions} from 'react-navigation';
import style from './style';

export default class NotificationsScreen extends Component {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'NOTIFICATIONS',
	};

	public render() {
		return (
			<View>
				<Text>Notifications screen</Text>
			</View>
		);
	}
}
