import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {ModalCloseButton} from '../../components/Modals/CloseButton';
import {getRandomImage} from '../../utils';
import CommentsScreenComponent from './screen';

import {commentHoc, getCommentsHoc, likeCommentHoc, removeCommentLikeHoc} from '../../graphql';

import base from '../../config/ipfs';
import {CommentType, IComments, ICommentsResponse, IUserQuery} from '../../types/gql';

import {hideActivityIndicator, showActivityIndicator} from '../../actions';

export interface IWallPostCommentReply {
	id: string;
	text: string;
	user: {
		fullName: string;
		avatarURL?: string;
	};
	timestamp: Date;
	numberOfLikes: number;
	likes: IUserQuery[];
	likedByMe: boolean;
}

export interface IWallPostComment extends IWallPostCommentReply {
	replies: IWallPostCommentReply[];
}

export interface IWallPostCommentsState {
	allComments: IWallPostComment[];
	noComments: boolean;
}

export interface IWallPostCommentsProps {
	navigation: NavigationScreenProp<any>;
	getComments: any;
	comment: any;

	likeComment: any;
	removeCommentLike: any;

	commentingLoader: () => void;
	hideLoader: () => void;
}

class CommentsScreen extends Component<IWallPostCommentsProps, IWallPostCommentsState> {
	private static navigationOptions = (props: IWallPostCommentsProps) => ({
		headerRight: <ModalCloseButton navigation={props.navigation} />,
		headerLeft: <View />,
	})

	public state = {
		allComments: [],
		noComments: false,
	};

	public async componentDidMount() {
		await this.preFetchComments();
	}

	public render() {
		const {allComments, noComments} = this.state;

		if (noComments) {
			// TODO: add a NO_COMMENTS view here
			return (
				<View>
					<Text>No Comments yet ;)</Text>
				</View>
			);
		}

		return (
			<CommentsScreenComponent
				isLoading={allComments.length < 0}
				comments={allComments}
				onCommentLike={this.onCommentLikeHandler}
				onCommentReply={this.onCommentReplyHandler}
				onCommentSend={this.onCommentSendHandler}
			/>
		);
	}

	private onCommentReplyHandler = (comment: IWallPostComment, startReply: boolean) => {
		this.props.navigation.navigate('RepliesScreen', {replies: comment.replies, startReply});
	}

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
	}

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
	}

	private preFetchComments = async () => {
		const {postId, userId} = this.props.navigation.state.params;
		const {getComments} = this.props;

		const qVar = {variables: {targetPost: postId}};

		const getResp: ICommentsResponse = await getComments(qVar);

		if (getResp.data.getComments.length < 0) {
			this.setState({noComments: true});
			return;
		}

		const comments: IComments[] = getResp.data.getComments;
		const resComments: IWallPostComment[] = [];

		for (let i = 0; i < comments.length; i++) {
			const currentComment = comments[i];
			const ownerAv = currentComment.owner.avatar
				? base.ipfs_URL + currentComment.owner.avatar.hash
				: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
			resComments.push({
				id: currentComment.id,
				text: currentComment.text,
				user: {
					fullName: currentComment.owner.name,
					avatarURL: ownerAv,
				},
				timestamp: new Date(currentComment.createdAt),
				numberOfLikes: currentComment.likes.length,
				likes: currentComment.likes,
				replies: [],
				likedByMe: currentComment.likes.find((x) => x.userId === userId) ? true : false,
			});
		}

		this.setState({
			allComments: resComments.sort((a: any, b: any) => {
				if (a.likes.length > 0 || b.likes.length > 0) {
					a = a.likes.length;
					b = b.likes.length;
					return a > b ? -1 : a < b ? 1 : 0;
				}
				a = a.timestamp;
				b = b.timestamp;
				return a > b ? -1 : a < b ? 1 : 0;
			}),
		});
	}
}

const MapDispatchToProps = (dispatch: any) => ({
	commentingLoader: () => dispatch(showActivityIndicator('Submitting your comment')),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(null, MapDispatchToProps)(CommentsScreen as any);

const getCommentsWrapper = getCommentsHoc(reduxWrapper);
const commentWrapper = commentHoc(getCommentsWrapper);

const likeCommentWrapper = likeCommentHoc(commentWrapper);
const removeCommentLikeWrapper = removeCommentLikeHoc(likeCommentWrapper);

export default removeCommentLikeWrapper;
