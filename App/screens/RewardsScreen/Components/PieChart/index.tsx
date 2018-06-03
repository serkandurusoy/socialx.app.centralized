import React from 'react';
import {Text, View} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {Colors} from 'theme/';
import {ChartListDataItem, PieChartSections} from '../../index';
import style from './style';

export interface SvgChartData {
	value: number;
	key: number;
	svg: {
		fill: string;
	};
}

export interface IPieChartComponentProps {
	data: ChartListDataItem[];
	selectedSection: PieChartSections;
}

const getSelectedPercent = (props: IPieChartComponentProps): string | undefined => {
	// TODO: @serkan @jake what???
	for (const dataItem of props.data) {
		if (props.selectedSection === dataItem.badge) {
			return dataItem.percentValue + '%';
		}
	}
};

const getFormattedPieChartData = (props: IPieChartComponentProps): SvgChartData[] =>
	props.data.map((dataItem, index) => ({
		value: dataItem.percentValue,
		key: index,
		svg: {
			fill: props.selectedSection === dataItem.badge ? Colors.pink : Colors.geyser,
		},
	}));

export const PieChartComponent: React.SFC<IPieChartComponentProps> = (props) => (
	<View style={style.container}>
		<PieChart data={getFormattedPieChartData(props)} innerRadius={'55%'} outerRadius={'85%'} style={style.chart} />
		<Text style={style.percentageText}>{getSelectedPercent(props)}</Text>
	</View>
);
