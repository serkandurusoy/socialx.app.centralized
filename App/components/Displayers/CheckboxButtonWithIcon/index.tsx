import {CheckBox} from 'native-base';
import React from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Colors} from '../../../theme/';
import style from './style';

export interface ICheckboxButtonWithIconProps {
	selected: boolean;
	onPress?: Func;
	iconSource?: number;
	text: string;
}

export const CheckboxButtonWithIcon: React.SFC<ICheckboxButtonWithIconProps> = (props) => {
	return (
		<View style={style.container}>
			<CheckBox checked={props.selected} onPress={props.onPress} color={Colors.pink} style={style.checkbox} />
			<Text style={style.buttonText}>{props.text}</Text>
			{props.iconSource ? <Image source={props.iconSource} style={style.iconStyle} resizeMode={'contain'} /> : null}
		</View>
	);
};
