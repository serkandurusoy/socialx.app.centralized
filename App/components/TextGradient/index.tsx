import React from 'react';
import {Text, View} from 'react-native';
import {LinearTextGradient} from 'react-native-text-gradient';
// TODO: remember to upgrade this lib when upgrading to React native 0.54!

export interface ITextGradientProps {
	text: string;
	style: any;
	colors: string[];
}

export const TextGradient: React.SFC<ITextGradientProps> = (props) => {
	return (
		<LinearTextGradient
			style={props.style}
			locations={[0, 1]}
			colors={props.colors}
			start={{x: 0, y: 0}}
			end={{x: 1, y: 0}}
		>
			{props.text}
		</LinearTextGradient>
	);
};
