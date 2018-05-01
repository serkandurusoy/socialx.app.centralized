import moment from 'moment';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from '../../Avatar';
import style from './style';

interface IMessagingChatListEntryProps {
	avatarURL: string;
	fullName: string;
	message: string;
	time: any;
	onPress: () => void;
}

export const MessagingChatListEntry: React.SFC<IMessagingChatListEntryProps> = (props) => {
	const formattedTime = moment(props.time).format('hh:mm A');
	return (
		<TouchableOpacity style={style.container} onPress={props.onPress}>
			<View style={style.leftContainer}>
				<AvatarImage image={{uri: props.avatarURL}} style={style.avatarImage} />
				<View style={style.verticalContainer}>
					<Text numberOfLines={1} style={style.fullName}>
						{props.fullName}
					</Text>
					<Text numberOfLines={1} style={style.message}>
						{props.message}
					</Text>
				</View>
			</View>
			<Text style={style.time} numberOfLines={1}>
				{formattedTime}
			</Text>
		</TouchableOpacity>
	);
};
