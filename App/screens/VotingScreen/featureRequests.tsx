import React from 'react';
import {Text, View} from 'react-native';

export default class FeatureRequestsTab extends React.Component {
	private static navigationOptions = {
		header: null,
	};

	public render() {
		return (
			<View>
				<Text>{'FeatureRequests'}</Text>
			</View>
		);
	}
}
