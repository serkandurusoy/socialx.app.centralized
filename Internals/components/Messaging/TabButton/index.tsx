import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import style from './style';

export interface IMessagingTabButtonProps {
	selected: boolean;
	text: string;
	onPress: () => void;
}

// todo @serkan @jake functions in functions!!! (look at the history of the file before this commit)
// we can even inline these styles for immediate evaluation and thus immediate return of the component!
export const MessagingTabButton: React.SFC<IMessagingTabButtonProps> = (props) => {
	const textStyle = [style.text, ...(props.selected ? [style.textSelected] : [style.textUnselected])];

	const backgroundStyle = props.selected ? style.backgroundSelected : style.background;

	return (
		<TouchableOpacity style={backgroundStyle} onPress={props.onPress}>
			<Text style={textStyle}>{props.text}</Text>
		</TouchableOpacity>
	);
};
