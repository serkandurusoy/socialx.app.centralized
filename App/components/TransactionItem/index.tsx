import React from 'react';
import {Image, Text, View} from 'react-native';
import {Icons} from '../../theme/';
import style from './style';

export enum TransactionType {
	SOLD = 'Sold',
	BOUGHT = 'Bought',
}

export enum CoinType {
	// here the values are in sync with CoinIcons keys
	SOCX = 'SOCX',
	ETH = 'ETH',
}

enum CoinIcons {
	SOCX = Icons.socxCoinIcon,
	ETH = Icons.ethCoinIcon,
}

export interface TransactionData {
	type: TransactionType;
	firstAmount: number;
	firstCoin: CoinType;
	secondAmount: number;
	secondCoin: CoinType;
	date: Date;
}

export const TransactionItem: React.SFC<TransactionData> = (props) => {
	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<Image source={CoinIcons[props.firstCoin]} style={style.coinIcon} resizeMode={'contain'} />
				<View>
					<View style={style.horizontalContainer}>
						<Text>{props.type}</Text>
						<Text>{props.firstAmount}</Text>
						<Text>{props.firstCoin}</Text>
					</View>
					<View style={style.horizontalContainer}>
						<Text>{'for'}</Text>
						<Text>{props.secondAmount}</Text>
						<Text>{props.secondCoin}</Text>
					</View>
				</View>
			</View>
			<View style={style.rightContainer}>{/*<Text>{props.date}</Text>*/}</View>
		</View>
	);
};

TransactionItem.defaultProps = {};
