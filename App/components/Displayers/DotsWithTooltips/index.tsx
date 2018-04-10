import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Icons} from '../../../theme';
import PopoverTooltip from '../../_lib/PopoverTooltip';
import style from './style';

export interface TooltipItem {
	label: string;
	icon: number;
	actionHandler: () => void;
}

export interface ITooltipDotsProps {
	items: TooltipItem[];
}

export class TooltipDots extends Component<ITooltipDotsProps> {
	public render() {
		return (
			<PopoverTooltip
				buttonComponent={this.getToolTipDotsButton()}
				items={this.getTooltipItems()}
				labelSeparatorColor={Colors.dustWhite}
			/>
		);
	}

	private getToolTipDotsButton = () => {
		return (
			<View style={style.container}>
				<Image source={Icons.iconDots} style={style.dots} resizeMode={'contain'} />
			</View>
		);
	}

	private getTooltipItems = () => {
		const ret: any = [];
		this.props.items.map((item: TooltipItem, index: any) => {
			ret.push({
				label: () => {
					return (
						<View key={index} style={style.lineContainer}>
							<Image source={item.icon} style={style.icon} resizeMode={'contain'} />
							<Text style={style.label}>{item.label}</Text>
						</View>
					);
				},
				onPress: item.actionHandler,
			});
		});
		return ret;
	}
}
