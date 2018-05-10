import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Colors} from 'theme';
import {TKeyboardKeys, TRKeyboardKeys} from '../TextInput';
import style from './style';

export interface IModalWalletProps {
	label: string;
	rightLabel: string;
	updateTextInput?: (text: string) => void;
	value: any;
	keyboardType?: TKeyboardKeys;
	disabled?: boolean;
}

export class WalletInputField extends Component<IModalWalletProps> {
	public static defaultProps: Partial<IModalWalletProps> = {
		label: undefined,
		disabled: false,
	};

	public render() {
		return (
			<View style={style.container}>
				<Text style={style.leftLabel}>{this.props.label}</Text>
				<View style={style.inputContainer}>{this.renderForDisabled()}</View>
				<Text style={style.rightLabel}>{this.props.rightLabel}</Text>
			</View>
		);
	}

	private renderForDisabled = () => {
		if (this.props.disabled) {
			return (
				<Text style={style.valueText} numberOfLines={1} ellipsizeMode={'middle'}>
					{this.props.value}
				</Text>
			);
		} else {
			return (
				<TextInput
					style={style.valueText}
					value={this.props.value}
					onChangeText={this.props.updateTextInput}
					keyboardType={this.props.keyboardType}
					returnKeyType={TRKeyboardKeys.done}
					blurOnSubmit={true}
					autoCorrect={false}
					underlineColorAndroid={Colors.transparent}
					autoCapitalize='none'
				/>
			);
		}
	}
}
