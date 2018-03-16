import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {MyWalletInfo, TrendOptions} from '../../components/MyWalletInfo';
import {TransactionData, TransactionItem} from '../../components/TransactionItem';
import style from './style';

export interface IWalletActivityScreenComponentProps {
	myCoins: string;
	trendPercentage: string;
	trendArrow: TrendOptions;
	onViewAccount: () => void;
	transactions: any[];
	refreshing: boolean;
	refreshData: () => void;
	loadMoreTransactions: () => void;
	hasMore: boolean;
}

export default class WalletActivityScreenComponent extends Component<IWalletActivityScreenComponentProps, any> {
	public render() {
		return (
			<View style={style.container}>
				<MyWalletInfo
					myCoins={this.props.myCoins}
					trendPercentage={this.props.trendPercentage}
					trendArrow={TrendOptions.UP}
					onViewAccount={this.props.onViewAccount}
				/>
				<Text style={style.activityHeader}>{'Activity'}</Text>
				<FlatList
					refreshing={this.props.refreshing}
					onRefresh={this.props.refreshData}
					data={this.props.transactions}
					renderItem={this.renderTransaction}
					onEndReached={this.props.loadMoreTransactions}
					onEndReachedThreshold={0.2}
					keyExtractor={(item: TransactionData, index: number) => index.toString()}
					ListFooterComponent={this.renderFooterWhenLoading}
					extraData={this.props.hasMore}
				/>
			</View>
		);
	}

	private renderTransaction = (data: {item: TransactionData; index: number}) => {
		return <TransactionItem {...data.item} />;
	}

	private renderFooterWhenLoading = () => {
		if (this.props.hasMore) {
			return (
				<View style={style.bottomLoadingContainer}>
					<ActivityIndicator size={'small'} />
				</View>
			);
		}
		return null;
	}
}
