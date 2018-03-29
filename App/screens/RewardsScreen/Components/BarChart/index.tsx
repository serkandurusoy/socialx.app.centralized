import * as scale from 'd3-scale';
import React, {Component} from 'react';
import {View} from 'react-native';
import {BarChart, XAxis} from 'react-native-svg-charts';
import style from './style';

export interface BarChartComponentProps {
	data: any;
	xAxisValue?: any;
}

export class BarChartComponent extends Component<BarChartComponentProps> {
	constructor(props: BarChartComponentProps) {
		super(props);
	}

	public render() {
		const data = [this.props.data];
		return (
			<View style={style.container}>
				<BarChart
					style={{flex: 1}}
					data={data}
					xAccesor={({item}) => item.value}
					showGrid={false}
					spacingInner={0.5}
					svg={{fill: 'rgb(134, 65, 244)'}}
				/>
				<XAxis
					style={{marginTop: 10}}
					data={data}
					scale={scale.scaleBand}
					formatLabel={(_, index) => data[index].label}
					// formatLabel={(value, index) => index + 1 + 'th'}
					labelStyle={style.labelStyle}
				/>
			</View>
		);
	}
}
