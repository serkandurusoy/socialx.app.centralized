import React, {Component} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';

import style from './style';

export interface IIconButtonProps {
	label: string;
	iconSource: number;
	onPress?: Func;
}

export class ButtonIconWithName extends Component<IIconButtonProps> {
	public static defaultProps: Partial<IIconButtonProps> = {
		label: undefined,
	};

	public render() {
		return (
			<TouchableOpacity style={style.container} disabled={!this.props.onPress} onPress={this.props.onPress}>
				<Image source={this.props.iconSource} resizeMode={'contain'} />
				{this.props.label && <Text style={style.label}>{this.props.label}</Text>}
			</TouchableOpacity>
		);
	}
}
