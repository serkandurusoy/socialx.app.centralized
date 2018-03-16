import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Sizes} from '../../theme/';
import style from './style';

export interface ISocialXAccountTitleCardProps {
	myCoins: string;
	myContribution: string;
	returnPercentage: string;
}

export const SocialXAccountTitleCard: React.SFC<ISocialXAccountTitleCardProps> = (props) => {
	const renderTrendIcon = () => {
		return <Icon name={'md-trending-up'} size={Sizes.smartHorizontalScale(23)} color={Colors.sushi} />;
	};

	return (
		<View style={style.container}>
			<Text style={style.myCoinsValue}>
				{'SOCX '}
				{props.myCoins}
			</Text>
			<View style={style.secondLine}>
				<View>
					<Text style={style.opacityGrayText}>{'Contribution'}</Text>
					<Text style={style.myContribution}>
						{'SOCX '}
						{props.myContribution}
					</Text>
				</View>
				<View style={style.spacer}>
					<View style={style.spacerLine} />
				</View>
				<View>
					<Text style={style.opacityGrayText}>{'Return'}</Text>
					<View style={style.secondLineRight}>
						{renderTrendIcon()}
						<Text style={style.returnPercentage}>
							{props.returnPercentage}
							{'%'}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};
