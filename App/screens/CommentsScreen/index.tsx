import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {ModalCloseButton} from '../../components/Modals/CloseButton';
import {getRandomImage} from '../../utils';
import CommentsScreenComponent from './screen';

import base from '../../config/ipfs';
import {IComments} from '../../types/gql';

export interface IWallPostCommentReply {
	text: string;
	user: {
		fullName: string;
		avatarURL?: string;
	};
	timestamp: Date;
	numberOfLikes: number;
}

export interface IWallPostComment extends IWallPostCommentReply {
	replies: IWallPostCommentReply[];
}

export interface IWallPostCommentsProps {
	navigation: NavigationScreenProp<any>;
}

const SAMPLE_POST_COMMENTS: IWallPostComment[] = [
	{
		text: 'This is some very long text comment. It should be displayed on multiple lines',
		user: {
			fullName: 'Ionut Movila',
			avatarURL: getRandomImage(100, 200, 'people'),
		},
		timestamp: new Date('Mar 23 2018'),
		numberOfLikes: 3,
		replies: [
			{
				text: 'Hey Ionut, I might be there for this launch event',
				user: {
					fullName: 'John Smith',
					avatarURL: getRandomImage(100, 200),
				},
				timestamp: new Date('Mar 24 2018'),
				numberOfLikes: 1,
			},
			{
				text: 'Hey Ionut, I might be there for this launch event',
				user: {
					fullName: 'Derek Hammond long name that I have',
					avatarURL: getRandomImage(100, 200),
				},
				timestamp: new Date('Apr 11 2018'),
				numberOfLikes: 3,
			},
			{
				text: 'Hey Ionut, I might be there for this launch event',
				user: {
					fullName: 'John Smith',
					avatarURL: getRandomImage(100, 200),
				},
				timestamp: new Date('Mar 24 2018'),
				numberOfLikes: 1,
			},
			{
				text: 'Last reply from @Ionut, I might be there for this launch event',
				user: {
					fullName: 'Derek1 Hammond1',
					avatarURL: getRandomImage(100, 200),
				},
				timestamp: new Date('Apr 11 2018'),
				numberOfLikes: 3,
			},
		],
	},
	{
		text: 'Hey, greetings from California, where the time is perfect for surfing.',
		user: {
			fullName: 'Kane Wilson',
			avatarURL: getRandomImage(100, 200, 'people'),
		},
		timestamp: new Date('Jan 17 2018'),
		numberOfLikes: 24,
		replies: [
			{
				text: 'Last reply from @Kane, I might be there for this launch event',
				user: {
					fullName: 'Long user name here not entirely visible',
					avatarURL: getRandomImage(100, 200),
				},
				timestamp: new Date('Apr 11 2018'),
				numberOfLikes: 3,
			},
		],
	},
	{
		text: 'Hey, greetings from California, where the time is perfect for surfing.',
		user: {
			fullName: 'Justin Lawrence',
			avatarURL: getRandomImage(100, 200, 'people'),
		},
		timestamp: new Date('Apr 08 2018'),
		numberOfLikes: 0,
		replies: [],
	},
];

export default class CommentsScreen extends Component<IWallPostCommentsProps> {
	private static navigationOptions = (props: IWallPostCommentsProps) => ({
		headerRight: <ModalCloseButton navigation={props.navigation} />,
		headerLeft: <View />,
	})

	public render() {
		const postComments: IWallPostComment[] = [] as IWallPostComment[];
		const allComments: IComments[] = this.props.navigation.state.params.Comments;

		for (let i = 0; i < allComments.length; i++) {
			const currentComment = allComments[i];
			const ownerAv = currentComment.owner.avatar ? base.ipfs_URL + currentComment.owner.avatar.hash :
				'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
			postComments.push(
				{
					text: currentComment.text,
					user: {
						fullName: currentComment.owner.name,
						avatarURL: ownerAv,
					},
					timestamp: new Date(currentComment.createdAt),
					numberOfLikes: 0,
					replies: []
				},
			);
		}

		return (
			<CommentsScreenComponent
				comments={postComments}
				onCommentLike={this.onCommentLikeHandler}
				onCommentReply={this.onCommentReplyHandler}
				onCommentSend={this.onCommentSendHandler}
			/>
		);
	}

	private onCommentReplyHandler = (comment: IWallPostComment, startReply: boolean) => {
		this.props.navigation.navigate('RepliesScreen', {replies: comment.replies, startReply});
	}

	private onCommentLikeHandler = (comment: IWallPostComment) => {
		// console.log('Comment was liked', comment.text);
	}

	private onCommentSendHandler = (commentText: string) => {
		// console.log('onCommentSendHandler', commentText);
	}
}
