import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from 'theme';
import style from './style';

export interface IScreenHeaderButtonProps {
	onPress: () => void;
	iconName?: string;
	iconSource?: number;
	iconColor?: string;
}

export const ScreenHeaderButton: React.SFC<IScreenHeaderButtonProps> = (props) => {
	return (
		<TouchableOpacity onPress={props.onPress} style={style.iconContainer}>
			{props.iconName ? (
				<Icon name={props.iconName} size={Sizes.smartHorizontalScale(25)} color={props.iconColor} />
			) : null}
			{props.iconSource ? (
				<Image source={props.iconSource} style={style.headerButtonIcon} resizeMode={'contain'} />
			) : null}
		</TouchableOpacity>
	);
};

ScreenHeaderButton.defaultProps = {
	iconColor: Colors.white,
};
