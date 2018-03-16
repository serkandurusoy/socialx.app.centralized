import React, {Component} from 'react';
import {Platform, Switch, Text, View} from 'react-native';

import {OS_TYPES} from '../../constants';
import {Colors} from '../../theme/';
import style from './style';

export interface ISettingCheckboxProps {
	title: string;
	description?: string;
	initialValue?: boolean;
	valueUpdated?: (value: boolean) => void;
}

export interface ISettingCheckboxState {
	value: boolean;
}

export class SettingCheckbox extends Component<ISettingCheckboxProps, ISettingCheckboxState> {
	public static defaultProps: Partial<ISettingCheckboxProps> = {
		initialValue: false,
	};

	constructor(props: ISettingCheckboxProps, context: any) {
		super(props, context);
		this.state = {
			value: this.props.initialValue || false,
		};
	}

	public render() {
		return (
			<View style={style.container}>
				<View style={style.leftContainer}>
					<Text style={style.title}>{this.props.title}</Text>
					<Text style={style.description}>{this.props.description}</Text>
				</View>
				<Switch
					style={style.switch}
					value={this.state.value}
					onValueChange={this.valueUpdated}
					thumbTintColor={Platform.OS === OS_TYPES.Android ? Colors.white : null}
					onTintColor={Colors.postHour}
				/>
			</View>
		);
	}

	private valueUpdated = (newValue: boolean) => {
		this.setState({
			value: newValue,
		});
		if (this.props.valueUpdated) {
			this.props.valueUpdated(newValue);
		}
	}
}
