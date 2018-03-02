import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationStackScreenOptions} from 'react-navigation';
import style from './style';

export default class SearchScreen extends Component {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'SEARCH',
	};

	public render() {
		return (
			<View>
				<Text>Search screen</Text>
			</View>
		);
	}
}
