import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {connect} from 'react-redux';
import RepliesScreenComponent from './screen';

import {commentHoc, getCommentsHoc, likeCommentHoc, removeCommentLikeHoc} from 'backend/graphql';

import {IComments, ICommentsResponse, IUserQuery} from 'types';
import {IWallPostCommentReply} from '../index';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';

import {getUserAvatar} from 'utilities';

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
	noReplies: boolean;
	loading: boolean;
}

class RepliesScreen extends Component<IRepliesScreenProps, IRepliesScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'Replies',
		headerRight: <View />,
	};

	public state = {
		replies: [],
		noReplies: false,
		loading: true,
	};

	public async componentDidMount() {
		await this.preFetchComments();
	}

	public render() {
		const {replies} = this.state;
		return (
			<RepliesScreenComponent
				isLoading={this.state.loading}
				noReplies={this.state.noReplies}
				replies={replies}
				startReply={this.props.navigation.state.params.startReply}
				onReplyLike={this.onReplyLikeHandler}
				onSendReply={this.onSendReplyHandler}
				onReplyDelete={this.onReplyDeleteHandler}
				onReplyComment={this.onCommentReplyHandler}
			/>
		);
	}

	private onReplyLikeHandler = async (comment: IWallPostCommentReply) => {
		const {likeComment, removeCommentLike} = this.props;

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
	};

	private onReplyDeleteHandler = (reply: IWallPostCommentReply) => {
		// console.log('TODO: onReplyDeleteHandler', reply.id);
	};

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
	};

	private onCommentReplyHandler = (comment: IWallPostComment, startReply: boolean) => {
		const {userId} = this.props.navigation.state.params;
		this.props.navigation.navigate('RepliesScreen', {commentId: comment.id, startReply, userId});
	};

	private loadMoreComments = (comments: IComments[]): IWallPostCommentReply[] => {
		const userId = this.props.navigation.state.params.userId;
		return comments.map((comment: IComments) => {
			const userAvatar = getUserAvatar(comment.owner);
			return {
				id: comment.id,
				text: comment.text,
				user: {
					fullName: comment.owner.name,
					avatarURL: userAvatar,
					id: comment.id,
				},
				timestamp: new Date(parseInt(comment.createdAt, 10) * 1000),
				numberOfLikes: comment.likes ? comment.likes.length : 0,
				likes: comment.likes,
				replies: comment.comments ? this.loadMoreComments(comment.comments) : [],
				likedByMe: comment.likes.some((x: IUserQuery) => x.userId === userId),
			};
		});
	};

	private preFetchComments = async () => {
		const commentId = this.props.navigation.state.params.commentId;
		const userId = this.props.navigation.state.params.userId;
		const {getComments} = this.props;

		const qVar = {variables: {targetComment: commentId}};
		try {
			const getResp: ICommentsResponse = await getComments(qVar);

			if (getResp.data.getComments.length <= 0) {
				this.setState({noReplies: true, loading: false});
				return;
			}

			const comments: IComments[] = getResp.data.getComments;
			const resComments: IWallPostCommentReply[] = this.loadMoreComments(comments);

			this.setState({
				noReplies: resComments.length === 0,
				loading: false,
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
			this.setState({noReplies: true, loading: false});
			console.log(ex);
		}
	};
}

const MapDispatchToProps = (dispatch: any) => ({
	loadCommenting: () => dispatch(showActivityIndicator('Submitting comment..')),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(
	null,
	MapDispatchToProps,
)(RepliesScreen as any);

const getCommentsWrapper = getCommentsHoc(reduxWrapper);
const commentWrapper = commentHoc(getCommentsWrapper);
const likeWrapper = likeCommentHoc(commentWrapper);
const removeLikeWrapper = removeCommentLikeHoc(likeWrapper);

export default removeLikeWrapper;
