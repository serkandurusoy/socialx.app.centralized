import moment from 'moment';
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from 'components';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

export interface ActivitySuperLikedCardPosts {
	postThumbURL: string;
	postId: string;
}

export interface IActivitySuperLikedCardProps extends IWithTranslationProps {
	avatarURL: string;
	fullName: string;
	timestamp: Date;
	wallPosts: ActivitySuperLikedCardPosts[];
	onThumbPress: (postId: string) => void;
}

export interface IWallPostsProps {
	wallPosts: ActivitySuperLikedCardPosts[];
	onThumbPress: (postId: string) => void;
}

// TODO: @serkan @jake did I see this exact component in recent comment card?
const WallPostThumbs: React.SFC<IWallPostsProps> = ({wallPosts, onThumbPress}) => (
	<ScrollView
		horizontal={true}
		alwaysBounceHorizontal={false}
		showsHorizontalScrollIndicator={false}
		contentContainerStyle={style.wallPostsThumbsContainer}
	>
		{wallPosts.map((wallPost: ActivitySuperLikedCardPosts, index: number) => (
			<TouchableOpacity key={index} style={style.postThumbTouchContainer} onPress={() => onThumbPress(wallPost.postId)}>
				<Image source={{uri: wallPost.postThumbURL}} resizeMode={'contain'} style={style.postThumbImage} />
			</TouchableOpacity>
		))}
	</ScrollView>
);

export const ActivitySuperLiked: React.SFC<IActivitySuperLikedCardProps> = ({
	avatarURL,
	fullName,
	timestamp,
	wallPosts,
	onThumbPress,
	getText,
}) => {
	return (
		<View style={style.container}>
			<AvatarImage image={{uri: avatarURL}} style={style.avatarImage} />
			<View style={style.rightContainer}>
				<View style={style.topRightRow}>
					<Text style={style.fullName}>{fullName}</Text>
					<Text style={style.notificationTimestamp}>{moment(timestamp).fromNow()}</Text>
				</View>
				<Text style={style.activityActionText}>
					<Text style={style.pinkText}>{`${getText('notifications.card.super.liked.part1')} `}</Text>
					{getText('notifications.card.super.liked.part2', wallPosts.length)}
				</Text>
				<WallPostThumbs wallPosts={wallPosts} onThumbPress={onThumbPress} />
			</View>
		</View>
	);
};

export const ActivitySuperLikedCard = withTranslations(ActivitySuperLiked);
