// MIGRATION: migrated to screens/SocialXAccountScreen

import {AccountCurrencyData} from 'components/Displayers';
import {CoinSymbol} from 'consts/';
import React, {Component} from 'react';
import {NavigationStackScreenOptions} from 'react-navigation';
import SocialXAccountScreenComponent from './screen';

const MY_DIGITAL_COINS: AccountCurrencyData[] = [
	{
		coinSymbol: CoinSymbol.SOCX,
		coinAmount: 799151.311,
		usdValue: 34621,
		trendPercentage: 4.5,
		graphData: [0.2, 0.22, 0.19, 0.15, 0.18, 0.25, 0.23, 0.26, 0.2, 0.22, 0.19, 0.15, 0.18, 0.25, 0.23, 0.26],
	},
	{
		coinSymbol: CoinSymbol.ETH,
		coinAmount: 10.578,
		usdValue: 1341415,
		trendPercentage: -2.6,
		graphData: [800, 850, 820, 840, 780, 810, 750, 720, 800, 850, 820, 840, 780, 810, 750, 720],
	},
];

export interface ISocialXAccountScreenState {
	myCoins: number;
	myContribution: number;
	returnPercentage: number;
	myDigitalCoins: AccountCurrencyData[];
}

export default class SocialXAccountScreen extends Component<any, ISocialXAccountScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'SOCIALX ACCOUNT',
	};

	public state = {
		myCoins: 53680,
		myContribution: 42205,
		returnPercentage: 27.21,
		myDigitalCoins: MY_DIGITAL_COINS,
	};

	public render() {
		return (
			<SocialXAccountScreenComponent
				{...this.state}
				sendHandler={this.onSendHandler}
				receiveHandler={this.onReceiveHandler}
			/>
		);
	}

	private onSendHandler = () => {
		alert('onSendHandler');
	};

	private onReceiveHandler = () => {
		alert('onReceiveHandler');
	};
}
