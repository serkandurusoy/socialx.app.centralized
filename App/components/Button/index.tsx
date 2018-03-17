import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Colors} from '../../theme/';
import style from './style';

export enum ButtonSizes {
	// here the values and keys should be the same!
	Normal = 'Normal',
	Small = 'Small',
	Large = 'Large',
}

export interface ISXButtonProps {
	label: string;
	width?: number;
	disabled?: boolean;
	onPress?: () => void;
	size?: ButtonSizes;
	autoWidth?: boolean;
	borderColor?: string;
}

export class SXButton extends Component<ISXButtonProps, any> {
	public static defaultProps: Partial<ISXButtonProps> = {
		width: 0,
		disabled: false,
		size: ButtonSizes.Normal,
		autoWidth: false,
		borderColor: Colors.white,
	};

	public render() {
		return (
			<TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPress} style={this.getContainerWidth()}>
				<View style={this.getContainerStyles()}>
					<Text style={[style.text, style['text' + this.props.size]]}>{this.props.label}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	protected getContainerWidth = () => {
		let ret: any = {width: '100%'};
		if (this.props.width) {
			ret = {width: this.props.width};
		} else if (this.props.autoWidth) {
			ret = {};
		}
		return ret;
	};

	protected getContainerStyles = () => {
		const ret: any[] = [style.container, {borderColor: this.props.borderColor}, style['container' + this.props.size]];

		if (this.props.disabled) {
			ret.push(style.disabledButton);
		}
		return ret;
	};
}
