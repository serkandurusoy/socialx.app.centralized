import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {Clipboard, Platform, StatusBar} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {
	commentHoc,
	getUserProfileHoc,
	likeCommentHoc,
	removeCommentLikeHoc,
	setLikedPostHoc,
	unsetLikedPostHoc,
	userHoc,
} from 'backend/graphql';
import {OS_TYPES} from 'consts';
import {Sizes} from 'theme';
import {CommentsSortingOptions, IComments, IMediaProps, IUserDataResponse, IUserQuery, IWallPostComment} from 'types';
import {
	decodeBase64Text,
	getUserAvatarNew,
	IWithTranslationProps,
	updateSortedComments,
	withTranslations,
} from 'utilities';
import CommentsScreenComponent from './screen';

const COMMENT_WIDTH_THRESHOLD = Sizes.smartHorizontalScale(150);

interface ICommentsScreenNavScreenProps {
	params: {
		commentId?: string; // only available for replies
		postId?: string; // only for main comments screen
		afterAddComment?: () => void; // only available for replies
		startComment: boolean;
		onSelectionChange: any;
		sortOption: CommentsSortingOptions;
		postData: object;
	};
}

interface ICommentsScreenState {
	allComments: IWallPostComment[];
	noComments: boolean;
	loading: boolean;
	sortOption: CommentsSortingOptions;
	requestingLikeMap: any;
	commentText: string;
	showSendButton: boolean;
	commentLikesPosition: object;
}

export interface IWithGetComments {
	getComments: IComments[];
}

interface ICommentsScreenProps extends IWithTranslationProps, IWithGetComments {
	navigation: NavigationScreenProp<ICommentsScreenNavScreenProps>;
	navigationOptions: NavigationScreenConfig<any>;
	comment: any;
	likeComment: any;
	removeCommentLike: any;
	showActivityIndicator: (title: string) => void;
	hideActivityIndicator: () => void;
	data: IUserDataResponse;
	getUserQuery: any;
	setLikedPost: any;
	unsetLikedPost: any;
}

class CommentsScreen extends Component<ICommentsScreenProps, ICommentsScreenState> {
	private static navigationOptions = ({navigation, navigationOptions}: ICommentsScreenProps) => {
		return {
			header: null,
			// title: CommentsScreen.isRepliesScreen(navigation)
			// 	? navigationOptions.getText('replies.screen.title')
			// 	: 'COMMENTS',
			// headerRight: <HeaderRight sortOption={sortOption} onValueChange={onSelectionChange} navigation={navigation} />,
			// headerLeft: CommentsScreen.isRepliesScreen(navigation) ? undefined : <View />,
		};
	};

	private static isRepliesScreen(navigation: NavigationScreenProp<ICommentsScreenNavScreenProps>) {
		return navigation.state.params.commentId !== undefined;
	}

	public state = {
		allComments: [],
		noComments: false,
		loading: true,
		sortOption: CommentsSortingOptions.Likes,
		requestingLikeMap: {},
		commentText: '',
		showSendButton: false,
		commentLikesPosition: {
			bottom: Sizes.smartHorizontalScale(-18),
			right: 0,
		},
	};

	public async componentDidMount() {
		StatusBar.setBarStyle('dark-content', true);
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
		StatusBar.setBarStyle('light-content', true);
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
	}

	public render() {
		const {getText, navigation} = this.props;
		const {postData, sortOption, onSelectionChange} = navigation.state.params;
		const optionsProps = {sortOption, onSelectionChange};
		const {allComments, noComments, requestingLikeMap, commentText, showSendButton, loading} = this.state;

		const noCommentsText = CommentsScreen.isRepliesScreen(navigation)
			? getText('replies.screen.no.comments')
			: getText('comments.screen.no.comments');
		const commentInputPlaceholder = CommentsScreen.isRepliesScreen(navigation)
			? getText('replies.screen.comment.input.placeholder')
			: getText('comments.screen.comment.input.placeholder');

		return (
			<CommentsScreenComponent
				isLoading={loading}
				comments={allComments}
				noComments={noComments}
				onCommentLike={this.onCommentLikeHandler}
				onCommentReply={this.onCommentReplyHandler}
				onCommentSend={this.onCommentSendHandler}
				startComment={navigation.state.params.startComment}
				onViewUserProfile={this.navigateToUserProfile}
				requestingLikeMap={requestingLikeMap}
				onCommentTextChange={this.onCommentTextChangeHandler}
				commentText={commentText}
				showSendButton={showSendButton}
				noCommentsText={noCommentsText}
				commentInputPlaceholder={commentInputPlaceholder}
				onShowOptionsMenu={this.onShowOptionsMenuHandler}
				postData={postData}
				postOwner={this.props.getUserQuery.getUser}
				onCommentsBackPress={this.onCommentsBackPressHandler}
				onImagePress={this.onImagePressHandler}
				onLikePress={this.onLikePressHandler}
				currentUser={this.props.data.user}
				getCommentContainerWidth={this.getCommentContainerWidthHandler}
				commentLikesPosition={this.state.commentLikesPosition}
				optionsProps={optionsProps}
			/>
		);
	}

