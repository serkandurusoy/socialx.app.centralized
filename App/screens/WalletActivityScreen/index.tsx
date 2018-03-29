import React, {Component} from 'react';
import {NavigationStackScreenOptions} from 'react-navigation';
import {TrendOptions} from '../../components/MyWalletInfo';
import {TransactionData, TransactionType} from '../../components/TransactionItem';
import {CoinSymbol} from '../../constants/';
import WalletActivityScreenComponent from './screen';

const SAMPLE_TRANSACTIONS: TransactionData[] = [
	{
		type: TransactionType.BOUGHT,
		firstAmount: 23,
		firstCoin: CoinSymbol.SOCX,
		secondAmount: 0.2,
		secondCoin: CoinSymbol.ETH,
		date: new Date(2018, 2, 13),
	},
	{
		type: TransactionType.SOLD,
		firstAmount: 0.2,
		firstCoin: CoinSymbol.ETH,
		secondAmount: 23,
		secondCoin: CoinSymbol.SOCX,
		date: new Date(2018, 1, 17),
	},
	{
		type: TransactionType.SOLD,
		firstAmount: 23,
		firstCoin: CoinSymbol.SOCX,
		secondAmount: 0.2,
		secondCoin: CoinSymbol.ETH,
		date: new Date(2018, 4, 8),
	},
	{
		type: TransactionType.BOUGHT,
		firstAmount: 0.2,
		firstCoin: CoinSymbol.ETH,
		secondAmount: 23,
		secondCoin: CoinSymbol.SOCX,
		date: new Date(2018, 5, 1),
	},
	{
		type: TransactionType.SOLD,
		firstAmount: 0.2,
		firstCoin: CoinSymbol.ETH,
		secondAmount: 23,
		secondCoin: CoinSymbol.SOCX,
		date: new Date(2018, 11, 12),
	},
];

const PAGE_SIZE = SAMPLE_TRANSACTIONS.length;

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
		if (this.state.transactions.length < TOTAL_NUMBER_OF_TRANSACTIONS && this.state.transactions.length >= PAGE_SIZE) {
			if (!this.isLoading) {
				// console.log('loadMoreTransactionsHandler');
				this.isLoading = true;
				const placeholderTransactions = Array(PAGE_SIZE).fill({isPlaceholder: true});
				const transactionsWithPlaceholders = this.state.transactions.concat(placeholderTransactions);
				this.setState({transactions: transactionsWithPlaceholders});
				setTimeout(() => {
					this.isLoading = false;
					let newTransactions = [].concat(this.state.transactions);
					const toDelete = placeholderTransactions.length;
					const spliceIndex = newTransactions.length - toDelete;
					newTransactions.splice(spliceIndex, toDelete);
					newTransactions = newTransactions.concat(SAMPLE_TRANSACTIONS);
					this.setState({
						transactions: newTransactions,
					});
				}, 1000); // just simulate network calls delay
			}
		} else {
			this.setState({hasMore: false});
		}
	}
}
