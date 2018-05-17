import React from 'react';
import {Text, View} from 'react-native';

export default class GovernanceTab extends React.Component {
	private static navigationOptions = {
		header: null,
	};

	public render() {
		return (
			<View>
				<Text>{'Governance'}</Text>
			</View>
		);
	}
}
