import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {connect} from 'react-redux';
import RepliesScreenComponent from './screen';

import {commentHoc, getCommentsHoc, likeCommentHoc, removeCommentLikeHoc} from 'backend/graphql';

import {IComments, ICommentsResponse} from 'types';
import {IWallPostCommentReply} from '../index';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';

import {ipfsConfig as base} from 'configuration';
import {AvatarImagePlaceholder} from 'consts';

interface IRepliesScreenProps {
	navigation: NavigationScreenProp<any>;

	getComments: any;
	comment: any;

	likeComment: any;
	removeCommentLike: any;

	loadCommenting: () => void;
	hideLoader: () => void;
}

interface IRepliesScreenState {
	replies: IWallPostCommentReply[];
}

class RepliesScreen extends Component<IRepliesScreenProps, IRepliesScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'Replies',
		headerRight: <View />,
	};

	public state = {
		replies: [],
	};

	public async componentDidMount() {
		await this.preFetchComments();
	}

	public render() {
		const {replies} = this.state;
		return (
			<RepliesScreenComponent
				replies={replies}
				startReply={this.props.navigation.state.params.startReply}
				onReplyLike={this.onReplyLikeHandler}
				onSendReply={this.onSendReplyHandler}
				onReplyDelete={this.onReplyDeleteHandler}
			/>
		);
	}

	private onReplyLikeHandler = async (comment: IWallPostCommentReply) => {
		const {likeComment, removeCommentLike} = this.props;

		console.log('cmt', comment);
		const mVar = {variables: {commentId: comment.id}};
		try {
			if (comment.likedByMe) {
				await removeCommentLike(mVar);
			} else {
				await likeComment(mVar);
			}
			await this.preFetchComments();
		} catch (ex) {
			console.log(ex);
		}
	}

	private onReplyDeleteHandler = (reply: IWallPostCommentReply) => {
		// console.log('TODO: onReplyDeleteHandler', reply.id);
	}

	private onSendReplyHandler = async (replyText: string) => {
		const {loadCommenting, hideLoader, comment, navigation} = this.props;
		const commentId = navigation.state.params.commentId;

		const mVar = {variables: {targetComment: commentId, text: replyText}};
		loadCommenting();
		try {
			await comment(mVar);
			await this.preFetchComments();
		} catch (ex) {
			console.log(ex);
		}
		hideLoader();
		// console.log('onSendReplyHandler', replyText);
	}

	private preFetchComments = async () => {
		const commentId = this.props.navigation.state.params.commentId;
		const userId = this.props.navigation.state.params.userId;
		const {getComments} = this.props;

		const qVar = {variables: {targetComment: commentId}};
		try {
			const getResp: ICommentsResponse = await getComments(qVar);

			if (getResp.data.getComments.length <= 0) {
				return;
			}

			const comments: IComments[] = getResp.data.getComments;
			const resComments: IWallPostCommentReply[] = [];

			for (let i = 0; i < comments.length; i++) {
				const currentComment = comments[i];
				const commentOwnerAv = currentComment.owner.avatar
					? base.ipfs_URL + currentComment.owner.avatar.hash
					: AvatarImagePlaceholder;

				resComments.push({
					id: currentComment.id,
					text: currentComment.text,
					user: {
						fullName: currentComment.owner.name,
						avatarURL: commentOwnerAv,
						id: currentComment.owner.userId,
					},
					timestamp: new Date(parseInt(currentComment.createdAt, 10) * 1000),
					likes: currentComment.likes,
					numberOfLikes: currentComment.likes.length,
					likedByMe: currentComment.likes.find((x) => x.userId === userId) ? true : false,
				});
			}

			this.setState({
				replies: resComments.sort((a: any, b: any) => {
					if (a.numberOfLikes > 0 || b.numberOfLikes > 0) {
						a = a.numberOfLikes;
						b = b.numberOfLikes;
						return a > b ? -1 : a < b ? 1 : 0;
					}
					a = a.timestamp;
					b = b.timestamp;
					return a > b ? -1 : a < b ? 1 : 0;
				}),
			});
		} catch (ex) {
			return;
		}
	}
}

const MapDispatchToProps = (dispatch: any) => ({
	loadCommenting: () => dispatch(showActivityIndicator('Submitting comment..')),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(null, MapDispatchToProps)(RepliesScreen as any);

const getCommentsWrapper = getCommentsHoc(reduxWrapper);
const commentWrapper = commentHoc(getCommentsWrapper);
const likeWrapper = likeCommentHoc(commentWrapper);
const removeLikeWrapper = removeCommentLikeHoc(likeWrapper);

export default removeLikeWrapper;
