import React, {Component} from 'react';
import {Keyboard, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../theme/';
import style, {ICON_HEIGHT} from './style';

export enum TKeyboardKeys {
	default = 'default',
	numeric = 'numeric',
	emailAddress = 'email-address',
}

export enum TRKeyboardKeys {
	done = 'done',
	next = 'next',
	search = 'search',
	send = 'send',
	go = 'go',
}

export interface ISXTextInputProps {
	width?: number;
	icon?: string;
	iconColor?: string;
	placeholder?: string;
	disabled?: boolean;
	isPassword?: boolean;
	keyboardType?: TKeyboardKeys;
	returnKeyType?: TRKeyboardKeys;
	cancelButtonTextColor?: string;
	canCancel?: boolean;
	onSubmitPressed?: () => void;
	onChangeText?: (value: string) => void;
	hasFocus?: boolean;
	value: string;
	blurOnSubmit?: boolean;
}

export interface ISXTextInputState {
	hasFocus: boolean;
}

export class SXTextInput extends Component<ISXTextInputProps, ISXTextInputState> {
	public static defaultProps: Partial<ISXTextInputProps> = {
		width: 0,
		icon: '',
		iconColor: Colors.darkGray,
		placeholder: '',
		disabled: false,
		isPassword: false,
		keyboardType: TKeyboardKeys.default,
		returnKeyType: TRKeyboardKeys.done,
		cancelButtonTextColor: Colors.white,
		canCancel: false,
		hasFocus: false,
		blurOnSubmit: false,
	};

	private inputComponent?: TextInput;

	constructor(props: ISXTextInputProps) {
		super(props);

		this.state = {
			hasFocus: false,
		};
	}

	public getContainerStyles = () => {
		const ret: any = [style.container];
		if (this.props.width) {
			ret.push({width: this.props.width});
		}
		if (this.props.disabled) {
			ret.push(style.disabledInput);
		}
		return ret;
	}

	public renderInputIcon = () => {
		const IconComp = Icon as any;
		if (this.props.icon) {
			return <IconComp name={this.props.icon} size={ICON_HEIGHT} color={this.props.iconColor} style={style.icon} />;
		}
		return null;
	}

	public renderCancelButton = () => {
		if (this.state.hasFocus && this.props.canCancel) {
			return (
				<TouchableOpacity style={style.cancelButton} onPress={() => Keyboard.dismiss()}>
					<Text style={[style.cancelButtonText, {color: this.props.cancelButtonTextColor}]}>Cancel</Text>
				</TouchableOpacity>
			);
		}
		return null;
	}

	public updateFocusHandler = (value: boolean) => {
		this.setState({
			hasFocus: value,
		});
	}

	public focusInput = () => {
		if (this.inputComponent) {
			this.inputComponent.focus();
		}
	}

	public render() {
		return (
			<View style={this.getContainerStyles()}>
				<View style={style.inputContainer}>
					{this.renderInputIcon()}
					<TextInput
						onChangeText={this.props.onChangeText}
						onSubmitEditing={this.props.onSubmitPressed}
						ref={(component) => (this.inputComponent = component)}
						onFocus={() => this.updateFocusHandler(true)}
						onBlur={() => this.updateFocusHandler(false)}
						returnKeyType={this.props.returnKeyType}
						editable={!this.props.disabled}
						secureTextEntry={this.props.isPassword}
						keyboardType={this.props.keyboardType}
						style={style.textInput}
						placeholder={this.props.placeholder}
						autoCorrect={false}
						allowFontScaling={false}
						underlineColorAndroid={Colors.transparent}
						autoCapitalize='none'
						clearButtonMode='while-editing' // only works on iOS
						blurOnSubmit={this.props.blurOnSubmit}
					/>
				</View>
				{this.renderCancelButton()}
			</View>
		);
	}
}
