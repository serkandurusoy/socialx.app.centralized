import React, {Component} from 'react';
import {Dimensions, Platform} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';

import {
	addMediaHoc,
	createPostHoc,
	deleteOwnPostHoc,
	setLikedPostHoc,
	unsetLikedPostHoc,
	userHoc,
} from 'backend/graphql';
import {IWallPostCardProp} from 'components';
import {Images} from 'theme';
import {NewWallPostData} from '../NewWallPostScreen';
import UserFeedScreenComponent from './screen';

import {IMediaProps, IUserDataResponse} from 'types';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';

import {ipfsConfig as base} from 'configuration';
import {OS_TYPES} from 'consts';
import {MOCK_SUGGESTED} from 'utilities';

import {SHARE_SECTION_HEIGHT} from './style';

const AVAILABLE_SCREEN_HEIGHT = Dimensions.get('window').height;
const TOTAL_SCREEN_HEIGHT = Dimensions.get('screen').height;
const SUGGESTIONS_POSTS_INTERVAL = 20;
let SUGGESTIONS_MULTIPLIER = 1;

export interface IFeedProps {
	shareSectionPlaceholder: string | null;
}

interface IUserFeedScreenProps extends IFeedProps {
	data: IUserDataResponse;
	User: IUserDataResponse;
	// TODO: create interface
	createPost: any;
	setLikedPost: any;
	unsetLikedPost: any;
	addMedia: any;
	startMediaPost: any;
	startPostadd: any;
	deletingPostLoad: any;
	stopLoading: any;
	deletePost: any;
	loading: boolean;
	Items: any;
	refresh: () => void;
	nextToken: string | null;
	noPosts: boolean;
	loadMore: () => any;
	hasMore: boolean;
	navigation: NavigationScreenProp<any>;
}

interface IUserFeedScreenState {
	refreshing: boolean;
	loadingMore: boolean;
}

class UserFeedScreen extends Component<IUserFeedScreenProps, IUserFeedScreenState> {
	public state = {
		refreshing: false,
		loadingMore: false,
	};

	public render() {
		const {data, loading, noPosts, Items, hasMore} = this.props;

		// Temporary, the backend should send all the data
		if (Items && Items.length > SUGGESTIONS_MULTIPLIER * SUGGESTIONS_POSTS_INTERVAL) {
			Items.map((item: IWallPostCardProp, index: number) => {
				if (index === SUGGESTIONS_MULTIPLIER * SUGGESTIONS_POSTS_INTERVAL && !item.suggested) {
					item.suggested = MOCK_SUGGESTED;
					return item;
				}
				return item;
			});
			SUGGESTIONS_MULTIPLIER++;
		}

		return (
			<UserFeedScreenComponent
				noPosts={noPosts}
				isLoading={loading || data.loading}
				loadingMore={this.state.loadingMore}
				hasMore={hasMore}
				currentUser={data.user}
				refreshing={this.state.refreshing}
				refreshData={this.refreshWallPosts}
				avatarImage={this.getAvatarImage()}
				wallPosts={Items}
				loadMorePosts={this.onLoadMore}
				addWallPost={this.addWallPostHandler}
				showNewWallPostPage={this.showNewWallPostPage}
				shareSectionPlaceholder={this.props.shareSectionPlaceholder}
				onLikePress={this.onLikeButtonClickHandler}
				onPostDeletePress={this.onPostDeleteClickHandler}
				onUserPress={this.gotoUserProfile}
				onMediaPress={this.onMediaObjectPressHandler}
				onCommentPress={this.onCommentsButtonClickHandler}
				onAddCommentPress={this.onAddCommentPressHandler}
				listLoading={this.isLoading()}
			/>
		);
	}

	private isRefreshing = () => {
		return this.state.refreshing;
	};

	private isLoading = () => {
		return this.state.refreshing || this.state.loadingMore;
	};

	private onLoadMore = async () => {
		if (!this.state.loadingMore) {
			const {loadMore} = this.props;
			try {
				this.setState({
					loadingMore: true,
				});
				await loadMore();
				this.setState({
					loadingMore: false,
				});
			} catch (ex) {
				console.log(ex);
				this.setState({
					loadingMore: false,
				});
			}
		}
	};

	private getAvatarImage = () => {
		let ret = Images.user_avatar_placeholder;
		const {data} = this.props;
		if (!data.loading) {
			const avatarHash = data ? (data.user.avatar ? data.user.avatar.hash : null) : null;
			if (avatarHash) {
				ret = {uri: base.ipfs_URL + avatarHash};
			}
		}
		return ret;
	};

	private showNewWallPostPage = () => {
		const {data} = this.props;
		this.props.navigation.navigate('NewWallPostScreen', {
			fullName: data ? data.user.name : '',
			avatarImage: this.getAvatarImage(),
			postCreate: this.addWallPostHandler,
		});
	};

	private create = async (Media: string[], text?: string) => {
		const {createPost} = this.props;
		if (Media.length > 0) {
			if (text) {
				await createPost({
					variables: {
						text,
						Media,
					},
				});
			} else {
				await createPost({
					variables: {
						Media,
					},
				});
			}
		} else {
			await createPost({
				variables: {
					text,
				},
			});
		}
	};

