import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import {VotingScreenComponent} from './screen';

interface IVotingScreenProps {
	navigation: NavigationScreenProp<any>;
}

const VotingScreen: React.SFC<IVotingScreenProps> = (props) => {
	return <VotingScreenComponent navigation={props.navigation} />;
};

VotingScreen.navigationOptions = {
	title: 'VOTING',
	headerRight: <View />,
};

export default VotingScreen;
