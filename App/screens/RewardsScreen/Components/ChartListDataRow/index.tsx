import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors, colorWithAlpha} from '../../../../theme';
import style from './style';

export interface IChartListDataRowProps {
	badge: string;
	title: string;
	percentValue: number;
	isSelected: boolean;
	selectHandler?: () => void;
	hasBorder: boolean;
}

export const ChartListDataRow: React.SFC<IChartListDataRowProps> = (props) => {
	const badgeTextColor = props.isSelected ? Colors.pink : Colors.postFullName;
	const badgeBackgroundColor = props.isSelected
		? colorWithAlpha(Colors.pink, 0.1)
		: colorWithAlpha(Colors.postFullName, 0.1);
	const containerStyles = [style.container, props.hasBorder ? style.containerWithBorder : {}];

	return (
		<View style={containerStyles}>
			<TouchableOpacity
				style={[style.badgeTextContainer, {backgroundColor: badgeBackgroundColor}]}
				onPress={props.selectHandler}
			>
				<Text style={[style.badgeText, {color: badgeTextColor}]}>{props.badge}</Text>
			</TouchableOpacity>
			<Text style={style.title}>{props.title}</Text>
			<Text style={style.percentValue}>{props.percentValue + '%'}</Text>
		</View>
	);
};
