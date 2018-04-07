import * as shape from 'd3-shape';
import numeral from 'numeral';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {LineChart} from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/Ionicons';
import {CoinFullName, CoinIcons, CoinSymbol} from '../../../constants';
import {Colors, Sizes} from '../../../theme';
import style from './style';

export interface AccountCurrencyData {
	coinSymbol: CoinSymbol;
	coinAmount: number;
	usdValue: number;
	trendPercentage: number;
	graphData?: any[];
}

export const SocialXAccountCurrencyItem: React.SFC<AccountCurrencyData> = (props) => {
	const usdValueWithFormat = numeral(props.usdValue).format('($0.00a)');
	const coinAmountWithFormat = numeral(props.coinAmount).format('0.00a');
	const trendIconColor = props.trendPercentage < 0 ? Colors.ceriseRed : Colors.sushi;
	const trendIconValue = props.trendPercentage < 0 ? 'md-arrow-down' : 'md-arrow-up';
	const trendPercentageStyles = [style.trendPercentage];
	if (props.trendPercentage < 0) {
		trendPercentageStyles.push(style.trendGoingDown);
	}
	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<Image source={CoinIcons[props.coinSymbol]} style={style.coinIcon} resizeMode={'contain'} />
				<View>
					<Text style={style.coinFullName}>{CoinFullName[props.coinSymbol]}</Text>
					<Text style={style.coinAmount}>{coinAmountWithFormat + ' ' + props.coinSymbol}</Text>
				</View>
			</View>
			<View style={style.centerContainer}>
				<Text style={style.usdValue}>{usdValueWithFormat}</Text>
				<View style={style.trendContainer}>
					<Icon name={trendIconValue} size={Sizes.smartHorizontalScale(15)} color={trendIconColor} />
					<Text style={trendPercentageStyles}>
						{Math.abs(props.trendPercentage)}
						{'%'}
					</Text>
				</View>
			</View>
			<LineChart
				style={style.lineChart}
				data={props.graphData}
				svg={{stroke: trendIconColor}}
				animate={true}
				showGrid={false}
				curve={shape.curveNatural}
				animationDuration={300}
			/>
		</View>
	);
};

SocialXAccountCurrencyItem.defaultProps = {};
