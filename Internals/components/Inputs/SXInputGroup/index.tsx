import React from 'react';
import {Platform, Switch, Text, View} from 'react-native';

import {IAvatarPickerProps} from '../../Avatar';
import {ISettingCheckboxProps, SettingCheckbox} from '../SettingCheckbox';
import {ISXTextInputProps, SXTextInput, TRKeyboardKeys} from '../TextInput';

import {FormTypes} from 'consts';

export interface IFormSx {
	type: FormTypes;
	ViewStyle: any[];
	componentStyle?: any;
	avatarComponent?: IAvatarPickerProps;
	InputComponent?: ISXTextInputProps;
	CheckComponent?: ISettingCheckboxProps;
}

export interface ISXGroupProps {
	Comps: IFormSx[];
}

// todo: @serkan @jake let's refactor this together for some react best practices without creating so many instances
export const InputGroup: React.SFC<ISXGroupProps> = (props) => {
	const Components: any = [];

	const ComponentSwitch = (type: FormTypes, data: IFormSx) => {
		switch (type) {
			case FormTypes.Input:
				return <SXTextInput {...data.InputComponent} />;

			case FormTypes.Checkbox:
				return <SettingCheckbox {...data.CheckComponent} />;

			default:
				return <div />;
		}
	};

	props.Comps.map((Input) => {
		Components.push(
			<View style={Input.ViewStyle} key={Math.random()}>
				{ComponentSwitch(Input.type, Input)}
			</View>,
		);
	});

	return Components;
};

InputGroup.defaultProps = {};
