import moment from 'moment';
import React from 'react';
import {Clipboard, Text, TouchableOpacity, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {IWallPostComment, IWallPostCommentReply} from '../../../../screens/CommentsScreen';
import {Colors, Sizes} from '../../../../theme';
import {AvatarImage} from '../../../Avatar/Image';
import style, {DROPDOWN_ITEM_HEIGHT} from './style';

enum COMMENT_ADVANCED_ACTIONS {
	DELETE = 'Delete',
	COPY = 'Copy',
	CANCEL = 'Cancel',
}

const COMMENT_OPTIONS = [COMMENT_ADVANCED_ACTIONS.COPY, COMMENT_ADVANCED_ACTIONS.CANCEL];
const COMMENT_OPTIONS_WITH_DELETE = [COMMENT_ADVANCED_ACTIONS.DELETE, ...COMMENT_OPTIONS];

export interface ICommentCardProps {
	comment: IWallPostComment | IWallPostCommentReply;
	onCommentLike: () => void;
	onCommentReply: (startReply: boolean) => void;
	onCommentDelete: () => void;
	isReply?: boolean;
}

export const CommentCard: React.SFC<ICommentCardProps> = (props) => {
	const {comment} = props;

	const commentTimestamp = moment(comment.timestamp).fromNow();

	// TODO: @Jake: decide if it is onw comment or not, instead of true..
	// should be like comment.user.id === ?
	const commentOptions = true ? COMMENT_OPTIONS_WITH_DELETE : COMMENT_OPTIONS;

	let modalRef: ModalDropdown;

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

	const showAdvancedMenu = () => {
		modalRef.show();
	};

	const commentOptionSelectedHandler = (index: number, value: string) => {
		if (value === COMMENT_ADVANCED_ACTIONS.DELETE) {
			props.onCommentDelete();
		} else if (value === COMMENT_ADVANCED_ACTIONS.COPY) {
			Clipboard.setString(comment.text);
		}
	};

	const renderCommentOption = (option: string) => {
		return (
			<TouchableOpacity>
				<Text style={style.commentOption}>{option}</Text>
			</TouchableOpacity>
		);
	};

	const adjustDropDownFrame = (sizes: any) => {
		return {...sizes, height: commentOptions.length * DROPDOWN_ITEM_HEIGHT};
	};

	return (
		<View style={style.container}>
			<AvatarImage image={{uri: comment.user.avatarURL}} style={style.avatarImage} />
			<View style={style.rightContainer}>
				<View>
					<TouchableOpacity style={style.commentBackground} onLongPress={showAdvancedMenu}>
						<Text style={style.userFullName}>{comment.user.fullName}</Text>
						<Text style={style.commentText}>{comment.text}</Text>
					</TouchableOpacity>
					<ModalDropdown
						keyboardShouldPersistTaps={'handled'}
						dropdownStyle={style.dropDownStyle}
						options={commentOptions}
						defaultValue={commentOptions[0]}
						ref={(ref: ModalDropdown) => (modalRef = ref)}
						onSelect={commentOptionSelectedHandler}
						renderRow={renderCommentOption}
						renderSeparator={() => <View />}
						scrollEnabled={false}
						showsVerticalScrollIndicator={false}
						adjustFrame={adjustDropDownFrame}
					>
						<View />
					</ModalDropdown>
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
