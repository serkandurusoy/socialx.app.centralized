import moment from 'moment';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {IWallPostComment, IWallPostCommentReply} from '../../../../screens/CommentsScreen';
import {Colors, Sizes} from '../../../../theme';
import {AvatarImage} from '../../../Avatar/Image';
import style from './style';

export interface ICommentCardProps {
	comment: IWallPostComment | IWallPostCommentReply;
	onCommentLike: () => void;
	onCommentReply: (startReply: boolean) => void;
	isReply?: boolean;
}

export const CommentCard: React.SFC<ICommentCardProps> = (props) => {
	const {comment} = props;

	const commentTimestamp = moment(comment.timestamp).fromNow();

	const renderReply = (reply: IWallPostCommentReply, index: number) => {
		return (
			<TouchableOpacity style={style.replyEntry} key={index} onPress={() => props.onCommentReply(false)}>
				<AvatarImage image={{uri: reply.user.avatarURL}} style={style.replyAvatar} />
				<Text numberOfLines={1} style={style.replyUserFullName}>
					{reply.user.fullName}
				</Text>
				<Text numberOfLines={1} style={style.replyText}>
					{reply.text}
				</Text>
			</TouchableOpacity>
		);
	};

	const renderReplies = () => {
		if (!props.isReply) {
			const replies = (comment as IWallPostComment).replies;
			if (replies.length > 3) {
				const lastReply = replies[replies.length - 1];
				return (
					<View>
						<TouchableOpacity onPress={() => props.onCommentReply(false)}>
							<Text style={style.viewMoreReplies}>{`View ${replies.length - 1} more replies`}</Text>
						</TouchableOpacity>
						{renderReply(lastReply, 0)}
					</View>
				);
			} else if (replies.length > 0) {
				const repliesToRender: any = [];
				replies.forEach((reply, index) => {
					repliesToRender.push(renderReply(reply, index));
				});
				return <View>{repliesToRender}</View>;
			}
		}
		return null;
	};

	const renderLikes = () => {
		if (comment.numberOfLikes > 0) {
			return (
				<View style={style.likesContainer}>
					<View style={style.likesBorder}>
						<Icon
							name={'md-thumbs-up'}
							size={Sizes.smartHorizontalScale(15)}
							color={comment.likedByMe ? Colors.pink : Colors.fuchsiaBlue}
						/>
						<Text style={style.numberOfLikes}>{comment.numberOfLikes}</Text>
					</View>
				</View>
			);
		}
		return null;
	};

	const renderReplyButton = () => {
		if (!props.isReply) {
			return (
				<TouchableOpacity onPress={() => props.onCommentReply(true)}>
					<Text style={style.actionButtonText}>{'Reply'}</Text>
				</TouchableOpacity>
			);
		}
		return null;
	};

	return (
		<View style={style.container}>
			<AvatarImage image={{uri: comment.user.avatarURL}} style={style.avatarImage} />
			<View style={style.rightContainer}>
				<View>
					<View style={style.commentBackground}>
						<Text style={style.userFullName}>{comment.user.fullName}</Text>
						<Text style={style.commentText}>{comment.text}</Text>
					</View>
					{renderLikes()}
				</View>
				<View style={style.actionsContainer}>
					<Text style={style.timestamp}>{commentTimestamp}</Text>
					<TouchableOpacity onPress={props.onCommentLike}>
						<Text style={style.actionButtonText}>{comment.likedByMe ? 'Unlike' : 'Like'}</Text>
					</TouchableOpacity>
					{renderReplyButton()}
				</View>
				{renderReplies()}
			</View>
		</View>
	);
};
