import React, {Component} from 'react';
import {InteractionManager, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {decodeBase64Text, getUserAvatar, updateSortedComments} from 'utilities';
import CommentsScreenComponent from './screen';

import {commentHoc, getCommentsHoc, likeCommentHoc, removeCommentLikeHoc, userHoc} from 'backend/graphql';

import {
	CommentsSortingOptions,
	IComments,
	ICommentsResponse,
	IUserDataResponse,
	IUserQuery,
	IWallPostComment,
} from 'types';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {HeaderRight} from './HeaderRight';

export interface IWallPostCommentsState {
	allComments: IWallPostComment[];
	noComments: boolean;
	loading: boolean;
	sortOption: CommentsSortingOptions;
}

export interface IWallPostCommentsProps {
	navigation: NavigationScreenProp<any>;
	getComments: any;
	comment: any;

	likeComment: any;
	removeCommentLike: any;

	commentingLoader: () => void;
	hideLoader: () => void;

	data: IUserDataResponse;
}

class CommentsScreen extends Component<IWallPostCommentsProps, IWallPostCommentsState> {
	private static navigationOptions = ({navigation}: IWallPostCommentsProps) => ({
		headerRight: (
			<HeaderRight
				sortOption={navigation.state.params.sortOption}
				onValueChange={navigation.state.params.onSelectionChange}
				navigation={navigation}
			/>
		),
		headerLeft: <View />,
	});

	public state = {
		allComments: [],
		noComments: false,
		loading: true,
		sortOption: CommentsSortingOptions.Likes,
	};

	public async componentDidMount() {
		await this.preFetchComments();
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({
				onSelectionChange: this.updateSortingHandler,
				sortOption: this.state.sortOption,
			});
		});
	}

	public render() {
		const {allComments, noComments} = this.state;

		return (
			<CommentsScreenComponent
				isLoading={this.state.loading}
				comments={allComments}
				noComments={noComments}
				onCommentLike={this.onCommentLikeHandler}
				onCommentReply={this.onCommentReplyHandler}
				onCommentSend={this.onCommentSendHandler}
				onCommentDelete={this.onCommentDeleteHandler}
				startComment={this.props.navigation.state.params.startComment}
				onViewUserProfile={this.navigateToUserProfile}
			/>
		);
	}

	private onCommentReplyHandler = (comment: IWallPostComment, startReply: boolean) => {
		const userId = this.props.data.user.userId;
		this.props.navigation.navigate('RepliesScreen', {
			commentId: comment.id,
			startReply,
			userId,
			afterAddReply: this.preFetchComments,
		});
	};

	private onCommentLikeHandler = async (comment: IWallPostComment) => {
		const {likeComment, removeCommentLike} = this.props;
		// TODO: add loading here
		try {
			if (comment.likedByMe) {
				await removeCommentLike({variables: {commentId: comment.id}});
			} else {
				await likeComment({variables: {commentId: comment.id}});
			}
			await this.preFetchComments();
		} catch (ex) {
			console.log(ex);
		}
	};

	private onCommentDeleteHandler = (comment: IWallPostComment) => {
		// console.log('TODO: delete comment with ID', comment.id);
	};

	private loadMoreComments = (comments: IComments[]): IWallPostComment[] => {
		const userId = this.props.data.user.userId;
		return comments.map((comment: IComments) => {
			const userAvatar = getUserAvatar(comment.owner);
			return {
				id: comment.id,
				text: decodeBase64Text(comment.text),
				user: {
					fullName: comment.owner.name,
					avatarURL: userAvatar,
					id: comment.owner.userId,
				},
				timestamp: new Date(parseInt(comment.createdAt, 10) * 1000),
				numberOfLikes: comment.likes ? comment.likes.length : 0,
				likes: comment.likes,
				replies: comment.comments ? this.loadMoreComments(comment.comments) : [],
				likedByMe: comment.likes.some((x: IUserQuery) => x.userId === userId),
			};
		});
	};

	private onCommentSendHandler = async (commentText: string) => {
		const {comment, commentingLoader, hideLoader} = this.props;
		const postId = this.props.navigation.state.params.postId;
		commentingLoader();

		try {
			const mVars = {variables: {targetPost: postId, text: commentText}};
			await comment(mVars);

			await this.preFetchComments();
		} catch (ex) {
			//
			console.log(ex);
		}
		hideLoader();
		// console.log('onCommentSendHandler', commentText);
	};

	private preFetchComments = async () => {
		const {postId, userId} = this.props.navigation.state.params;
		const {getComments, data} = this.props;

		const qVar = {variables: {targetPost: postId}};

		const getResp: ICommentsResponse = await getComments(qVar);

		if (getResp.data.getComments.length <= 0) {
			this.setState({noComments: true, loading: false});
		} else {
			const comments: IComments[] = getResp.data.getComments;

			const resComments: IWallPostComment[] = this.loadMoreComments(comments);

			this.setState({
				noComments: resComments.length === 0,
				loading: false,
				allComments: updateSortedComments(resComments, this.state.sortOption),
			});
		}
	};

	private navigateToUserProfile = (userId: string) => {
		this.props.navigation.navigate('UserProfileScreen', {userId});
	};

	private updateSortingHandler = (value: CommentsSortingOptions) => {
		this.setState({
			sortOption: value,
			allComments: updateSortedComments(this.state.allComments, value),
		});
		this.props.navigation.setParams({
			sortOption: value,
		});
	};
}

const MapDispatchToProps = (dispatch: any) => ({
	commentingLoader: () => dispatch(showActivityIndicator('Submitting your comment')),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(
	null,
	MapDispatchToProps,
)(CommentsScreen as any);

const currentUserDataWrapper = userHoc(reduxWrapper);

const getCommentsWrapper = getCommentsHoc(currentUserDataWrapper);
const commentWrapper = commentHoc(getCommentsWrapper);

const likeCommentWrapper = likeCommentHoc(commentWrapper);
const removeCommentLikeWrapper = removeCommentLikeHoc(likeCommentWrapper);

export default removeCommentLikeWrapper;
