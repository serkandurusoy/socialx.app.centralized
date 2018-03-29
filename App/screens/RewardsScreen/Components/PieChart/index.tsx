import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {PieChart} from 'react-native-svg-charts';

import style from './style';

export interface PieChartComponentProps {
	data?: any;
	selectedPercent?: any;
}

export class PieChartComponent extends Component<PieChartComponentProps> {
	constructor(props: PieChartComponentProps) {
		super(props);
	}

	public render() {
		const data = this.props.data;
		return (
			<View style={style.container}>
				<Text style={style.percentageText}>
					{this.props.selectedPercent}
					{'%'}
				</Text>
				<PieChart data={data} innerRadius={'55%'} outerRadius={'85%'} spacing={0} style={{height: 200}} />
			</View>
		);
	}
}
