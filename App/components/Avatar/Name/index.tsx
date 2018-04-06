import React from 'react';
import {Text, View} from 'react-native';

import {Colors} from '../../../theme';
import style from './style';

export interface IAvatarNameProps {
	fullName: string;
	username?: string;
	fullNameColor?: string;
	userNameColor?: string;
}

export const AvatarName: React.SFC<IAvatarNameProps> = (props) => {
	const renderUserName = () => {
		if (props.username !== '') {
			return <Text style={[style.username, {color: props.userNameColor}]}>{'@' + props.username}</Text>;
		}
		return null;
	};

	return (
		<View>
			<Text style={[style.fullName, {color: props.fullNameColor}]}>{props.fullName}</Text>
			{renderUserName()}
		</View>
	);
};

AvatarName.defaultProps = {
	fullNameColor: Colors.userAvatarFullName,
	userNameColor: Colors.postText,
};
