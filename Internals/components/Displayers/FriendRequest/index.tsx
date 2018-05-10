import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {AvatarImage} from 'components';
import style from './style';

export interface IFriendRequestProps {
	avatarURL: string;
	fullName: string;
	username: string;
	onRequestConfirmed: () => void;
	onRequestDeclined: () => void;
}

export const FriendRequest: React.SFC<IFriendRequestProps> = (props) => {
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
					<Text style={style.friendRequest}>{'Friend Request'}</Text>
				</View>
			</View>
			<TouchableOpacity onPress={props.onRequestDeclined} style={[style.iconTouch, style.declineTouch]}>
				<Icon name={'md-close'} style={[style.iconButton, style.declineColor]} />
			</TouchableOpacity>
			<TouchableOpacity onPress={props.onRequestConfirmed} style={[style.iconTouch, style.acceptTouch]}>
				<Icon name={'md-checkmark'} style={[style.iconButton, style.acceptColor]} />
			</TouchableOpacity>
		</View>
	);
};
