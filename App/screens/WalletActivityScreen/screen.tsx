import React, {Component} from 'react';
import {ActivityIndicator, FlatList, NativeScrollEvent, Text, View} from 'react-native';
import {MyWalletInfo, TransactionData, TransactionItem, TrendOptions} from '../../components/Displayers';
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

const SCROLL_THRESHOLD = 5000;

export default class WalletActivityScreenComponent extends Component<IWalletActivityScreenComponentProps, any> {
	private savedScrollHeight = 0;

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
					onScroll={this.scrollHandler}
					refreshing={this.props.refreshing}
					onRefresh={this.props.refreshData}
					data={this.props.transactions}
					renderItem={this.renderTransaction}
					keyExtractor={(item: TransactionData, index: number) => index.toString()}
				/>
			</View>
		);
	}

	private scrollHandler = (event: NativeScrollEvent) => {
		const scrollYOffset = event.nativeEvent.contentOffset.y;
		const scrollHeight = event.nativeEvent.contentSize.height;
		if (scrollYOffset + SCROLL_THRESHOLD > scrollHeight && scrollHeight > this.savedScrollHeight) {
			this.savedScrollHeight = scrollHeight;
			this.props.loadMoreTransactions();
		}
	}

	private renderTransaction = (data: {item: TransactionData; index: number}) => {
		return <TransactionItem {...data.item} />;
	}
}
