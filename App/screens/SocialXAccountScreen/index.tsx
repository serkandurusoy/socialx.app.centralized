import React, {Component} from 'react';
import {NavigationStackScreenOptions} from 'react-navigation';
import {AccountCurrencyData, CoinSymbol} from '../../components/SocialXAccountCurrencyItem';
import SocialXAccountScreenComponent from './screen';

const MY_DIGITAL_COINS: AccountCurrencyData[] = [
	{
		coinSymbol: CoinSymbol.SOCX,
		coinAmount: 799151.311,
		usdValue: 34621,
		trendPercentage: 4.5,
		graphData: [],
	},
	{
		coinSymbol: CoinSymbol.ETH,
		coinAmount: 10.578,
		usdValue: 1341415,
		trendPercentage: -2.6,
		graphData: [],
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
		return <SocialXAccountScreenComponent {...this.state} />;
	}
}
