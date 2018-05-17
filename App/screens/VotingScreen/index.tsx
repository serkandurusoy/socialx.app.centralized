import React from 'react';
import {View} from 'react-native';
import {VotingScreenComponent} from './screen';

const VotingScreen: React.SFC = (props) => {
	return <VotingScreenComponent />;
};

VotingScreen.navigationOptions = {
	title: 'VOTING',
	headerRight: <View />,
};

export default VotingScreen;
