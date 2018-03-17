import moment from 'moment';
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
					<Text style={style.lineText}>
						{props.type} {props.firstAmount} {props.firstCoin}
					</Text>
					<Text style={style.lineText}>
						<Text style={style.grayText}>{'for '}</Text>
						{props.secondAmount} {props.secondCoin}
					</Text>
				</View>
			</View>
			<View style={style.rightContainer}>
				<Text style={style.dateText}>{moment(props.date).format('MMM')}</Text>
				<Text style={style.dateText}>{moment(props.date).format('DD')}</Text>
			</View>
		</View>
	);
};

TransactionItem.defaultProps = {};
