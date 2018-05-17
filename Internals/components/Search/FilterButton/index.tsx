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
	const getTextStyle = () => {
		const ret = [style.text];
		if (props.selected) {
			ret.push(style.textSelected);
		} else {
			ret.push(style.textUnselected);
		}
		return ret;
	};

	const getBackgroundStyle = () => {
		const ret = [props.containerStyle];
		if (props.selected) {
			ret.push(style.backgroundSelected);
		} else {
			ret.push(style.background);
		}
		return ret;
	};

	return (
		<TouchableOpacity style={getBackgroundStyle()} onPress={props.onPress}>
			<Text style={getTextStyle()}>{props.text}</Text>
		</TouchableOpacity>
	);
};

SearchFilterButton.defaultProps = {
	containerStyle: style.containerPadding,
};
