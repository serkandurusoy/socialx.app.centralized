import React, {Component} from 'react';
import {View} from 'react-native';

import {AvatarImage} from '../AvatarImage';
import {AvatarName} from '../AvatarName';
import style from './style';

export interface IUserAvatarProps {
	avatarURL: any;
	fullName: string;
	username?: string;
	usernameColor?: string;
	fullNameColor?: string;
}

export const UserAvatar: React.SFC<IUserAvatarProps> = (props) => {
	return (
		<View style={style.container}>
			<AvatarImage image={props.avatarURL} />
			<AvatarName
				fullName={props.fullName}
				username={props.username}
				fullNameColor={props.fullNameColor}
				userNameColor={props.usernameColor}
			/>
		</View>
	);
};
