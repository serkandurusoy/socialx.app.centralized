import React, {Component} from 'react';
import {NavigationStackScreenOptions} from 'react-navigation';
import SocialXAccountScreenComponent from './screen';

export interface ISocialXAccountScreenState {
	myCoins: string;
	myContribution: string;
	returnPercentage: string;
}

export default class SocialXAccountScreen extends Component<any, ISocialXAccountScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'SOCIALX ACCOUNT',
	};

	public state = {
		myCoins: '53,680',
		myContribution: '42,205',
		returnPercentage: '27.21',
	};

	public render() {
		return <SocialXAccountScreenComponent {...this.state} />;
	}
}
