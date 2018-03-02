import React from 'react';
import {Text, View} from 'react-native';

import style from './style';

export interface IAvatarNameProps {
	fullName: string;
	username?: string;
}

export const AvatarName: React.SFC<IAvatarNameProps> = (props) => {
	return (
		<View>
			<Text style={style.fullName}>{props.fullName}</Text>
			{props.username !== '' && <Text style={style.username}>{'@' + props.username}</Text>}
		</View>
	);
};

AvatarName.defaultProps = {};
