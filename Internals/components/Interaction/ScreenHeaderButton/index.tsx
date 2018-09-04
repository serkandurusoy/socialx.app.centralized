// MIGRATION: migrated to components/navigation

import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Sizes} from 'theme';
import style from './style';

interface IScreenHeaderButtonProps {
	onPress: () => void;
	iconName?: string;
	iconSource?: number;
	iconColor?: string;
	iconSize?: number;
}

export const ScreenHeaderButton: React.SFC<IScreenHeaderButtonProps> = ({
	onPress,
	iconName,
	iconSource,
	iconColor,
	iconSize,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={style.iconContainer}>
			{iconName ? <Icon name={iconName} size={iconSize} color={iconColor} /> : null}
			{iconSource ? <Image source={iconSource} style={style.headerButtonIcon} resizeMode={'contain'} /> : null}
		</TouchableOpacity>
	);
};

ScreenHeaderButton.defaultProps = {
	iconColor: Colors.white,
	iconSize: Sizes.smartHorizontalScale(25),
};
