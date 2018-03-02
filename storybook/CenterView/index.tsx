import React from 'react';
import {View} from 'react-native';

import style from './style';

export interface ICenterViewProps {
	children?: object;
	style?: object;
}

export default function CenterView(props: ICenterViewProps) {
	return <View style={[style.main, props.style]}>{props.children}</View>;
}
