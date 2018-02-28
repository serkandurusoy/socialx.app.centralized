import React, {Component} from 'react';
import {View} from 'react-native';

import {AvatarImage} from '../AvatarImage';
import {AvatarName} from '../AvatarName';
import style from './style';

export interface IUserAvatarProps {
	avatarURL: string;
	fullName: string;
	username?: string;
}

export class UserAvatar extends Component<IUserAvatarProps> {
	public render() {
		return (
			<View style={style.container}>
				<AvatarImage image={{uri: this.props.avatarURL}} />
				<AvatarName fullName={this.props.fullName} username={this.props.username} />
			</View>
		);
	}
}
