import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from 'components';
import {Icons} from 'theme';
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
			<TouchableOpacity onPress={props.onRequestConfirmed} style={style.iconTouch}>
				<Image source={Icons.greenRoundCheck} style={style.iconImage} />
			</TouchableOpacity>
			<TouchableOpacity onPress={props.onRequestDeclined} style={style.iconTouch}>
				<Image source={Icons.redRoundCross} style={style.iconImage} />
			</TouchableOpacity>
		</View>
	);
};
