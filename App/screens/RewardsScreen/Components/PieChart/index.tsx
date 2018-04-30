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

export const PieChartComponent: React.SFC<IPieChartComponentProps> = (props) => {
	const getSelectedPercent = (): string | undefined => {
		for (const dataItem of props.data) {
			if (props.selectedSection === dataItem.badge) {
				return dataItem.percentValue + '%';
			}
		}
	};

	const getFormattedPieChartData = (): SvgChartData[] => {
		const ret: SvgChartData[] = [];
		props.data.forEach((dataItem, index) => {
			const sectionFillColor = props.selectedSection === dataItem.badge ? Colors.pink : Colors.geyser;
			ret.push({
				value: dataItem.percentValue,
				key: index,
				svg: {
					fill: sectionFillColor,
				},
			});
		});
		return ret;
	};

	return (
		<View style={style.container}>
			<PieChart data={getFormattedPieChartData()} innerRadius={'55%'} outerRadius={'85%'} style={style.chart} />
			<Text style={style.percentageText}>{getSelectedPercent()}</Text>
		</View>
	);
};
