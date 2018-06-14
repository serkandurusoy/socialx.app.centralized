import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors} from 'theme';
import PopoverTooltip from '../../_lib/PopoverTooltip';
import style from './style';

export interface TooltipItem {
	label: string;
	icon: number | string;
	actionHandler: () => void;
}

export interface ITooltipDotsProps {
	items: TooltipItem[];
	dotsColor?: string;
}

export class TooltipDots extends Component<ITooltipDotsProps> {
	private static defaultProps: Partial<ITooltipDotsProps> = {
		dotsColor: Colors.postFullName,
	};

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
				<Icon name={'ios-more'} color={this.props.dotsColor} style={style.dotsIcon} />
			</View>
		);
	};

	// todo @serkan @jake hmm component calling function calling function calling iterator function calling component...
	private getTooltipItems = () =>
		this.props.items.map((item: TooltipItem, index: any) => ({
			label: () => (
				<View key={index} style={style.lineContainer}>
					{typeof item.icon === 'number' && <Image source={item.icon} style={style.icon} resizeMode={'contain'} />}
					{typeof item.icon === 'string' && (
						<Icon name={item.icon} color={Colors.postFullName} style={[style.icon, style.fontIcon]} />
					)}
					<Text style={style.label}>{item.label}</Text>
				</View>
			),
			onPress: item.actionHandler,
		}));
}
