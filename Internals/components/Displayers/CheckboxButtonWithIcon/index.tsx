import {CheckBox} from 'native-base';
import React from 'react';
import {Image, Text, View} from 'react-native';

import {Colors} from 'theme';
import style from './style';

interface ICheckboxButtonWithIconProps {
	selected: boolean;
	onPress?: Func;
	iconSource?: number;
	text: string;
}

export const CheckboxButtonWithIcon: React.SFC<ICheckboxButtonWithIconProps> = ({
	selected,
	onPress,
	iconSource,
	text,
}) => (
	<View style={style.container}>
		<CheckBox checked={selected} onPress={onPress} color={Colors.pink} style={style.checkbox} />
		<Text style={style.buttonText}>{text}</Text>
		{iconSource && <Image source={iconSource} style={style.iconStyle} resizeMode={'contain'} />}
	</View>
);
