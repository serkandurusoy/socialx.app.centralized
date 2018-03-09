import React from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationScreenProp} from 'react-navigation';
import {Colors, Sizes} from '../../theme';
import style from './style';

interface IModalCloseButtonProps {
	navigation: NavigationScreenProp<any>;
}

export const ModalCloseButton: React.SFC<IModalCloseButtonProps> = (props) => {
	const closeModal = () => {
		Keyboard.dismiss();
		props.navigation.goBack();
	};

	return (
		<TouchableOpacity onPress={closeModal}>
			<Icon name={'times'} size={Sizes.smartHorizontalScale(20)} color={Colors.white} style={style.closeIcon} />
		</TouchableOpacity>
	);
};
