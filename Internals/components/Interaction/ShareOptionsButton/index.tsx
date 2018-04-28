import React, {Component} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';

import style from './style';

export interface IShareOptionsButtonProps {
	label: string;
	iconSource: number;
	onPress: Func;
}

export class ShareOptionsButton extends Component<IShareOptionsButtonProps> {
	public render() {
		return (
			<TouchableOpacity style={style.container} onPress={this.props.onPress}>
				<Image source={this.props.iconSource} resizeMode={'contain'} style={style.iconStyle} />
				<Text style={style.label}>{this.props.label}</Text>
			</TouchableOpacity>
		);
	}
}