	private onCommentReplyHandler = (comment: IWallPostComment, startComment: boolean) => {
		this.props.navigation.navigate({
			routeName: 'CommentsScreen',
			key: comment.id,
			params: {
				commentId: comment.id,
				startComment,
				afterAddComment: this.preFetchComments,
			},
		});
	};

	private onCommentLikeHandler = async (comment: IWallPostComment) => {
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

	private onCommentDeleteHandler = (comment: IWallPostComment) => {
		console.log('TODO: delete comment with ID', comment.id);
	};

	private loadMoreComments = (comments: IComments[]): IWallPostComment[] => {
		const userId = this.props.data.user.userId;
		return comments.map((comment: IComments) => ({
			id: comment.id,
			text: decodeBase64Text(comment.text),
			user: {
				fullName: comment.owner.name,
				avatarURL: getUserAvatarNew(comment.owner),
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
		const {
			comment,
			showActivityIndicator: showLoader,
			hideActivityIndicator: hideLoader,
			navigation,
			getText,
		} = this.props;
		const {postId, afterAddComment, commentId} = navigation.state.params;
		showLoader(
			CommentsScreen.isRepliesScreen(navigation)
				? getText('replies.screen.sending.reply')
				: getText('comments.screen.sending.comment'),
		);
		try {
			const escapedComment = this.state.commentText.replace(/\n/g, '\\n');
			const mVars = CommentsScreen.isRepliesScreen(navigation)
				? {targetComment: commentId, text: escapedComment}
				: {targetPost: postId, text: escapedComment};
			await comment({variables: mVars});
			await this.preFetchComments();
			this.setState({
				commentText: '',
				showSendButton: false,
			});
			if (afterAddComment) {
				afterAddComment();
			}
		} catch (ex) {
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

	private onShowOptionsMenuHandler = (comment: IWallPostComment) => {
		const {getText} = this.props;
		// TODO: delete option should be available only for own comments
		const menuOptions = [
			getText('comments.screen.advanced.menu.copy'),
			getText('comments.screen.advanced.menu.delete'),
			getText('button.CANCEL'),
		];
		ActionSheet.show(
			{
				options: menuOptions,
				destructiveButtonIndex: menuOptions.length - 2,
				cancelButtonIndex: menuOptions.length - 1,
			},
			(buttonIndex: number) => {
				if (buttonIndex === 0) {
					Clipboard.setString(comment.text);
				} else if (buttonIndex === 1) {
					this.onCommentDeleteHandler(comment);
				}
			},
		);
	};

	private onCommentsBackPressHandler = () => {
		const {navigation} = this.props;
		navigation.navigate('UserFeedTab');
	};

	private onImagePressHandler = (index: number, medias: IMediaProps[]) => {
		const {navigation} = this.props;
		navigation.navigate('MediaViewerScreen', {
			mediaObjects: medias,
			startIndex: index,
		});
	};

	private onLikePressHandler = async (likedByMe: boolean, likedPostId: string) => {
		const {setLikedPost, unsetLikedPost} = this.props;

		const likeQuery = {variables: {likedPostId}};

		const result = likedByMe ? await unsetLikedPost(likeQuery) : await setLikedPost(likeQuery);

		if (result.error) {
			console.log(result.error);
			return likedByMe;
		}

		return !likedByMe;
	};

	private getCommentContainerWidthHandler = (width: number) => {
		if (width < COMMENT_WIDTH_THRESHOLD) {
			this.setState({
				commentLikesPosition: {
					bottom: Sizes.smartHorizontalScale(10),
					right: Sizes.smartHorizontalScale(-30),
				},
			});
		}
	};
}

export default compose(
	withTranslations,
	removeCommentLikeHoc,
	likeCommentHoc,
	commentHoc,
	userHoc,
	getUserProfileHoc,
	setLikedPostHoc,
	unsetLikedPostHoc,
	connect(
		null,
		{showActivityIndicator, hideActivityIndicator},
	),
)(CommentsScreen as any);
