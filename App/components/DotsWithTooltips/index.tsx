import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import PopoverTooltip from 'react-native-popover-tooltip';
import {Icons} from '../../theme';
import style from './style';

export interface ITooltipDotsProps {
	reportHandler: () => {};
	deleteHandler: () => {};
	items: any;
}

export class TooltipDots extends Component<ITooltipDotsProps, any> {

	private getTooltipItems = () => {
		const ret: any = [];
		this.props.items.map((item: any, index: any) => {
			ret.push({
				label: () => {
					return (
						<View key={index} style={style.lineContainer}>
							<Image source={item.icon} style={style.icon} resizeMode={'contain'}/>
							<Text style={style.label}>{item.label}</Text>
						</View>
					);
				},
				onPress: () => item.actionHandler(),
			});
		});
		return ret;
	}

	public render() {
		return (
				<PopoverTooltip
					buttonComponent={
						<View style={style.container}>
							<Image source={Icons.iconDots} style={style.dots} resizeMode={'contain'}/>
						</View>
					}
					items={this.getTooltipItems()}
					animationType='spring'
					springConfig={{tension: 100, friction: 3}}
				/>
		);
	}
}