import moment from 'moment';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {AvatarImage} from 'components';
import {AnimatedText} from 'configuration/animations';
import {Colors, Sizes} from 'theme';
import {ICommentOrReply, IWallPostCommentReply} from 'types';
import style from './style';

enum COMMENT_ADVANCED_ACTIONS {
	DELETE = 'Delete',
	COPY = 'Copy',
	CANCEL = 'Cancel',
}

const COMMENT_OPTIONS = [COMMENT_ADVANCED_ACTIONS.COPY, COMMENT_ADVANCED_ACTIONS.CANCEL];
const COMMENT_OPTIONS_WITH_DELETE = [COMMENT_ADVANCED_ACTIONS.DELETE, ...COMMENT_OPTIONS];

const PULSATE_PERIOD = 700;

export interface ICommentCardProps {
	comment: ICommentOrReply;
	onCommentLike: () => void;
	onCommentReply: (startReply: boolean) => void;
	onCommentDelete: () => void;
	isReply?: boolean;
	onViewUserProfile: (userId: string) => void;
}

export interface ICommentCardState {
	animating: boolean;
	touchDisabled: boolean;
}

const CommentLikes: React.SFC<{numberOfLikes: number; likedByMe: boolean}> = ({numberOfLikes, likedByMe}) => (
	<View style={style.likesContainer}>
		<View style={style.likesBorder}>
			<Icon
				name={'md-thumbs-up'}
				size={Sizes.smartHorizontalScale(25)}
				color={likedByMe ? Colors.pink : Colors.fuchsiaBlue}
			/>
			<Text style={style.numberOfLikes}>{numberOfLikes}</Text>
		</View>
	</View>
);

const ReplyButton: React.SFC<{onCommentReply: (value: boolean) => void}> = ({onCommentReply}) => (
	<TouchableOpacity onPress={() => onCommentReply(true)}>
		<Text style={style.actionButtonText}>{'Reply'}</Text>
	</TouchableOpacity>
);

const CommentReply: React.SFC<{
	reply: IWallPostCommentReply;
	onCommentReply: (value: boolean) => void;
	onViewUserProfile: (userId: string) => void;
}> = ({reply, onViewUserProfile, onCommentReply}) => (
	<View style={style.replyEntry}>
		<TouchableOpacity style={style.replyUserContainer} onPress={() => onViewUserProfile(reply.user.id)}>
			<AvatarImage image={{uri: reply.user.avatarURL}} style={style.replyAvatar} />
			<Text numberOfLines={1} style={style.replyUserFullName}>
				{reply.user.fullName}
			</Text>
		</TouchableOpacity>
		<Text numberOfLines={1} style={style.replyText} onPress={() => onCommentReply(false)}>
			{reply.text}
		</Text>
	</View>
);

const CommentReplies: React.SFC<{
	replies: IWallPostCommentReply[];
	onCommentReply: (value: boolean) => void;
	onViewUserProfile: (userId: string) => void;
}> = ({replies, onCommentReply, onViewUserProfile}) => {
	if (replies) {
		if (replies.length > 3) {
			const lastReply = replies[replies.length - 1];
			return (
				<View>
					<TouchableOpacity onPress={() => onCommentReply(false)}>
						<Text style={style.viewMoreReplies}>{`View ${replies.length - 1} more replies`}</Text>
					</TouchableOpacity>
					<CommentReply reply={lastReply} onCommentReply={onCommentReply} onViewUserProfile={onViewUserProfile} />
				</View>
			);
		} else if (replies.length > 0) {
			return (
				<View>
					{replies.map((reply, index) => (
						<CommentReply
							key={reply.id}
							reply={reply}
							onCommentReply={onCommentReply}
							onViewUserProfile={onViewUserProfile}
						/>
					))}
				</View>
			);
		}
	}
	return null;
};

export class CommentCard extends React.Component<ICommentCardProps, ICommentCardState> {
	public state = {
		animating: false,
		touchDisabled: false,
	};

	private animatedText: any | null = null;
	private commentLikeValue = this.props.comment.likedByMe;

	public render() {
		const {comment, isReply, onViewUserProfile, onCommentReply} = this.props;
		const {likedByMe, numberOfLikes, replies} = comment;
		const commentTimestamp = moment(comment.timestamp).fromNow();
		return (
			<View style={style.container}>
				<TouchableOpacity onPress={() => this.props.onViewUserProfile(comment.user.id)}>
					<AvatarImage image={{uri: comment.user.avatarURL}} style={style.avatarImage} />
				</TouchableOpacity>
				<View style={style.rightContainer}>
					<View>
						<View style={style.commentBackground}>
							<Text style={style.userFullName} onPress={() => this.props.onViewUserProfile(comment.user.id)}>
								{comment.user.fullName}
							</Text>
							<Text style={[style.commentText, numberOfLikes > 0 ? style.commentTextPadding : null]}>
								{comment.text}
							</Text>
						</View>
						{numberOfLikes > 0 && <CommentLikes numberOfLikes={numberOfLikes} likedByMe={likedByMe} />}
					</View>
					<View style={style.actionsContainer}>
						<Text style={style.timestamp}>{commentTimestamp}</Text>
						<TouchableOpacity onPress={this.onCommentLikeHandler} disabled={this.state.touchDisabled}>
							<AnimatedText ref={(ref: any) => (this.animatedText = ref)} style={style.actionButtonText}>
								{likedByMe ? 'Unlike' : 'Like'}
							</AnimatedText>
						</TouchableOpacity>
						{!isReply && <ReplyButton onCommentReply={this.props.onCommentReply} />}
					</View>
					{!this.props.isReply && (
						<CommentReplies replies={replies} onViewUserProfile={onViewUserProfile} onCommentReply={onCommentReply} />
					)}
				</View>
			</View>
		);
	}

	private onCommentLikeHandler = () => {
		this.animatedText.animate('pulsate', PULSATE_PERIOD).then(this.onAnimationEndHandler);
		this.setState({
			touchDisabled: true,
		});
		this.commentLikeValue = this.props.comment.likedByMe;
		this.props.onCommentLike();
	};

	private onAnimationEndHandler = () => {
		if (this.props.comment.likedByMe === this.commentLikeValue) {
			this.animatedText.animate('pulsate', PULSATE_PERIOD).then(this.onAnimationEndHandler);
		} else {
			this.setState({
				touchDisabled: false,
			});
		}
	};
}
