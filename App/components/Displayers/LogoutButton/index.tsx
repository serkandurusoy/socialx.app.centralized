import {Button} from 'native-base';
import React from 'react';
import {Image, Text, TouchableHighlight, TouchableWithoutFeedback, View} from 'react-native';
import {Colors} from '../../../theme/';
import style from './style';

export interface ILogoutButtonProps {
	selected: boolean;
	onPress?: Func;
	iconSource?: number;
	text: string;
}

export const LogoutButton: React.SFC<ILogoutButtonProps> = (props) => {
	return (
		<View style={style.container}>
			<Button onPress={props.onPress} color={Colors.pink} style={style.checkbox}>
			  <Text style={style.buttonText}>{props.text}</Text>
        {props.iconSource ? <Image source={props.iconSource} style={style.iconStyle} resizeMode={'contain'} /> : null}
      </Button>
		</View>
	);
};
