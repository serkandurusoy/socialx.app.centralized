import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {Colors} from '../../../../theme';
import style from './style';

export interface UnderPieLineComponentProps {
	left: string;
	center: string;
	right: number;
	index: number;
	selectedFieldColorIndex: number;
}

const LINE_SELECTED_FILL = Colors.diminishedRed;
const LINE_FILL = Colors.postFullName;

export class UnderPieLineComponent extends Component<UnderPieLineComponentProps> {
	private getColor = () => {
		if (this.props.selectedFieldColorIndex === this.props.index) {
			return LINE_SELECTED_FILL;
		}
		return LINE_FILL;
	};

	constructor(props: UnderPieLineComponentProps) {
		super(props);
	}

	public render() {
		return (
			<View style={style.container}>
				<View style={style.leftTextContainer}>
					<Text style={[style.leftText, {color: this.getColor()}]}>{this.props.left}</Text>
				</View>
				<Text style={style.centerText}>{this.props.center}</Text>
				<Text style={style.rightText}>
					{this.props.right}
					{'%'}
				</Text>
			</View>
		);
	}
}
