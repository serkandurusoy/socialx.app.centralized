import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';

import style from './style';

export interface ISearchFilterButtonProps {
	selected: string;
	text: string;
	onPress: () => void;
}

export const MessagingTabButtons: React.SFC<ISearchFilterButtonProps> = (props) => {
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
		let ret = style.background;
		if (props.selected) {
			ret = style.backgroundSelected;
		}
		return ret;
	};

	return (
		<TouchableOpacity style={getBackgroundStyle()} onPress={props.onPress}>
			<Text style={getTextStyle()}>{props.text}</Text>
		</TouchableOpacity>
	);
};
