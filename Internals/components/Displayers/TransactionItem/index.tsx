import {CoinIcons, CoinSymbol} from 'consts';
import moment from 'moment';
import React from 'react';
import {Image, StyleProp, Text, View, ViewStyle} from 'react-native';
import {LoaderView} from '../LoaderView';
import style from './style';

export enum TransactionType {
	SOLD = 'Sold',
	BOUGHT = 'Bought',
}

export interface TransactionData {
	type: TransactionType;
	firstAmount: number;
	firstCoin: CoinSymbol;
	secondAmount: number;
	secondCoin: CoinSymbol;
	date: Date;
	isLoading: boolean;
}

export const TransactionItem: React.SFC<TransactionData> = (props) => {
	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<LoaderView isLoading={props.isLoading} style={style.coinIconLoader}>
					<Image source={CoinIcons[props.firstCoin]} style={style.coinIcon} resizeMode={'contain'} />
				</LoaderView>
				<View>
					<LoaderView isLoading={props.isLoading} style={style.lineTextFirstLoader}>
						<Text style={style.lineText}>
							{props.type} {props.firstAmount} {props.firstCoin}
						</Text>
					</LoaderView>
					<LoaderView isLoading={props.isLoading} style={style.lineTextSecondLoader}>
						<Text style={style.lineText}>
							<Text style={style.grayText}>{'for '}</Text>
							{props.secondAmount} {props.secondCoin}
						</Text>
					</LoaderView>
				</View>
			</View>
			<View style={style.rightContainer}>
				<LoaderView isLoading={props.isLoading} style={style.dateTextLoader}>
					<Text style={style.dateText}>{moment(props.date).format('MMM')}</Text>
				</LoaderView>
				<LoaderView isLoading={props.isLoading} style={style.dateTextLoader}>
					<Text style={style.dateText}>{moment(props.date).format('DD')}</Text>
				</LoaderView>
			</View>
		</View>
	);
};
