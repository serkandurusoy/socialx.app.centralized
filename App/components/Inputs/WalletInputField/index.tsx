import React, {Component} from 'react';
import {Colors} from '../../../theme';
import {InputSizes, SXTextInput, TKeyboardKeys, TRKeyboardKeys} from '../TextInput';

import {Text, TouchableOpacity, View} from 'react-native';
import style from './style';

export interface IModalWalletProps {
	label: string;
	rightLabel: string;
	updateTextInput: (text: string) => void;
	value: any;
	keyboardType?: TKeyboardKeys;
}

export class WalletInputField extends Component<IModalWalletProps> {
	public static defaultProps: Partial<IModalWalletProps> = {
		label: undefined,
	};

	public render() {
		return (
			<View style={style.container}>
				<View style={style.labelContainer}>
					<Text style={style.leftLabel}>{this.props.label}</Text>
				</View>
				<View style={style.inputContainer}>
					<SXTextInput
						value={this.props.value}
						numberOfLines={1}
						keyboardType={this.props.keyboardType}
						borderColor={Colors.transparent}
						onChangeText={this.props.updateTextInput}
						returnKeyType={TRKeyboardKeys.done}
						blurOnSubmit={true}
						size={InputSizes.Large}
					/>
				</View>
				<View style={style.rightContainer}>
					<Text style={style.rightLabel}>{this.props.rightLabel}</Text>
				</View>
			</View>
		);
	}
}
