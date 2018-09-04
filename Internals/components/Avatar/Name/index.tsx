// MIGRATION: migrated to components/avatar

import React from 'react';
import {Text, View} from 'react-native';

import {Colors} from 'theme';
import style, {CONTAINER_HEIGHT_NAME_ONLY} from './style';

interface IAvatarNameProps {
	fullName: string;
	username?: string;
	fullNameColor?: string;
	userNameColor?: string;
}

export const AvatarName: React.SFC<IAvatarNameProps> = ({fullName, username, fullNameColor, userNameColor}) => {
	const hasUsername = username && username !== '';
	return (
		<View style={[style.container, !hasUsername ? {height: CONTAINER_HEIGHT_NAME_ONLY} : {}]}>
			<Text style={[style.fullName, {color: fullNameColor}]}>{fullName}</Text>
			{hasUsername && <Text style={[style.username, {color: userNameColor}]}>{'@' + username}</Text>}
		</View>
	);
};

AvatarName.defaultProps = {
	fullNameColor: Colors.userAvatarFullName,
	userNameColor: Colors.postText,
};
