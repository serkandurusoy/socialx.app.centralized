import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Icons} from 'theme';
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
	};

	// todo @serkan @jake hmm component calling function calling function calling iterator function calling component...
	private getTooltipItems = () =>
		this.props.items.map((item: TooltipItem, index: any) => ({
			label: () => (
				<View key={index} style={style.lineContainer}>
					<Image source={item.icon} style={style.icon} resizeMode={'contain'} />
					<Text style={style.label}>{item.label}</Text>
				</View>
			),
			onPress: item.actionHandler,
		}));
}
