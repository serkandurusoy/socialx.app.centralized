import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
// import {Circle, Rect} from 'react-native-svg';
import {MyWalletInfo, TrendOptions} from '../../components/MyWalletInfo';
// import {SvgAnimatedLinearGradient} from '../../components/SvgAnimatedLinearGradient';
import {TransactionData, TransactionItem, TransactionItemShadow} from '../../components/TransactionItem';
import style from './style';

// import {Sizes} from '../../theme';

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
					// ListFooterComponent={this.renderFooterWhenLoading}
					// extraData={this.props.hasMore}
				/>
			</View>
		);
	}

	private renderTransaction = (data: {item: TransactionData; index: number}) => {
		if (data.item.isPlaceholder) {
			return <TransactionItemShadow />;
		}
		return <TransactionItem {...data.item} />;
	}

	// private renderFooterWhenLoading = () => {
	// 	if (this.props.hasMore) {
	// 		return (
	// 			<View style={style.bottomLoadingContainer}>
	// 				{/*{this.getPlaceholderItem()}*/}
	// 				<TransactionItemShadow/>
	// 			</View>
	// 		);
	// 	}
	// 	return null;
	// }

	// private getPlaceholderItem = () => {
	// 	const circleRadius = Sizes.smartHorizontalScale(50) / 2;
	// 	const rectangleOffset = 2 * circleRadius + Sizes.smartHorizontalScale(9);
	// 	const textFontSize = Sizes.smartHorizontalScale(20);
	// 	const topOffset = Sizes.smartVerticalScale(15);
	// 	const secondTextLineOffset = Sizes.smartHorizontalScale(35) + topOffset;
	// 	const svgHeight = Sizes.smartVerticalScale(82);
	// 	const svgWidth = Sizes.smartHorizontalScale(319);
	// 	const rightRectangleOffsetX = svgWidth - 60;
	// 	const rightRectangleOffsetY = svgHeight / 2 - 20;
	// 	return (
	// 		<SvgAnimatedLinearGradient height={svgHeight} width={'100%'}>
	// 			<Circle y={topOffset} cx={circleRadius} cy={circleRadius} r={circleRadius}/>
	// 			<Rect x={rectangleOffset} y={topOffset} rx={4} ry={4} width='50%' height={textFontSize}/>
	// 			<Rect x={rectangleOffset} y={secondTextLineOffset} rx={4} ry={4} width='40%' height={textFontSize}/>
	// 			<Rect
	// 				x={rightRectangleOffsetX}
	// 				y={rightRectangleOffsetY}
	// 				rx={4}
	// 				ry={4}
	// 				width={50}
	// 				height={20 * 2}
	// 			/>
	// 		</SvgAnimatedLinearGradient>
	// 	);
	// }
}
