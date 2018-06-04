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

export const ActivitySuperLikedCard: React.SFC<IActivitySuperLikedCardProps> = (props) => {
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
				<WallPostThumbs wallPosts={props.wallPosts} onThumbPress={props.onThumbPress} />
			</View>
		</View>
	);
};
