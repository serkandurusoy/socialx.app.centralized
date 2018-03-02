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

export const UserAvatar: React.SFC<IUserAvatarProps> = (props) => {
	return (
		<View style={style.container}>
			<AvatarImage image={{uri: props.avatarURL}} />
			<AvatarName fullName={props.fullName} username={props.username} />
		</View>
	);
};
