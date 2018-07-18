import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from 'components';
import {Icons} from 'theme';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

export interface IGroupRequestProps extends IWithTranslationProps {
	avatarURL: string;
	fullName: string;
	groupName: string;
	onGroupConfirmed: () => void;
	onGroupDeclined: () => void;
}

export const GroupRequestComp: React.SFC<IGroupRequestProps> = ({
	avatarURL,
	fullName,
	groupName,
	onGroupConfirmed,
	onGroupDeclined,
	getText,
}) => {
	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<AvatarImage image={{uri: avatarURL}} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text style={style.fullName}>{fullName}</Text>
					<Text style={style.inviteText}>{getText('notifications.card.group.request.title')}</Text>
					<Text style={style.groupName}>{'@' + groupName}</Text>
				</View>
			</View>
			<TouchableOpacity onPress={onGroupConfirmed} style={style.iconTouch}>
				<Image source={Icons.greenRoundCheck} style={style.iconImage} />
			</TouchableOpacity>
			<TouchableOpacity onPress={onGroupDeclined} style={style.iconTouch}>
				<Image source={Icons.redRoundCross} style={style.iconImage} />
			</TouchableOpacity>
		</View>
	);
};

export const GroupRequest = withTranslations(GroupRequestComp);
