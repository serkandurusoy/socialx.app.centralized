import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {AvatarImage} from 'components';
import style from './style';

export interface INotificationGIProps {
	avatarURL: string;
	fullName: string;
	username: string;
	text: string;
	onCheckNotification: () => void;
}

export const NotificationGI: React.SFC<INotificationGIProps> = (props) => {
	const renderUsername = () => {
		if (props.username !== '') {
			return <Text style={style.username}>{'@' + props.username}</Text>;
		}
		return null;
	};

	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<AvatarImage image={{uri: props.avatarURL}} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text style={style.fullName}>{props.fullName}</Text>
					{renderUsername()}
					<Text style={style.friendRequest}>{props.text}</Text>
				</View>
			</View>
			<TouchableOpacity onPress={props.onCheckNotification}>
				<Icon name={'md-close'} style={style.iconButton} />
			</TouchableOpacity>
		</View>
	);
};
