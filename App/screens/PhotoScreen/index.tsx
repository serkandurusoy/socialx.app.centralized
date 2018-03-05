import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationStackScreenOptions} from 'react-navigation';
import style from './style';

export default class PhotoScreen extends Component {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'PHOTO',
	};

	public render() {
		return (
			<View>
				<Text>Photo screen</Text>
			</View>
		);
	}
}
