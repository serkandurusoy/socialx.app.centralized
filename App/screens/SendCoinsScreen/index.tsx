import {CoinSymbol} from 'consts';
import React, {Component} from 'react';
import {NavigationStackScreenOptions} from 'react-navigation';
import SendCoinsScreenComponent from './screen';

export default class SendCoinsScreen extends Component {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'SEND',
	};

	public render() {
		return <SendCoinsScreenComponent onContinue={this.onContinueHandler} myCoins={53680} />;
	}

	private onContinueHandler = (userId: string, amount: number, currency: CoinSymbol) => {
		// console.log('onContinueHandler: ' + userId + ' ' + amount + ' ' + currency);
	}
}
