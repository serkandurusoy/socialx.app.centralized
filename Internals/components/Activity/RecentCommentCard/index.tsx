import moment from 'moment';
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from 'components';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

export interface ActivityRecentCommentCardPosts {
	postThumbURL: string;
	postId: string;
}

export interface IActivityRecentCommentCardProps extends IWithTranslationProps {
	avatarURL: string;
	fullName: string;
	timestamp: Date;
	wallPosts: ActivityRecentCommentCardPosts[];
	onThumbPress: (postId: string) => void;
}

export interface IWallPostsProps {
	wallPosts: ActivityRecentCommentCardPosts[];
	onThumbPress: (postId: string) => void;
}

const WallPostThumbs: React.SFC<IWallPostsProps> = ({wallPosts, onThumbPress}) => (
	<ScrollView
		horizontal={true}
		alwaysBounceHorizontal={false}
		showsHorizontalScrollIndicator={false}
		contentContainerStyle={style.wallPostsThumbsContainer}
	>
		{wallPosts.map((wallPost: ActivityRecentCommentCardPosts, index: number) => (
			<TouchableOpacity key={index} style={style.postThumbTouchContainer} onPress={() => onThumbPress(wallPost.postId)}>
				<Image source={{uri: wallPost.postThumbURL}} resizeMode={'contain'} style={style.postThumbImage} />
			</TouchableOpacity>
		))}
	</ScrollView>
);

export const ActivityRecentComment: React.SFC<IActivityRecentCommentCardProps> = ({
	avatarURL,
	fullName,
	timestamp,
	wallPosts,
	onThumbPress,
	getText,
}) => (
	<View style={style.container}>
		<AvatarImage image={{uri: avatarURL}} style={style.avatarImage} />
		<View style={style.rightContainer}>
			<View style={style.topRightRow}>
				<Text style={style.fullName}>{fullName}</Text>
				<Text style={style.notificationTimestamp}>{moment(timestamp).fromNow()}</Text>
			</View>
			<Text style={style.activityActionText}>
				{getText('notifications.card.recent.comment.title', wallPosts.length)}
			</Text>
			<WallPostThumbs wallPosts={wallPosts} onThumbPress={onThumbPress} />
		</View>
	</View>
);

export const ActivityRecentCommentCard = withTranslations(ActivityRecentComment);
