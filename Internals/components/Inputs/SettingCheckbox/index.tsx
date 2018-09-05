// MIGRATION: migrated components/inputs/SettingCheckbox

import React from 'react';
import {Platform, Switch, SwitchProps, Text, View} from 'react-native';

import {OS_TYPES} from 'consts';
import {Colors} from 'theme';
import style from './style';

interface ISettingCheckboxProps {
	title: string;
	value: boolean;
	description?: string;
	onValueUpdated?: () => void;
}

export const SettingCheckbox: React.SFC<ISettingCheckboxProps> = ({title, description, value, onValueUpdated}) => {
	const switchAttributes: SwitchProps = {
		style: style.switch,
		value,
		onValueChange: onValueUpdated,
		onTintColor: Colors.postHour,
	};
	if (Platform.OS === OS_TYPES.Android) {
		switchAttributes.thumbTintColor = Colors.white;
	}
	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<Text style={style.title}>{title}</Text>
				<Text style={style.description}>{description}</Text>
			</View>
			<Switch {...switchAttributes} />
		</View>
	);
};
