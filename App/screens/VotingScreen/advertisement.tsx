import React from 'react';
import {Text, View} from 'react-native';

export default class AdvertisementTab extends React.Component {
	private static navigationOptions = {
		header: null,
	};

	public render() {
		return (
			<View>
				<Text>{'Advertisement'}</Text>
			</View>
		);
	}
}
