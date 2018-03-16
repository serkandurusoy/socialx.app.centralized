import moment from 'moment';
import React from 'react';
import {Text, View} from 'react-native';

import {AvatarImage} from '../AvatarImage';
import style from './style';

export interface IFriendRequestProps {
	avatarURL: string;
	userName: string;
	message: string;
	time: any;
}

export const MessagePerson: React.SFC<IFriendRequestProps> = (props) => {
	const formattedTime = moment(props.time).format('hh:mm A');
	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<AvatarImage image={{uri: props.avatarURL}} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text numberOfLines={1} style={style.username}>
						{props.userName}
					</Text>
					<Text numberOfLines={1} style={style.message}>
						{props.message}
					</Text>
				</View>
			</View>
			<Text style={style.time}>{formattedTime}</Text>
		</View>
	);
};
