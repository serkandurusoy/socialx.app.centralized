import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';

import style from './style';

interface IShareOptionsButtonProps {
	label: string;
	iconSource: number;
	onPress: () => void;
}

export const ShareOptionsButton: React.SFC<IShareOptionsButtonProps> = ({label, iconSource, onPress}) => (
	<TouchableOpacity style={style.container} onPress={onPress}>
		<Image source={iconSource} resizeMode={'contain'} style={style.iconStyle} />
		<Text style={style.label}>{label}</Text>
	</TouchableOpacity>
);
