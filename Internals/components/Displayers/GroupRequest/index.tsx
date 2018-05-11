import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from 'components';
import {Icons} from 'theme';
import style from './style';

export interface IGroupRequestProps {
	avatarURL: string;
	fullName: string;
	groupName: string;
	onGroupConfirmed: () => void;
	onGroupDeclined: () => void;
}

export const GroupRequest: React.SFC<IGroupRequestProps> = (props) => {
	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<AvatarImage image={{uri: props.avatarURL}} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text style={style.fullName}>{props.fullName}</Text>
					<Text style={style.inviteText}>{'Invited you to group'}</Text>
					<Text style={style.groupName}>{'@' + props.groupName}</Text>
				</View>
			</View>
			<TouchableOpacity onPress={props.onGroupConfirmed} style={style.iconTouch}>
				<Image source={Icons.greenRoundCheck} style={style.iconImage} />
			</TouchableOpacity>
			<TouchableOpacity onPress={props.onGroupDeclined} style={style.iconTouch}>
				<Image source={Icons.redRoundCross} style={style.iconImage} />
			</TouchableOpacity>
		</View>
	);
};
