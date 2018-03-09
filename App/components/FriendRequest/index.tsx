import React from 'react';
import {Image, Text, View} from 'react-native';

import {Colors} from '../../theme';
import {AvatarImage} from '../AvatarImage';
import {ButtonSizes, SXButton} from '../Button';
import style from './style';

export interface IFriendRequestProps {
	avatarURL: string;
	fullName: string;
	username: string;
}

export const FriendRequest: React.SFC<IFriendRequestProps> = (props) => {
	const renderUsername = () => {
		if (props.username !== '') {
			return <Text style={style.username}>{'@' + props.username}</Text>;
		}
		return null;
	};

	const approveFriendRequestHandler = () => {
		alert('TBD: approveFriendRequestHandler');
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
			<SXButton
				label={'Approve'}
				size={ButtonSizes.Small}
				autoWidth={true}
				borderColor={Colors.transparent}
				onPress={approveFriendRequestHandler}
			/>
		</View>
	);
};
