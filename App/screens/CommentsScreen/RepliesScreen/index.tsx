import React, {Component} from 'react';
import {InteractionManager} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {commentHoc, getCommentsHoc, likeCommentHoc, removeCommentLikeHoc} from 'backend/graphql';
import {
	CommentsSortingOptions,
	IComments,
	ICommentsResponse,
	IUserQuery,
	IWallPostComment,
	IWallPostCommentReply,
} from 'types';
import {
	decodeBase64Text,
	getUserAvatar,
	IWithTranslationProps,
	updateSortedComments,
	withTranslations,
} from 'utilities';
import {HeaderRight} from '../components/HeaderRight';
import RepliesScreenComponent from './../screen';

// TODO: @ionut: this should be removed and only use CommentsScreen/index.tsx

// TODO @jake @serkan too much async work being done in components, these should all be moved out into
// a data api, which can be redux or some other state manager, the current app architecture makes everything
// too tightly coupled, furthermore causes setState to be potentially called on unmounted components
// which is a primate candidate for memory leaks

interface IRepliesScreenNavScreenProps {
	params: {
		commentId: string;
		afterAddReply: () => void;
		startReply: boolean;
		userId: string;
	};
}

interface IRepliesScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<IRepliesScreenNavScreenProps>;

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
	sortOption: CommentsSortingOptions;
	requestingLikeMap: any;
	commentText: string;
	showSendButton: boolean;
}

class RepliesScreen extends Component<IRepliesScreenProps, IRepliesScreenState> {
	private static navigationOptions = ({navigation}: IRepliesScreenProps) => ({
		title: 'Replies',
		headerRight: (
			<HeaderRight
				sortOption={navigation.state.params.sortOption}
				onValueChange={navigation.state.params.onSelectionChange}
				navigation={navigation}
			/>
		),
	});

	public state = {
		replies: [],
		noReplies: false,
		loading: true,
		sortOption: CommentsSortingOptions.Likes,
		requestingLikeMap: {},
		commentText: '',
		showSendButton: false,
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
		const {getText} = this.props;
		const {replies, commentText, showSendButton, requestingLikeMap} = this.state;
		return (
			<RepliesScreenComponent
				isLoading={this.state.loading}
				comments={replies}
				noComments={this.state.noReplies}
				onCommentLike={this.onReplyLikeHandler}
				onCommentReply={this.onCommentReplyHandler}
				onCommentSend={this.onSendReplyHandler}
				onCommentDelete={this.onReplyDeleteHandler}
				startComment={this.props.navigation.state.params.startReply}
				onViewUserProfile={this.navigateToUserProfile}
				requestingLikeMap={requestingLikeMap}
				onCommentTextChange={this.onCommentTextChangeHandler}
				commentText={commentText}
				showSendButton={showSendButton}
				noCommentsText={getText('replies.screen.no.comments')}
				commentInputPlaceholder={getText('replies.screen.comment.input.placeholder')}
			/>
		);
	}

	private onReplyLikeHandler = async (comment: IWallPostCommentReply) => {
		const {likeComment, removeCommentLike} = this.props;

		this.setState({
			requestingLikeMap: {...this.state.requestingLikeMap, [comment.id]: true},
		});

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
		const {[comment.id]: cId, ...newRequestingLikeMap} = this.state.requestingLikeMap;
		this.setState({
			requestingLikeMap: newRequestingLikeMap,
		});
	};

	private onReplyDeleteHandler = (reply: IWallPostCommentReply) => {
		// console.log('TODO: onReplyDeleteHandler', reply.id);
	};

	private onSendReplyHandler = async () => {
		const {loadCommenting, hideLoader, comment, navigation} = this.props;
		const {commentId, afterAddReply} = navigation.state.params;

		const escapedComment = this.state.commentText.replace(/\n/g, '\\n');
		const mVar = {variables: {targetComment: commentId, text: escapedComment}};
		loadCommenting();
		try {
			await comment(mVar);
			await this.preFetchComments();
			this.setState({
				commentText: '',
				showSendButton: false,
			});
			afterAddReply();
		} catch (ex) {
			console.log(ex);
		}
		hideLoader();
		// console.log('onSendReplyHandler', replyText);
	};

	private onCommentReplyHandler = (comment: IWallPostComment, startReply: boolean) => {
		const {userId} = this.props.navigation.state.params;
		// TODO: check why this doesn't work?
		this.props.navigation.navigate('RepliesScreen', {
			commentId: comment.id,
			startReply,
			userId,
			afterAddReply: this.preFetchComments,
		});
	};

	private loadMoreComments = (comments: IComments[]): IWallPostCommentReply[] => {
		const userId = this.props.navigation.state.params.userId;
		return comments.map((comment: IComments) => ({
			id: comment.id,
			text: decodeBase64Text(comment.text),
			user: {
				fullName: comment.owner.name,
				avatarURL: getUserAvatar(comment.owner),
				id: comment.owner.userId,
			},
			timestamp: new Date(parseInt(comment.createdAt, 10) * 1000),
			numberOfLikes: comment.likes ? comment.likes.length : 0,
			likes: comment.likes,
			replies: comment.comments ? this.loadMoreComments(comment.comments) : [],
			likedByMe: comment.likes.some((x: IUserQuery) => x.userId === userId),
		}));
	};

	private preFetchComments = async () => {
		const {commentId} = this.props.navigation.state.params;
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
				replies: updateSortedComments(resComments, this.state.sortOption),
			});
		} catch (ex) {
			this.setState({noReplies: true, loading: false});
			console.log(ex);
		}
	};

	private navigateToUserProfile = (userId: string) => {
		this.props.navigation.navigate('UserProfileScreen', {userId});
	};

	private updateSortingHandler = (value: CommentsSortingOptions) => {
		this.setState({
			sortOption: value,
			replies: updateSortedComments(this.state.replies, value),
		});
		this.props.navigation.setParams({
			sortOption: value,
		});
	};

	private onCommentTextChangeHandler = (value: string) => {
		this.setState({
			showSendButton: value !== '',
			commentText: value,
		});
	};
}

const MapDispatchToProps = (dispatch: any) => ({
	loadCommenting: () => dispatch(showActivityIndicator('Submitting comment..')),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

export default compose(
	withTranslations,
	removeCommentLikeHoc,
	likeCommentHoc,
	commentHoc,
	getCommentsHoc,
	connect(
		null,
		MapDispatchToProps,
	),
)(RepliesScreen as any);
