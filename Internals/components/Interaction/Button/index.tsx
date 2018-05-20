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

	get isDisabled(): boolean | undefined {
		return this.props.disabled || this.props.loading;
	}

	public render() {
		return (
			<TouchableOpacity disabled={this.isDisabled} onPress={this.props.onPress} style={this.getContainerWidth()}>
				<View style={this.getContainerStyles()}>
					<Text style={[style.text, style['text' + this.props.size]]}>{this.props.label}</Text>
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
	}

	protected getContainerStyles = () => {
		const ret: any[] = [style.container, {borderColor: this.props.borderColor}];

		if (this.props.containerStyle) {
			ret.push(this.props.containerStyle);
		} else {
			ret.push(style['container' + this.props.size]);
		}

		if (this.isDisabled) {
			ret.push(style.disabledButton);
		}
		return ret;
	}
}
