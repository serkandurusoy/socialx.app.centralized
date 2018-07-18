import React from 'react';
import {View} from 'react-native';

import {AvatarImage} from '../Image';
import {AvatarName} from '../Name';
import style from './style';

export interface IUserAvatarProps {
	avatarURL: any;
	fullName: string;
	username?: string;
	usernameColor?: string;
	fullNameColor?: string;
}

export const UserAvatar: React.SFC<IUserAvatarProps> = ({
	avatarURL,
	fullName,
	username,
	usernameColor,
	fullNameColor,
}) => (
	<View style={style.container}>
		<AvatarImage image={avatarURL} />
		<AvatarName fullName={fullName} username={username} fullNameColor={fullNameColor} userNameColor={usernameColor} />
	</View>
);
