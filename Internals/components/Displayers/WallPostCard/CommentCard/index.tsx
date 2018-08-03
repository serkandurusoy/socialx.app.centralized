import moment from 'moment';
import React, {RefObject} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {AvatarImage} from 'components';
import {AnimatedText} from 'configuration/animations';
import {Colors, Sizes} from 'theme';
import {IWallPostComment} from 'types';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

const PULSATE_PERIOD = 700;

export interface ICommentCardProps extends IWithTranslationProps {
	comment: IWallPostComment;
	onCommentLike: () => void;
	onCommentReply: (startReply: boolean) => void;
	isReply?: boolean;
	onViewUserProfile: (userId: string) => void;
	requestingLike: boolean;
	onShowOptionsMenu: () => void;
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

const ReplyButton: React.SFC<{
	onCommentReply: (value: boolean) => void;
	label: string;
}> = ({onCommentReply, label}) => (
	<TouchableOpacity onPress={() => onCommentReply(true)}>
		<Text style={style.actionButtonText}>{label}</Text>
	</TouchableOpacity>
);

const CommentReply: React.SFC<{
	reply: IWallPostComment;
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

interface ICommentRepliesProps extends IWithTranslationProps {
	replies: IWallPostComment[];
	onCommentReply: (value: boolean) => void;
	onViewUserProfile: (userId: string) => void;
}

const CommentRepliesTranslated: React.SFC<ICommentRepliesProps> = ({
	replies,
	onCommentReply,
	onViewUserProfile,
	getText,
}) => {
	if (replies) {
		if (replies.length > 3) {
			const lastReply = replies[replies.length - 1];
			return (
				<View>
					<TouchableOpacity onPress={() => onCommentReply(false)}>
						<Text style={style.viewMoreReplies}>
							{getText('comments.screen.comment.card.view.more', replies.length - 1)}
						</Text>
					</TouchableOpacity>
					<CommentReply reply={lastReply} onCommentReply={onCommentReply} onViewUserProfile={onViewUserProfile} />
				</View>
			);
		} else if (replies.length > 0) {
			return (
				<View>
					{replies.map((reply) => (
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

const CommentReplies = withTranslations(CommentRepliesTranslated);

const onCommentLikeHandler = async (
	onCommentLike: () => void,
	requestingLike: boolean,
	animatedText: RefObject<any>,
) => {
	onCommentLike();
	await animatedText.current.animate('pulsate', PULSATE_PERIOD);
	onAnimationEndHandler(requestingLike, animatedText);
};

const onAnimationEndHandler = async (requestingLike: boolean, animatedText: RefObject<any>) => {
	if (requestingLike) {
		await animatedText.current.animate('pulsate', PULSATE_PERIOD);
		onAnimationEndHandler(requestingLike, animatedText);
	}
};

const CommentCardComp: React.SFC<ICommentCardProps> = ({
	comment,
	isReply,
	onViewUserProfile,
	onCommentReply,
	onCommentLike,
	requestingLike,
	getText,
	onShowOptionsMenu,
}) => {
	const {likedByMe, numberOfLikes, replies, text, user, timestamp} = comment;
	const commentTimestamp = moment(timestamp).fromNow();

	const animatedText: RefObject<any> = React.createRef();

	return (
		<View style={style.container}>
			<TouchableOpacity onPress={() => onViewUserProfile(user.id)}>
				<AvatarImage image={{uri: user.avatarURL}} style={style.avatarImage} />
			</TouchableOpacity>
			<View style={style.rightContainer}>
				<View>
					<TouchableOpacity style={style.commentBackground} onLongPress={onShowOptionsMenu}>
						<Text style={style.userFullName} onPress={() => onViewUserProfile(user.id)}>
							{user.fullName}
						</Text>
						<Text style={[style.commentText, numberOfLikes > 0 ? style.commentTextPadding : null]}>{text}</Text>
					</TouchableOpacity>
					{numberOfLikes > 0 && <CommentLikes numberOfLikes={numberOfLikes} likedByMe={likedByMe} />}
				</View>
				<View style={style.actionsContainer}>
					<Text style={style.timestamp}>{commentTimestamp}</Text>
					<TouchableOpacity
						onPress={() => onCommentLikeHandler(onCommentLike, requestingLike, animatedText)}
						disabled={requestingLike}
					>
						<AnimatedText ref={animatedText} style={style.actionButtonText}>
							{likedByMe ? getText('comments.screen.actions.unlike') : getText('comments.screen.actions.like')}
						</AnimatedText>
					</TouchableOpacity>
					{!isReply && <ReplyButton onCommentReply={onCommentReply} label={getText('comments.screen.actions.reply')} />}
				</View>
				{!isReply && (
					<CommentReplies replies={replies} onViewUserProfile={onViewUserProfile} onCommentReply={onCommentReply} />
				)}
			</View>
		</View>
	);
};

export const CommentCard = withTranslations(CommentCardComp);
