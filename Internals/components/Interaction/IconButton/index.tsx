import React, {Component} from 'react';
import {Image, StyleProp, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import style from './style';

export interface IIconButtonProps {
	label?: string;
	iconSource: number | string; // use string for an Ionicon source
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
				{this.renderIcon()}
				{this.props.label && <Text style={style.label}>{this.props.label}</Text>}
			</TouchableOpacity>
		);
	}

	private renderIcon = () => {
		if (typeof this.props.iconSource === 'number') {
			return <Image source={this.state.iconSource as number} style={this.state.iconStyle} resizeMode={'contain'} />;
		} else {
			return <Icon name={this.state.iconSource as string} style={this.state.iconStyle} />;
		}
	};

	private buttonPressedHandler = async () => {
		if (this.props.onPress) {
			this.props.onPress();
		}
	};
}
