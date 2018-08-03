import React from 'react';
import {Button, View} from 'react-native';

import {Colors} from 'theme';
import {ButtonSizes, SXButton} from '../../Interaction';
import {AvatarImage} from '../Image';
import {AvatarName} from '../Name';
import style from './style';

export interface IUserAvatarProps {
	avatarURL: any;
	fullName: string;
	username?: string;
	usernameColor?: string;
	fullNameColor?: string;
	ownUser?: boolean;
	onEditProfile?: () => void;
}

export const UserAvatar: React.SFC<IUserAvatarProps> = ({
	avatarURL,
	fullName,
	username,
	usernameColor,
	fullNameColor,
	ownUser,
	onEditProfile,
}) => (
	<View style={style.container}>
		<View style={style.imageContainer}>
			<AvatarImage image={avatarURL} />
		</View>
		<View style={style.dataContainer}>
			<AvatarName fullName={fullName} username={username} fullNameColor={fullNameColor} userNameColor={usernameColor} />
			<SXButton
				label={ownUser ? 'EDIT PROFILE' : 'MESSAGE'}
				size={ButtonSizes.Small}
				borderColor={Colors.grayText}
				textColor={Colors.background}
				containerStyle={style.buttonContainer}
				onPress={ownUser ? onEditProfile : () => {}}
			/>
		</View>
	</View>
);
