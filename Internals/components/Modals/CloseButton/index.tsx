import React from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProp} from 'react-navigation';

import {Colors, Sizes} from 'theme';
import style from './style';

interface IModalCloseButtonProps {
	navigation?: NavigationScreenProp<any>;
	onClose?: () => void;
}

const closeModal = ({navigation, onClose}: IModalCloseButtonProps) => {
	Keyboard.dismiss();
	if (navigation) {
		navigation.goBack(null);
	} else if (onClose) {
		onClose();
	}
};

export const ModalCloseButton: React.SFC<IModalCloseButtonProps> = (props) => (
	<TouchableOpacity onPress={() => closeModal(props)}>
		<Icon name={'md-close'} size={Sizes.smartHorizontalScale(25)} color={Colors.white} style={style.closeIcon} />
	</TouchableOpacity>
);
