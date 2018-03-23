import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from '../../theme';
import style from './style';

export interface IScreenHeaderButtonProps {
	iconName: string;
	onPress: () => void;
	iconColor?: string;
}

export const ScreenHeaderButton: React.SFC<IScreenHeaderButtonProps> = (props) => {
	return (
		<TouchableOpacity onPress={props.onPress} style={style.iconContainer}>
			<Icon name={props.iconName} size={Sizes.smartHorizontalScale(25)} color={props.iconColor} />
		</TouchableOpacity>
	);
};

ScreenHeaderButton.defaultProps = {
	iconColor: Colors.white,
};
