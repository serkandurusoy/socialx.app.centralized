import React from 'react';
import {Platform, Switch, Text, View} from 'react-native';

import {OS_TYPES} from 'consts';
import {Colors} from 'theme';
import style from './style';

export interface ISettingCheckboxProps {
	title: string;
	value: boolean;
	description?: string;
	onValueUpdated?: () => void;
}

export const SettingCheckbox: React.SFC<ISettingCheckboxProps> = ({title, description, value, onValueUpdated}) => (
	<View style={style.container}>
		<View style={style.leftContainer}>
			<Text style={style.title}>{title}</Text>
			<Text style={style.description}>{description}</Text>
		</View>
		<Switch
			style={style.switch}
			value={value}
			onValueChange={onValueUpdated}
			thumbTintColor={Platform.OS === OS_TYPES.Android ? Colors.white : null}
			onTintColor={Colors.postHour}
		/>
	</View>
);
