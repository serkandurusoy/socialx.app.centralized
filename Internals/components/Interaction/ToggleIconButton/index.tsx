import React from 'react';
import {Image, ImageStyle, StyleProp, TouchableWithoutFeedback} from 'react-native';

import style from './style';

export interface IToggleIconButtonProps {
	selectedSource: number;
	unselectedSource: number;
	selected: boolean;
	onPress?: Func;
	iconStyle?: StyleProp<ImageStyle>;
}

export const ToggleIconButton: React.SFC<IToggleIconButtonProps> = ({
	onPress,
	selected,
	selectedSource,
	unselectedSource,
	iconStyle,
}) => (
	<TouchableWithoutFeedback onPress={onPress}>
		<Image source={selected ? selectedSource : unselectedSource} style={iconStyle} resizeMode={'contain'} />
	</TouchableWithoutFeedback>
);

ToggleIconButton.defaultProps = {
	iconStyle: style.iconStyle,
};
