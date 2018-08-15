import React, {Component} from 'react';
import {Image, StyleProp, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import style from './style';

export interface IIconButtonProps {
	label?: string;
	iconSource: number | string; // use string for an Ionicon or FontAwesome source
	iconType: string; // use "io" or "fa"
	onPress?: () => void;
	iconStyle?: StyleProp<any>;
}

interface IIconButtonState {
	iconSource: number | string;
	iconStyle?: StyleProp<any>;
}

export class IconButton extends Component<IIconButtonProps, IIconButtonState> {
	public static defaultProps: Partial<IIconButtonProps> = {
		label: undefined,
		iconStyle: style.iconStyle,
	};

	public state = {
		iconSource: this.props.iconSource,
		iconStyle: this.props.iconStyle,
	};

	public render() {
		return (
			<TouchableOpacity style={style.container} disabled={!this.props.onPress} onPress={this.buttonPressedHandler}>
				{this.renderIcon(this.props.iconType)}
				{this.props.label && <Text style={style.label}>{this.props.label}</Text>}
			</TouchableOpacity>
		);
	}

	private renderIcon = (type: string) => {
		if (type === 'image') {
			return <Image source={this.state.iconSource as number} style={this.state.iconStyle} resizeMode={'contain'} />;
		} else if (type === 'io') {
			return <Ionicon name={this.state.iconSource as string} style={this.state.iconStyle} />;
		} else if (type === 'fa') {
			return <FontAwesome name={this.state.iconSource as string} style={this.state.iconStyle} />;
		}
	};

	private buttonPressedHandler = async () => {
		if (this.props.onPress) {
			this.props.onPress();
		}
	};
}
