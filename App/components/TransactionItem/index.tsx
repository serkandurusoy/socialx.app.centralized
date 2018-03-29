import moment from 'moment';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {Rect} from 'react-native-svg';
import {CoinIcons, CoinSymbol} from '../../constants/';
import {SvgAnimatedLinearGradient} from '../SvgAnimatedLinearGradient';
import style, {shadowStyle} from './style';

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
	isPlaceholder?: boolean;
}

export const TransactionItem: React.SFC<TransactionData> = (props) => {
	return (
		<View style={style.container} onLayout={props.containerLayout}>
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

export const TransactionItemShadow: React.SFC = () => {
	return (
		<View style={shadowStyle.container}>
			<View style={shadowStyle.leftContainer}>
				<View style={shadowStyle.coinIcon}>
					<SvgAnimatedLinearGradient height={'100%'} width={'100%'} duration={1200}>
						<Rect x={0} y={0} rx={4} ry={4} width={'100%'} height={'100%'} />
					</SvgAnimatedLinearGradient>
				</View>
				<View>
					<View style={shadowStyle.lineTextFirst}>
						<SvgAnimatedLinearGradient height={'100%'} width={'100%'} duration={1200}>
							<Rect x={0} y={0} rx={4} ry={4} width={'100%'} height={'100%'} />
						</SvgAnimatedLinearGradient>
					</View>
					<View style={shadowStyle.lineTextSecond}>
						<SvgAnimatedLinearGradient height={'100%'} width={'100%'} duration={1200}>
							<Rect x={0} y={0} rx={4} ry={4} width={'100%'} height={'100%'} />
						</SvgAnimatedLinearGradient>
					</View>
				</View>
			</View>
			<View style={shadowStyle.rightContainer}>
				<View style={shadowStyle.dateText}>
					<SvgAnimatedLinearGradient height={'100%'} width={'100%'} duration={1200}>
						<Rect x={0} y={0} rx={4} ry={4} width={'100%'} height={'100%'} />
					</SvgAnimatedLinearGradient>
				</View>
				<View style={shadowStyle.dateText}>
					<SvgAnimatedLinearGradient height={'100%'} width={'100%'} duration={1200}>
						<Rect x={0} y={0} rx={4} ry={4} width={'100%'} height={'100%'} />
					</SvgAnimatedLinearGradient>
				</View>
			</View>
		</View>
	);
};
