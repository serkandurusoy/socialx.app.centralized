import React, {Component} from 'react';
import {Text, View} from 'react-native';

import style from './style';

export interface IAvatarNameProps {
	fullName: string;
	username?: string;
}

export class AvatarName extends Component<IAvatarNameProps> {
	public static defaultProps: Partial<IAvatarNameProps> = {};

	public render() {
		return (
			<View>
				<Text style={style.fullName}>{this.props.fullName}</Text>
				{this.props.username !== '' && <Text style={style.username}>{'@' + this.props.username}</Text>}
			</View>
		);
	}
}
