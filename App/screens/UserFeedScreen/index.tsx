import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationStackScreenOptions} from 'react-navigation';
import {ApplicationStyles, Colors} from '../../theme';
import style from './style';

export default class UserFeedScreen extends Component {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'FEED ',
	};

	public render() {
		return (
			<View>
				<Text>UserFeed screen</Text>
			</View>
		);
	}
}
