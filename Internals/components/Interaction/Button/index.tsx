import React, {Component} from 'react';
import {ActivityIndicator, StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

import {Colors} from 'theme';
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
	textColor?: string;
	loading?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
}

export class SXButton extends Component<ISXButtonProps, any> {
	public static defaultProps: Partial<ISXButtonProps> = {
		width: 0,
		disabled: false,
		size: ButtonSizes.Normal,
		autoWidth: false,
		borderColor: Colors.white,
		loading: false,
	};

	// todo @serkan @jake why?????? get belongs to instance, props change within the lifecycle in render functions,
	// don't apply "class" principles to react classes
	get isDisabled(): boolean | undefined {
		return this.props.disabled || this.props.loading;
	}

	public render() {
		return (
			<TouchableOpacity disabled={this.isDisabled} onPress={this.props.onPress} style={this.getContainerWidth()}>
				<View style={this.getContainerStyles()}>
					<Text style={this.getTextStyles()}>{this.props.label}</Text>
					{this.props.loading && (
						<ActivityIndicator size={'small'} color={Colors.white} style={style.loadingIndicator} />
					)}
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

	protected getContainerStyles = () => [
		style.container,
		{borderColor: this.props.borderColor},
		...(this.props.containerStyle ? [this.props.containerStyle] : [style['container' + this.props.size]]),
		...(this.isDisabled ? [style.disabledButton] : []),
	];

	protected getTextStyles = () => [
		style.text,
		{color: this.props.textColor ? this.props.textColor : Colors.white},
		this.props.size ? style['text' + this.props.size] : null,
	];
}
