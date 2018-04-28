import React from 'react';
import {Image, Text, View} from 'react-native';

import {Colors} from 'theme';
import {AvatarImage} from '../../Avatar';
import {ButtonSizes, SXButton} from '../../Interaction';
import style from './style';

export interface IFriendRequestProps {
	avatarURL: string;
	fullName: string;
	username: string;
	onRequestConfirmed: () => void;
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
			<SXButton
				label={'Approve'}
				size={ButtonSizes.Small}
				autoWidth={true}
				borderColor={Colors.transparent}
				onPress={props.onRequestConfirmed}
			/>
		</View>
	);
};
