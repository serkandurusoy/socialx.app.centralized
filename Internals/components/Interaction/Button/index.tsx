import React from 'react';
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

export const SXButton: React.SFC<ISXButtonProps> = ({
	borderColor,
	size,
	containerStyle,
	label,
	loading,
	onPress,
	disabled,
	width,
	autoWidth,
	textColor,
}) => {
	const buttonDisabled = disabled || loading;

	const containerStyles = [
		style.container,
		{borderColor},
		containerStyle ? containerStyle : {},
		style['container' + size],
		buttonDisabled ? style.disabledButton : {},
	];

	let containerWidth: StyleProp<ViewStyle> = {width: '100%'};
	if (width) {
		containerWidth = {width};
	} else if (autoWidth) {
		containerWidth = {};
	}

	const textStyles = [style.text, {color: textColor ? textColor : Colors.white}, size ? style['text' + size] : {}];

	return (
		<TouchableOpacity disabled={buttonDisabled} onPress={onPress} style={containerWidth}>
			<View style={containerStyles}>
				<Text style={textStyles}>{label}</Text>
				{loading && <ActivityIndicator size={'small'} color={Colors.white} style={style.loadingIndicator} />}
			</View>
		</TouchableOpacity>
	);
};

SXButton.defaultProps = {
	width: 0,
	disabled: false,
	size: ButtonSizes.Normal,
	autoWidth: false,
	borderColor: Colors.white,
	loading: false,
};
