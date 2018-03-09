import React from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';
import style from './style';

export interface IToggleIconButtonProps {
	selectedSource: number;
	unselectedSource: number;
	selected: boolean;
	onPress?: Func;
	iconStyle?: number;
}

export const ToggleIconButton: React.SFC<IToggleIconButtonProps> = (props) => {
	const getIconSource = () => {
		return props.selected ? props.selectedSource : props.unselectedSource;
	};

	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<Image source={getIconSource()} style={props.iconStyle} resizeMode={'contain'} />
		</TouchableWithoutFeedback>
	);
};

ToggleIconButton.defaultProps = {
	iconStyle: style.iconStyle,
};
