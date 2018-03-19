import numeral from 'numeral';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Icons, Sizes} from '../../theme/';
import style from './style';

export interface ISendCoinsHeaderProps {
	myCoins: number;
	onDropDownPress?: () => void;
}

export const SendCoinsHeader: React.SFC<ISendCoinsHeaderProps> = (props) => {
	const myCoinsWithFormat = numeral(props.myCoins).format('0.00a');
	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<Image source={Icons.socxCoinIcon} style={style.coinIcon} resizeMode={'contain'}/>
				<View>
					<Text style={style.coinTitle}>{'SOCX'}</Text>
					<Text style={style.coinDetails}>
						{myCoinsWithFormat}
						{' SOCX in wallet'}
					</Text>
				</View>
			</View>
			<TouchableOpacity style={style.dropDownArrow} onPress={props.onDropDownPress}>
				<Icon name={'md-arrow-round-down'} size={Sizes.smartHorizontalScale(30)} color={Colors.pink}/>
			</TouchableOpacity>
		</View>
	);
};

SendCoinsHeader.defaultProps = {};
