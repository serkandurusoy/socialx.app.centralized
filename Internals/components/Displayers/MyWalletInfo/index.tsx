import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Sizes} from 'theme';
import {ButtonSizes, SXButton} from '../../Interaction';
import style from './style';

export enum TrendOptions {
	UP = 'up',
	DOWN = 'down',
}

export interface IMyWalletInfoProps {
	myCoins: string;
	trendPercentage: string;
	trendArrow: TrendOptions;
	onViewAccount: () => void;
}

export const MyWalletInfo: React.SFC<IMyWalletInfoProps> = (props) => {
	const renderTrendIcon = () => {
		let iconName = 'md-trending-up';
		if (props.trendArrow === TrendOptions.DOWN) {
			iconName = 'md-trending-down';
		}
		return <Icon name={iconName} size={Sizes.smartHorizontalScale(25)} color={Colors.sushi} />;
	};

	return (
		<View style={style.container}>
			<Text style={style.myCoinsValue}>
				{'SOCX '}
				{props.myCoins}
			</Text>
			<View style={style.secondLine}>
				<View style={style.secondLineLeft}>
					{renderTrendIcon()}
					<Text style={style.trendPercentage}>
						{props.trendPercentage}
						{'%'}
					</Text>
				</View>
				<SXButton
					autoWidth={true}
					label={'View Account'}
					size={ButtonSizes.Small}
					onPress={props.onViewAccount}
					borderColor={Colors.transparent}
				/>
			</View>
		</View>
	);
};

MyWalletInfo.defaultProps = {};
