import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {connect} from 'react-redux';

import {IWallPostCardProp} from 'components/Displayers';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {Icons, Images} from 'theme';
import {MediaObject, NewWallPostData} from '../NewWallPostScreen';
import UserFeedScreenComponent from './screen';

import {
	addMediaHoc,
	createPostHoc,
	deleteOwnPostHoc,
	getAllPostsHoc,
	getUserPostsHoc,
	likePostHoc,
	removeLikePostHoc,
	userHoc,
} from 'backend/graphql';
import {graphql} from 'react-apollo';
import {IAllPostsDataResponse, ICommentsResponse, IPostsProps, IUserDataResponse, IUserQuery} from 'types';
import {CurrentUser} from 'utilities';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';

// import {IBlobData} from '../../lib/ipfs';
import {IBlobData} from 'ipfslib';
import {addBlobFiles} from 'utilities/ipfs';

import {ipfsConfig as base} from 'configuration';

import {ScreenHeaderButton} from 'components/Interaction/ScreenHeaderButton';
import {IWalletActivityScreenComponentProps} from '../WalletActivityScreen/screen';
import {IMediaRec} from './types';

interface IUserFeedScreenProps {
	navigation: NavigationScreenProp<any>;
	data: IUserDataResponse;
	Posts: IAllPostsDataResponse;
	User: IUserDataResponse;
	// TODO: create interface
	createPost: any;
	likePost: any;
	removeLikePost: any;
	addMedia: any;
	startMediaPost: any;
	startPostadd: any;
	deletingPostLoad: any;
	stopLoading: any;
	deletePost: any;
}

interface IUserFeedScreenState {
	allWallPosts: IWallPostCardProp[];
	wallPosts: IWallPostCardProp[];
	refreshing: boolean;
	currentLoad: number;
}

class UserFeedScreen extends Component<IUserFeedScreenProps, IUserFeedScreenState> {
	private static navigationOptions = (props: IUserFeedScreenProps) => ({
		title: 'FEED',
		headerRight: (
			<ScreenHeaderButton
				onPress={() => UserFeedScreen.launchMessagingScreen(props)}
				iconSource={Icons.messagingIcon}
			/>
		),
	})

	private static launchMessagingScreen(props: any) {
		const params = props.navigation.state.params || {};
		if (params.messagingScreenHandler) {
			params.messagingScreenHandler();
		}
	}

	public state = {
		allWallPosts: [],
		wallPosts: [],
		refreshing: false,
		currentLoad: 0,
	};

	public componentWillMount() {
		this.props.navigation.setParams({
			messagingScreenHandler: this.navigateToMessagingScreen,
		});
	}

	public componentWillReceiveProps(nextProps: IUserFeedScreenProps) {
		if (nextProps.Posts.loading || nextProps.data.loading) {
			return;
		}
		if (this.state.wallPosts.length === 0 && nextProps.Posts.allPosts.length > 0) {
			this.loadMorePostsHandler(nextProps);
		}
	}

	// public shouldComponentUpdate(nextProp: IUserFeedScreenProps, nextState: IUserFeedScreenState) {
	// 	if (nextProp.Posts.loading || nextProp.data.loading) {
	// 		return false;
	// 	}
	// 	return true;
	// }

	public render() {
		const {Posts, data} = this.props;
		const isLoading = data.loading || Posts.loading || this.state.wallPosts.length === 0;

		return (
			<UserFeedScreenComponent
				noPosts={!Posts.loading && Posts.allPosts.length === 0}
				isLoading={isLoading}
				currentUser={data.user}
				refreshing={this.state.refreshing}
				refreshData={this.refreshWallPosts}
				avatarImage={this.getAvatarImage()}
				wallPosts={this.state.wallPosts}
				loadMorePosts={this.loadMorePostsHandler}
				addWallPost={this.addWallPostHandler}
				showNewWallPostPage={this.showNewWallPostPage}
				onCommentsButtonClick={this.onCommentsButtonClickHandler}
			/>
		);
	}

	private getAvatarImage = () => {
		let ret = Images.user_avatar_placeholder;
		const {Posts, data} = this.props;
		if (!data.loading && !Posts.loading && data.user.avatar) {
			ret = {uri: base.ipfs_URL + data.user.avatar.hash};
		}
		return ret;
	}

	private getWallPosts = async (nextProps?: IUserFeedScreenProps) => {
		const {data, Posts} = this.props;
		const dataSpine: any[] = [];

		const allPosts = nextProps && nextProps.Posts ? nextProps.Posts.allPosts : Posts.allPosts;

		if (!allPosts || allPosts.length < 0) {
			return dataSpine;
		}

		for (let i = 0; i < allPosts.length; i++) {
			const post: IPostsProps = allPosts[i];
			// TODO: for each media create a Photo handler object to pass on a click / display multiple / etc..
			const media = post.Media
				? post.Media.length > 0 ? base.ipfs_URL + post.Media[0].optimizedHash : undefined
				: undefined;
			const likedByMe = !!post.likes.find((like: IUserQuery) => like.userId === data.user.userId);

			const res: IWallPostCardProp = {
				id: post.id,
				text: post.text,
				location: 'Home',
				smallAvatar: post.owner.avatar
					? base.ipfs_URL + post.owner.avatar.hash
					: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
				imageSource: media,
				// TODO: add (@username) somewhere here? for duplicate friends names, usernames cant be duplicates
				fullName: post.owner.name,
				timestamp: new Date(post.createdAt),
				numberOfLikes: post.likes.length,
				numberOfSuperLikes: 0,
				numberOfComments: post.comments.length,
				numberOfWalletCoins: 0,
				onCommentsButtonClick: () => Alert.alert('click'),
				// TODO: append all media to this with the index of the image
				onImageClick: () => this.onPhotoPressHandler(0, [{url: media, index: 0}]),
				onLikeButtonClick: () => this.onLikeButtonClickHandler(post.id),
				likedByMe,
				canDelete: false,
				owner: post.owner,
				onDeleteClick: this.onPostDeleteClickHandler,
			};
			dataSpine.push(res);
		}

		// sort posts by time desc (most recent)
		return dataSpine.sort((a, b) => {
			a = a.timestamp;
			b = b.timestamp;
			return a > b ? -1 : a < b ? 1 : 0;
		});
	}

