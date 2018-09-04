// MIGRATION: migrated to components/interaction

import React from 'react';
import {Image, ImageRequireSource, StyleProp, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import style from './style';

interface IIconButtonProps {
	label?: string;
	iconSource: ImageRequireSource | string; // use string for an Ionicon or FontAwesome source
	iconType: string; // use "io" or "fa"
	onPress?: () => void;
	iconStyle?: StyleProp<any>;
}

export const IconButton: React.SFC<IIconButtonProps> = ({iconStyle, label, iconSource, onPress, iconType}) => (
	<TouchableOpacity style={style.container} disabled={!onPress} onPress={onPress}>
		{iconType === 'image' && (
			<Image source={iconSource as ImageRequireSource} style={iconStyle} resizeMode={'contain'} />
		)}
		{iconType === 'io' && <Ionicon name={iconSource as string} style={iconStyle} />}
		{iconType === 'fa' && <FontAwesome name={iconSource as string} style={iconStyle} />}
		{label && <Text style={style.label}>{label}</Text>}
	</TouchableOpacity>
);

IconButton.defaultProps = {
	label: undefined,
	iconStyle: style.iconStyle,
};
