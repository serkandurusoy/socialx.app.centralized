import React, {Component} from 'react';
import {NavigationStackScreenOptions} from 'react-navigation';
import {TrendOptions} from '../../components/MyWalletInfo';
import {CoinType, TransactionData, TransactionType} from '../../components/TransactionItem';
import WalletActivityScreenComponent from './screen';

const SAMPLE_TRANSACTIONS: TransactionData[] = [
	{
		type: TransactionType.BOUGHT,
		firstAmount: 23,
		firstCoin: CoinType.SOCX,
		secondAmount: 0.2,
		secondCoin: CoinType.ETH,
		date: new Date(2018, 2, 13),
	},
	{
		type: TransactionType.SOLD,
		firstAmount: 0.2,
		firstCoin: CoinType.ETH,
		secondAmount: 23,
		secondCoin: CoinType.SOCX,
		date: new Date(2018, 1, 17),
	},
	{
		type: TransactionType.SOLD,
		firstAmount: 23,
		firstCoin: CoinType.SOCX,
		secondAmount: 0.2,
		secondCoin: CoinType.ETH,
		date: new Date(2018, 4, 8),
	},
	{
		type: TransactionType.BOUGHT,
		firstAmount: 0.2,
		firstCoin: CoinType.ETH,
		secondAmount: 23,
		secondCoin: CoinType.SOCX,
		date: new Date(2018, 5, 1),
	},
	{
		type: TransactionType.SOLD,
		firstAmount: 0.2,
		firstCoin: CoinType.ETH,
		secondAmount: 23,
		secondCoin: CoinType.SOCX,
		date: new Date(2018, 11, 12),
	},
];

const TOTAL_NUMBER_OF_TRANSACTIONS = 40;

export interface IWalletActivityScreenState {
	myCoins: string;
	trendPercentage: string;
	trendArrow: TrendOptions;
	transactions: TransactionData[];
	refreshing: boolean;
	hasMore: boolean;
}

export default class WalletActivityScreen extends Component<any, IWalletActivityScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'SOCIALX WALLET',
	};

	public state = {
		myCoins: '53,680',
		trendPercentage: '27.21',
		trendArrow: TrendOptions.UP,
		transactions: SAMPLE_TRANSACTIONS,
		refreshing: false,
		hasMore: true,
	};

	private isLoading = false;

	public render() {
		return (
			<WalletActivityScreenComponent
				myCoins={this.state.myCoins}
				trendPercentage={this.state.trendPercentage}
				trendArrow={this.state.trendArrow}
				onViewAccount={this.onViewAccountHandler}
				transactions={this.state.transactions}
				refreshing={this.state.refreshing}
				refreshData={this.refreshDataHandler}
				loadMoreTransactions={this.loadMoreTransactionsHandler}
				hasMore={this.state.hasMore}
			/>
		);
	}

	private onViewAccountHandler = () => {
		alert('onViewAccountHandler');
	}

	private refreshDataHandler = () => {
		this.setState({
			refreshing: true,
		});
		setTimeout(() => {
			this.setState({
				refreshing: false,
				transactions: SAMPLE_TRANSACTIONS,
			});
		}, 1500);
	}

	private loadMoreTransactionsHandler = () => {
		if (this.state.transactions.length < TOTAL_NUMBER_OF_TRANSACTIONS) {
			if (!this.isLoading) {
				this.isLoading = true;
				setTimeout(() => {
					this.isLoading = false;
					this.setState({
						transactions: this.state.transactions.concat(SAMPLE_TRANSACTIONS),
					});
				}, 1000); // just simulate network calls delay
			}
		} else {
			this.setState({hasMore: false});
		}
	}
}
