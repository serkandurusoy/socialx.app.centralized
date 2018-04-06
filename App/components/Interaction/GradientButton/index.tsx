import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Colors} from '../../../theme';
import {ButtonSizes, ISXButtonProps, SXButton} from '../Button';
import style from '../Button/style';

export interface ISXButtonGProps extends ISXButtonProps {
	colorStart: string;
	colorEnd: string;
}

export class SXGradientButton extends Component<ISXButtonGProps> {
	public static defaultProps: Partial<ISXButtonGProps> = {
		width: 0,
		disabled: false,
		size: ButtonSizes.Normal,
		autoWidth: false,
		borderColor: Colors.white,
	};

	public render() {
		return (
			<TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPress} style={this.getContainerWidth()}>
				<LinearGradient
					start={{x: 0, y: 0.5}}
					end={{x: 1, y: 0.5}}
					colors={[this.props.colorStart, this.props.colorEnd]}
					style={this.getContainerStyles()}
				>
					<Text style={[style.text, style['text' + this.props.size]]}>{this.props.label}</Text>
				</LinearGradient>
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

	protected getContainerStyles = (): any => {
		const ret: any[] = [style.container, {borderColor: this.props.borderColor}, style['container' + this.props.size]];

		if (this.props.disabled) {
			ret.push(style.disabledButton);
		}
		return ret;
	}
}