	private addWallPostHandler = async (data: NewWallPostData) => {
		const {addMedia, startPostadd, stopLoading} = this.props;
		const mediaIds: string[] = [];

		// start creating post loading
		startPostadd();

		// todo @serkan @jake let's discuss parallel/series async execution
		// for await of vs await Promise.all
		try {
			for (let i = 0; i < data.mediaObjects.length; i++) {
				const currentData = data.mediaObjects[i];
				const gqlResp = await addMedia({
					variables: {
						hash: currentData.content.Hash,
						type: currentData.content.Name.split('.')[1],
						optimizedHash: currentData.contentOptimized ? currentData.contentOptimized.Hash : currentData.content.Hash,
						size: parseInt(currentData.content.Size, undefined),
					},
				});
				mediaIds.push(gqlResp.data.addMedia.id);
			}
			await this.create(mediaIds, data.text);
			// refresh the wall posts to append the new post
			this.refreshWallPosts();
		} catch (ex) {
			//
			console.log('ex from create', ex);
		}

		stopLoading();
	};

	private refreshWallPosts = async () => {
		if (!this.isRefreshing()) {
			this.setState({refreshing: true});
			try {
				await this.props.data.refetch();
				await this.props.refresh();
				this.setState({
					refreshing: false,
				});
			} catch (Ex) {
				this.setState({refreshing: false});
				console.log('ex', Ex);
			}
		}
	};

	private onLikeButtonClickHandler = async (likedByMe: boolean, likedPostId: string) => {
		const {setLikedPost, unsetLikedPost} = this.props;

		const likeQuery = {variables: {likedPostId}};

		const result = likedByMe ? await unsetLikedPost(likeQuery) : await setLikedPost(likeQuery);
		console.log('onLikeButtonClickHandler result:', result);

		if (result.error) {
			console.log(result.error);
			return likedByMe;
		}

		// await refresh();

		return !likedByMe;
	};

	private onPostDeleteClickHandler = async (postId: string) => {
		const {deletingPostLoad, deletePost, stopLoading} = this.props;

		deletingPostLoad();
		try {
			const mVar = {variables: {postId}};
			await deletePost(mVar);
			await this.refreshWallPosts();
		} catch (ex) {
			// user doesnt own the post, thus cant delete, or server issues
		}
		stopLoading();
	};

	private gotoUserProfile = (userId: string) => {
		this.props.navigation.navigate('UserProfileScreen', {userId});
	};

	private onMediaObjectPressHandler = (index: number, medias: IMediaProps[]) => {
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects: medias,
			startIndex: index,
		});
	};

	private onCommentsButtonClickHandler = (postId: any, userId: any, startComment: boolean, postData: object) => {
		this.props.navigation.navigate('CommentsStack', {postId, userId, startComment, postData});
	};

	private onAddCommentPressHandler = (scrollRef: any, index: number, cardHeight: number) => {
		if (!this.isLoading()) {
			scrollRef.current.scrollToIndex({
				animated: true,
				index,
				viewOffset: this.calculateScrollOffset(cardHeight, index),
				viewPosition: 0,
			});
		}
	};

	private calculateScrollOffset = (cardHeight: number, index: number) => {
		const baseScreenHeight = 667;
		let idealOffset;
		let idealCardHeight;
		let diff;
		if (AVAILABLE_SCREEN_HEIGHT >= 667) {
			if (index === 0 && cardHeight < 300) {
				return 0;
			}

			idealOffset = 235;
			idealCardHeight = 490;
			diff = idealCardHeight - cardHeight;
		} else {
			idealOffset = 265;
			idealCardHeight = 480;
			diff = idealCardHeight - cardHeight;
		}
		const offset = (baseScreenHeight * idealOffset) / AVAILABLE_SCREEN_HEIGHT;

		if (Platform.OS === OS_TYPES.Android) {
			const softwareButtonsBarHeight = TOTAL_SCREEN_HEIGHT - AVAILABLE_SCREEN_HEIGHT;
			return -(offset - diff + softwareButtonsBarHeight);
		}

		return -(offset - diff - SHARE_SECTION_HEIGHT);
	};
}

const MapDispatchToProps = (dispatch: any) => ({
	startMediaPost: () => dispatch(showActivityIndicator('Decentralizing your media', 'Please wait..')),
	deletingPostLoad: () => dispatch(showActivityIndicator('Removing your post..')),
	startPostadd: () => dispatch(showActivityIndicator('Creating your post', 'finalizing post..')),
	stopLoading: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(
	null,
	MapDispatchToProps,
)(UserFeedScreen);

const userWrapper = userHoc(reduxWrapper);
const createPostWrapper = createPostHoc(userWrapper);
const addMediaWrapper = addMediaHoc(createPostWrapper);
const likePostWrapper = setLikedPostHoc(addMediaWrapper);
const removeLikePostWrapper = unsetLikedPostHoc(likePostWrapper);
const deletePostWrapper = deleteOwnPostHoc(removeLikePostWrapper);

export default deletePostWrapper;
