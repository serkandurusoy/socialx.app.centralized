import React from 'react';
import {StyleProp, Text, TouchableOpacity, ViewStyle} from 'react-native';

import style from './style';

export interface ISearchFilterButtonProps {
	selected: boolean;
	text: string;
	onPress: () => void;
	containerStyle?: StyleProp<ViewStyle>;
}

export const SearchFilterButton: React.SFC<ISearchFilterButtonProps> = (props) => {
	const textStyle = [style.text, ...(props.selected ? [style.textSelected] : [style.textUnselected])];

	const backgroundStyle = [props.containerStyle, ...(props.selected ? [style.backgroundSelected] : [style.background])];

	return (
		<TouchableOpacity style={backgroundStyle} onPress={props.onPress}>
			<Text style={textStyle}>{props.text}</Text>
		</TouchableOpacity>
	);
};

SearchFilterButton.defaultProps = {
	containerStyle: style.containerPadding,
};
