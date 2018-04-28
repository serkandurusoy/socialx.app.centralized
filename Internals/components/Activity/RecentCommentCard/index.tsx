import moment from 'moment';
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from '../../Avatar';
import style from './style';

export interface ActivityRecentCommentCardPosts {
	postThumbURL: string;
	postId: string;
}

export interface IActivityRecentCommentCardProps {
	avatarURL: string;
	fullName: string;
	timestamp: Date;
	wallPosts: ActivityRecentCommentCardPosts[];
	onThumbPress: (postId: string) => void;
}

export const ActivityRecentCommentCard: React.SFC<IActivityRecentCommentCardProps> = (props) => {
	const renderWallPostThumbs = () => {
		const ret: any = [];
		props.wallPosts.forEach((wallPost: ActivityRecentCommentCardPosts, index: number) => {
			ret.push(
				<TouchableOpacity
					key={index}
					style={style.postThumbTouchContainer}
					onPress={() => props.onThumbPress(wallPost.postId)}
				>
					<Image source={{uri: wallPost.postThumbURL}} resizeMode={'contain'} style={style.postThumbImage} />
				</TouchableOpacity>,
			);
		});
		return ret;
	};

	return (
		<View style={style.container}>
			<AvatarImage image={{uri: props.avatarURL}} style={style.avatarImage} />
			<View style={style.rightContainer}>
				<View style={style.topRightRow}>
					<Text style={style.fullName}>{props.fullName}</Text>
					<Text style={style.notificationTimestamp}>{moment(props.timestamp).fromNow()}</Text>
				</View>
				<Text style={style.activityActionText}>
					{'Commented on '}
					{props.wallPosts.length}
					{' recent posts'}
				</Text>
				<ScrollView
					horizontal={true}
					alwaysBounceHorizontal={false}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={style.wallPostsThumbsContainer}
				>
					{renderWallPostThumbs()}
				</ScrollView>
			</View>
		</View>
	);
};