	private showNewWallPostPage = () => {
		const avatarUri = this.props.data.user.avatar
			? {uri: base.ipfs_URL + this.props.data.user.avatar.hash}
			: Images.user_avatar_placeholder;
		this.props.navigation.navigate('NewWallPostScreen', {
			fullName: this.props.data.user.name,
			avatarImage: avatarUri,
			postCreate: this.addWallPostHandler,
		});
	}

	private loadMorePostsHandler = async (nextProps?: IUserFeedScreenProps) => {
		const {wallPosts} = this.state;
		const Posts = await this.getWallPosts(nextProps);

		if (Posts.length < 0) {
			return;
		}

		if (wallPosts.length === Posts.length) {
			return;
		}

		let appendRate = Posts.length % 2 === 0 ? 2 : 1;
		const rest: any = [];
		let currentLoadNew = wallPosts.length;

		if (Posts.length < 4) {
			appendRate = Posts.length;
			currentLoadNew = 0;
		}

		for (currentLoadNew; currentLoadNew < wallPosts.length + appendRate; currentLoadNew++) {
			rest.push(Posts[currentLoadNew]);
		}

		this.setState({
			wallPosts: this.state.wallPosts.concat(rest),
		});
	}

	private addWallPostHandler = async (data: NewWallPostData) => {
		const {createPost, addMedia, startMediaPost, startPostadd, stopLoading} = this.props;

		const ipfsHashes: any = [];
		const mediaIds: string[] = [];

		// start creating post loading
		startPostadd();

		try {
			const ipfsData = await addBlobFiles(data.mediaObjects);

			for (let i = 0; i < ipfsData.length; i++) {
				const currentIpfsData = ipfsData[i];
				const gqlResp = await addMedia({
					variables: {
						hash: currentIpfsData.hash,
						type: currentIpfsData.type,
						optimizedHash: currentIpfsData.optimizedHash,
						size: parseInt(currentIpfsData.size, undefined),
					},
				});
				mediaIds.push(gqlResp.data.addMedia.id);

				// create the post with media
				await createPost({
					variables: {
						text: data.text,
						Media: mediaIds,
					},
				});
			}
			// refresh the wall posts to append the new post
			this.refreshWallPosts();
		} catch (ex) {
			//
			console.log('ex from create', ex);
		}

		stopLoading();
	}

	private refreshWallPosts = async () => {
		this.setState({refreshing: true});
		try {
			await this.props.data.refetch();
			await this.props.Posts.refetch();
			this.setState({
				refreshing: false,
				wallPosts: [],
				currentLoad: 0,
			});
			this.loadMorePostsHandler();
		} catch (Ex) {
			this.setState({refreshing: false});
			console.log('ex', Ex);
		}
	}

	private onPhotoPressHandler = (index: number, photos: any) => {
		this.props.navigation.navigate('MediaViewerScreen', {
			photos,
			startIndex: index,
		});
	}

	private onLikeButtonClickHandler = async (postId: string) => {
		const {likePost, removeLikePost} = this.props;
		const {wallPosts} = this.state;

		const post: any = wallPosts.find((p: IWallPostCardProp) => p.id === postId);
		if (!post) {
			return;
		}

		const likeQuery = {variables: {postId: post.id}};

		const result = post.likedByMe ? await removeLikePost(likeQuery) : await likePost(likeQuery);

		if (result.error) {
			console.log(result.error);
			return;
		}

		const {likes} = result.data[post.likedByMe ? 'removelikePost' : 'likePost'];
		// TODO: make better
		this.setState((preveState: IUserFeedScreenState | any) => ({
			wallPosts: preveState.wallPosts.map((p: IWallPostCardProp) => {
				return p.id === post.id ? {...p, numberOfLikes: likes.length, likedByMe: !p.likedByMe} : p;
			}),
		}));
	}

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
	}

	private onCommentsButtonClickHandler = async (wallPostData: IWallPostCardProp) => {
		this.props.navigation.navigate('CommentsStack', {postId: wallPostData.id, userId: this.props.data.user.userId});
	}

	private navigateToMessagingScreen = () => {
		this.props.navigation.navigate('MessagingScreen');
	}
}

const MapDispatchToProps = (dispatch: any) => ({
	startMediaPost: () => dispatch(showActivityIndicator('Decentralizing your media', 'Please wait..')),
	deletingPostLoad: () => dispatch(showActivityIndicator('Removing your post..')),
	startPostadd: () => dispatch(showActivityIndicator('Creating your post', 'finalizing post..')),
	stopLoading: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(null, MapDispatchToProps)(UserFeedScreen);

const userWrapper = userHoc(reduxWrapper);
const allPostsWrapper = getAllPostsHoc(userWrapper);
const createPostWrapper = createPostHoc(allPostsWrapper);
const addMediaWrapper = addMediaHoc(createPostWrapper);
const likePostWrapper = likePostHoc(addMediaWrapper);
const removeLikePostWrapper = removeLikePostHoc(likePostWrapper);
const deletePostWrapper = deleteOwnPostHoc(removeLikePostWrapper);

export default deletePostWrapper;
