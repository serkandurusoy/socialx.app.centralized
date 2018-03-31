import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from '../../../theme';
import style from './style';

export interface ISendPostButtonProps {
	navParams: {
		onSendPress: Func;
	};
}

export const SendPostButton: React.SFC<ISendPostButtonProps> = (props) => {
	return (
		<TouchableOpacity style={style.container} onPress={props.navParams ? props.navParams.onSendPress : null}>
			<Icon name={'md-done-all'} size={Sizes.smartHorizontalScale(25)} color={Colors.white} />
		</TouchableOpacity>
	);
};
