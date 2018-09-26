// MIGRATION: migrated to screens/myProfile

import {TransactionData, TransactionType, TrendOptions} from 'components/Displayers';
import {CoinSymbol} from 'consts/';
import React, {Component} from 'react';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import WalletActivityScreenComponent from './screen';

let ONE_PAGE_TRANSACTIONS: TransactionData[] = [
	{
		type: TransactionType.BOUGHT,
		firstAmount: 23,
		firstCoin: CoinSymbol.SOCX,
		secondAmount: 0.2,
		secondCoin: CoinSymbol.ETH,
		date: new Date(2018, 2, 13),
		isLoading: false,
	},
	{
		type: TransactionType.SOLD,
		firstAmount: 0.2,
		firstCoin: CoinSymbol.ETH,
		secondAmount: 23,
		secondCoin: CoinSymbol.SOCX,
		date: new Date(2018, 1, 17),
		isLoading: false,
	},
	{
		type: TransactionType.SOLD,
		firstAmount: 23,
		firstCoin: CoinSymbol.SOCX,
		secondAmount: 0.2,
		secondCoin: CoinSymbol.ETH,
		date: new Date(2018, 4, 8),
		isLoading: false,
	},
	{
		type: TransactionType.BOUGHT,
		firstAmount: 0.2,
		firstCoin: CoinSymbol.ETH,
		secondAmount: 23,
		secondCoin: CoinSymbol.SOCX,
		date: new Date(2018, 5, 1),
		isLoading: false,
	},
	{
		type: TransactionType.SOLD,
		firstAmount: 0.2,
		firstCoin: CoinSymbol.ETH,
		secondAmount: 23,
		secondCoin: CoinSymbol.SOCX,
		date: new Date(2018, 11, 12),
		isLoading: false,
	},
];
// from tests it looks like scrolling is smoother if page size is bigger!
// todo @serkan @jake I don't get this?
ONE_PAGE_TRANSACTIONS = [...ONE_PAGE_TRANSACTIONS, ...ONE_PAGE_TRANSACTIONS];

const TOTAL_NUMBER_OF_TRANSACTIONS = 100;

export interface IWalletActivityScreenState {
	myCoins: string;
	trendPercentage: string;
	trendArrow: TrendOptions;
	transactions: TransactionData[];
	refreshing: boolean;
	hasMore: boolean;
}

export interface IWalletActivityScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class WalletActivityScreen extends Component<IWalletActivityScreenProps, IWalletActivityScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'SOCIALX WALLET',
	};

	public state = {
		myCoins: '53,680',
		trendPercentage: '27.21',
		trendArrow: TrendOptions.UP,
		transactions: ONE_PAGE_TRANSACTIONS,
		refreshing: false,
		hasMore: true,
	};

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
		this.props.navigation.navigate('SocialXAccountScreen');
	};

	private refreshDataHandler = () => {
		this.setState({
			refreshing: true,
		});
		setTimeout(() => {
			this.setState({
				refreshing: false,
				transactions: ONE_PAGE_TRANSACTIONS,
			});
		}, 1500);
	};

	private getFirstPlaceholderIndex = (transactions: TransactionData[]): number => {
		let ret = -1;
		transactions.every((transaction, index) => {
			if (transaction.isLoading) {
				ret = index;
				return false;
			}
			return true;
		});
		return ret;
	};

	private loadMoreTransactionsHandler = () => {
		const pageSize = ONE_PAGE_TRANSACTIONS.length;
		if (this.state.transactions.length < TOTAL_NUMBER_OF_TRANSACTIONS) {
			const placeholderTransactions = Array(pageSize).fill({isLoading: true});
			const transactionsWithPlaceholders = [...this.state.transactions, ...placeholderTransactions];
			this.setState({transactions: transactionsWithPlaceholders});
			setTimeout(() => {
				const newTransactions = [...this.state.transactions];
				const toDelete = placeholderTransactions.length;
				const spliceIndex = this.getFirstPlaceholderIndex(newTransactions);
				// TODO: @Serkan ask @Jake what??? and don't use splice in a react project! it directly mutates the original array!
				newTransactions.splice(spliceIndex, toDelete);
				newTransactions.splice(spliceIndex, 0, ...ONE_PAGE_TRANSACTIONS);
				this.setState({transactions: newTransactions});
			}, 2000); // just simulate network calls delay
		} else {
			this.setState({hasMore: false});
		}
	};
}
