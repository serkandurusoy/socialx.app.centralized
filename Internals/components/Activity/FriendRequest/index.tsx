// MIGRATED: migrated components/activityCards/ActivityFriendRequestCard

import React from 'react';
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from 'components';
import {Icons} from 'theme';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

interface IFriendRequestProps extends IWithTranslationProps {
	avatarURL: string;
	fullName: string;
	username: string;
	userId: string;
	onRequestConfirmed: () => void;
	onRequestDeclined: () => void;
	onViewUserProfile: (userId: string) => void;
	loadingConfirmed: boolean;
	loadingDeclined: boolean;
}

const InlineLoader: React.SFC = () => (
	<View style={style.iconTouch}>
		<ActivityIndicator size={'small'} />
	</View>
);

const FriendRequestComp: React.SFC<IFriendRequestProps> = ({
	loadingConfirmed,
	loadingDeclined,
	username,
	fullName,
	userId,
	onViewUserProfile,
	avatarURL,
	onRequestConfirmed,
	onRequestDeclined,
	getText,
}) => {
	const isLoading = loadingConfirmed || loadingDeclined;
	return (
		<View style={style.container}>
			<TouchableOpacity style={style.leftContainer} onPress={() => onViewUserProfile(userId)}>
				<AvatarImage image={{uri: avatarURL}} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text style={style.fullName}>{fullName}</Text>
					{username !== '' && <Text style={style.username}>{'@' + username}</Text>}
					<Text style={style.friendRequest}>{getText('notifications.card.friend.request.title')}</Text>
				</View>
			</TouchableOpacity>
			{!loadingConfirmed && (
				<TouchableOpacity onPress={onRequestConfirmed} style={style.iconTouch} disabled={isLoading}>
					<Image source={Icons.greenRoundCheck} style={style.iconImage} />
				</TouchableOpacity>
			)}
			{loadingConfirmed && <InlineLoader />}
			{!loadingDeclined && (
				<TouchableOpacity onPress={onRequestDeclined} style={style.iconTouch} disabled={isLoading}>
					<Image source={Icons.redRoundCross} style={style.iconImage} />
				</TouchableOpacity>
			)}
			{loadingDeclined && <InlineLoader />}
		</View>
	);
};

export const FriendRequest = withTranslations(FriendRequestComp as any);
