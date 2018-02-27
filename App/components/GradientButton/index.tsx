import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {SXButton} from '../Button';
import style from '../Button/style';

export class SXGradientButton extends SXButton {
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
}
