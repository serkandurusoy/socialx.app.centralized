import React from 'react';
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

interface ITooltipDotsProps {
	items?: TooltipItem[];
	iconColor?: string;
	iconName?: string;
	getItems?: () => any;
}

const ToolTipDotsButton: React.SFC<{iconColor: string; iconName: string}> = ({iconColor, iconName}) => (
	<View style={style.container}>
		<Icon name={iconName} color={iconColor} style={style.dotsIcon} />
	</View>
);

const ToolTipLabel: React.SFC<{item: TooltipItem; index: number}> = ({item, index}) => (
	<View key={index} style={style.lineContainer}>
		{typeof item.icon === 'number' && <Image source={item.icon} style={style.icon} resizeMode={'contain'} />}
		{typeof item.icon === 'string' && (
			<Icon name={item.icon} color={Colors.postFullName} style={[style.icon, style.fontIcon]} />
		)}
		<Text style={style.label}>{item.label}</Text>
	</View>
);

const getTooltipItems = (items: TooltipItem[]) =>
	items.map((item: TooltipItem, index: number) => ({
		label: () => <ToolTipLabel index={index} item={item} />,
		onPress: item.actionHandler,
	}));

export const TooltipDots: React.SFC<ITooltipDotsProps> = ({iconColor, items, getItems, iconName}) => (
	<PopoverTooltip
		buttonComponent={<ToolTipDotsButton iconColor={iconColor} iconName={iconName} />}
		items={getItems ? getItems() : getTooltipItems(items)}
		labelSeparatorColor={Colors.dustWhite}
		tooltipContainerStyle={style.tooltipContainer}
	/>
);

TooltipDots.defaultProps = {
	iconColor: Colors.postFullName,
	iconName: 'ios-more',
};
