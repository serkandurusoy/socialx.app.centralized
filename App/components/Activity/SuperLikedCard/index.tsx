import moment from 'moment';
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from '../../Avatar';
import style from './style';

export interface ActivitySuperLikedCardPosts {
	postThumbURL: string;
	postId: string;
}

export interface IActivitySuperLikedCardProps {
	avatarURL: string;
	fullName: string;
	timestamp: Date;
	wallPosts: ActivitySuperLikedCardPosts[];
	onThumbPress: (postId: string) => void;
}

export const ActivitySuperLikedCard: React.SFC<IActivitySuperLikedCardProps> = (props) => {
	const renderWallPostThumbs = () => {
		const ret: any = [];
		props.wallPosts.forEach((wallPost: ActivitySuperLikedCardPosts, index: number) => {
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
					<Text style={style.pinkText}>{'Superliked '}</Text>
					{props.wallPosts.length}
					{' photos from your profile'}
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
