import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import style from './style';

export interface IMessagingTabButtonProps {
	selected: boolean;
	text: string;
	onPress: () => void;
}

export const MessagingTabButton: React.SFC<IMessagingTabButtonProps> = (props) => {
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
