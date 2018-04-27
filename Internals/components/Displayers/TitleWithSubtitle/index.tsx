import React from 'react';
import {Text, View} from 'react-native';

import style from './style';

export interface ITitleSubtitleProps {
	title: string;
	subtitle: string;
}

export const TitleWithSubtitle: React.SFC<ITitleSubtitleProps> = (props) => {
	return (
		<View style={style.container}>
			<Text style={style.title}>{props.title}</Text>
			<Text style={style.subtitle}>{props.subtitle}</Text>
		</View>
	);
};
