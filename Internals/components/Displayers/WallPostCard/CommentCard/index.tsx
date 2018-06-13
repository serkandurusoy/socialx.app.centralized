import moment from 'moment';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {AvatarImage} from 'components';
import {AnimatedText} from 'configuration/animations';
import {Colors, Sizes} from 'theme';
import {IWallPostComment, IWallPostCommentReply} from 'types';
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
	comment: IWallPostComment | IWallPostCommentReply;
	onCommentLike: () => void;
	onCommentReply: (startReply: boolean) => void;
	onCommentDelete: () => void;
	isReply?: boolean;
	onViewUserProfile: (userId: string) => void;
}

export interface ICommentCardState {
	animating: boolean;
	touchDisabled: boolean;
	likedByMe: boolean;
	numberOfLikes: number;
}

export class CommentCard extends React.Component<ICommentCardProps, ICommentCardState> {
	public static getDerivedStateFromProps(nextProps: ICommentCardProps, prevState: ICommentCardState) {
		const ret: Partial<ICommentCardState> = {};
		if (nextProps.comment.likedByMe !== prevState.likedByMe) {
			ret.animating = false;
		}
		return ret;
	}

	public state = {
		animating: false,
		touchDisabled: false,
		likedByMe: this.props.comment.likedByMe,
		numberOfLikes: this.props.comment.numberOfLikes,
	};

	private animatedText: any | null = null;

	public render() {
		const {comment} = this.props;
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
							<Text style={style.commentText}>{comment.text}</Text>
						</View>
						{this.renderLikes()}
					</View>
					<View style={style.actionsContainer}>
						<Text style={style.timestamp}>{commentTimestamp}</Text>
						<TouchableOpacity onPress={this.onCommentLikeHandler} disabled={this.state.touchDisabled}>
							<AnimatedText ref={(ref: any) => (this.animatedText = ref)} style={style.actionButtonText}>
								{this.state.likedByMe ? 'Unlike' : 'Like'}
							</AnimatedText>
						</TouchableOpacity>
						{this.renderReplyButton()}
					</View>
					{this.renderReplies()}
				</View>
			</View>
		);
	}

	// todo @serkan @jake these should all be separate components
	private renderReply = (reply: IWallPostCommentReply, index: number) => {
		return (
			<View style={style.replyEntry} key={index}>
				<TouchableOpacity style={style.replyUserContainer} onPress={() => this.props.onViewUserProfile(reply.user.id)}>
					<AvatarImage image={{uri: reply.user.avatarURL}} style={style.replyAvatar} />
					<Text numberOfLines={1} style={style.replyUserFullName}>
						{reply.user.fullName}
					</Text>
				</TouchableOpacity>
				<Text numberOfLines={1} style={style.replyText} onPress={() => this.props.onCommentReply(false)}>
					{reply.text}
				</Text>
			</View>
		);
	};

	// todo @serkan @jake these should all be separate components
	private renderReplies = () => {
		if (!this.props.isReply) {
			const replies = (this.props.comment as IWallPostComment).replies;
			if (!replies) {
				return <View />;
			}
			if (replies.length > 3) {
				const lastReply = replies[replies.length - 1];
				return (
					<View>
						<TouchableOpacity onPress={() => this.props.onCommentReply(false)}>
							<Text style={style.viewMoreReplies}>{`View ${replies.length - 1} more replies`}</Text>
						</TouchableOpacity>
						{this.renderReply(lastReply, 0)}
					</View>
				);
			} else if (replies.length > 0) {
				return <View>{replies.map((reply, index) => this.renderReply(reply, index))}</View>;
			}
		}
		return null;
	};

	// todo @serkan @jake these should all be separate components
	private renderLikes = () => {
		if (this.state.numberOfLikes > 0) {
			return (
				<View style={style.likesContainer}>
					<View style={style.likesBorder}>
						<Icon
							name={'md-thumbs-up'}
							size={Sizes.smartHorizontalScale(25)}
							color={this.state.likedByMe ? Colors.pink : Colors.fuchsiaBlue}
						/>
						<Text style={style.numberOfLikes}>{this.state.numberOfLikes}</Text>
					</View>
				</View>
			);
		}
		return null;
	};

	// todo @serkan @jake these should all be separate components
	private renderReplyButton = () => {
		if (!this.props.isReply) {
			return (
				<TouchableOpacity onPress={() => this.props.onCommentReply(true)}>
					<Text style={style.actionButtonText}>{'Reply'}</Text>
				</TouchableOpacity>
			);
		}
		return null;
	};

	private onCommentLikeHandler = () => {
		this.animatedText.animate('pulsate', PULSATE_PERIOD).then(this.onAnimationEndHandler);
		this.setState({
			animating: true,
			touchDisabled: true,
		});
		this.props.onCommentLike();
	};

	private onAnimationEndHandler = () => {
		if (this.state.animating) {
			this.animatedText.animate('pulsate', PULSATE_PERIOD).then(this.onAnimationEndHandler);
		} else {
			this.setState({
				likedByMe: this.props.comment.likedByMe,
				numberOfLikes: this.props.comment.numberOfLikes,
				touchDisabled: false,
			});
		}
	};
}
