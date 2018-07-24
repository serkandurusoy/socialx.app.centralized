import React, {Component} from 'react';
import {Platform, View} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {commentHoc, likeCommentHoc, removeCommentLikeHoc, userHoc} from 'backend/graphql';
import {OS_TYPES} from 'consts';
import {
	CommentsSortingOptions,
	IComments,
	ICommentsResponse,
	IUserDataResponse,
	IUserQuery,
	IWallPostComment,
} from 'types';
import {
	decodeBase64Text,
	getUserAvatar,
	IWithTranslationProps,
	updateSortedComments,
	withTranslations,
} from 'utilities';
import {HeaderRight} from './components/HeaderRight';
import CommentsScreenComponent from './screen';

export interface IWallPostCommentsState {
	allComments: IWallPostComment[];
	noComments: boolean;
	loading: boolean;
	sortOption: CommentsSortingOptions;
	requestingLikeMap: any;
	commentText: string;
	showSendButton: boolean;
}

export interface IWithGetComments {
	getComments: IComments[];
}

export interface IWallPostCommentsProps extends IWithTranslationProps, IWithGetComments {
	navigation: NavigationScreenProp<any>;
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
		requestingLikeMap: {},
		commentText: '',
		showSendButton: false,
	};

	public async componentDidMount() {
		this.props.navigation.setParams({
			onSelectionChange: this.updateSortingHandler,
			sortOption: this.state.sortOption,
		});
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustResize();
		}
		await this.preFetchComments();
	}

	public componentWillUnmount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
	}

	public render() {
		const {getText} = this.props;
		const {allComments, noComments, requestingLikeMap, commentText, showSendButton} = this.state;

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
				requestingLikeMap={requestingLikeMap}
				onCommentTextChange={this.onCommentTextChangeHandler}
				commentText={commentText}
				showSendButton={showSendButton}
				noCommentsText={getText('comments.screen.no.comments')}
				commentInputPlaceholder={getText('comments.screen.comment.input.placeholder')}
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

	private onCommentDeleteHandler = (comment: IWallPostComment) => {
		// console.log('TODO: delete comment with ID', comment.id);
	};

	private loadMoreComments = (comments: IComments[]): IWallPostComment[] => {
		const userId = this.props.data.user.userId;
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

	private onCommentSendHandler = async () => {
		const {comment, commentingLoader, hideLoader} = this.props;
		const postId = this.props.navigation.state.params.postId;
		commentingLoader();

		try {
			const escapedComment = this.state.commentText.replace(/\n/g, '\\n');
			const mVars = {variables: {targetPost: postId, text: escapedComment}};
			await comment(mVars);
			await this.preFetchComments();
			this.setState({
				commentText: '',
				showSendButton: false,
			});
		} catch (ex) {
			//
			console.log(ex);
		}
		hideLoader();
	};

	private preFetchComments = async () => {
		const {postId, userId} = this.props.navigation.state.params;
		const {getComments, data} = this.props;

		await new Promise((resolve) => setTimeout(resolve, 1500));

		const resComments: IWallPostComment[] = this.loadMoreComments(getComments);

		this.setState({
			noComments: resComments.length === 0,
			loading: false,
			allComments: updateSortedComments(resComments, this.state.sortOption),
		});
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

	private onCommentTextChangeHandler = (value: string) => {
		this.setState({
			showSendButton: value !== '',
			commentText: value,
		});
	};
}

const MapDispatchToProps = (dispatch: any, {getText}: IWallPostCommentsProps) => ({
	commentingLoader: () => dispatch(showActivityIndicator(getText('comments.screen.sending.comment'))),
	hideLoader: () => dispatch(hideActivityIndicator()),
});

export default compose(
	withTranslations,
	removeCommentLikeHoc,
	likeCommentHoc,
	commentHoc,
	userHoc,
	connect(
		null,
		MapDispatchToProps,
	),
)(CommentsScreen as any);
