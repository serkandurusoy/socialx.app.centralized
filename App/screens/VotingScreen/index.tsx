import React from 'react';
import {View} from 'react-native';
import {VotingScreenComponent} from './screen';

export default class VotingScreen extends React.Component {
	private static navigationOptions = {
		title: 'VOTING',
		headerRight: <View />,
	};

	public render() {
		return <VotingScreenComponent />;
	}
}
