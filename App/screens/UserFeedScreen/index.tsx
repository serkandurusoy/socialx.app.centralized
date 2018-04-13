import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {connect} from 'react-redux';

import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {IWallPostCardProp} from '../../components/Displayers';
import {Images} from '../../theme';
import {MediaObject, NewWallPostData} from '../NewWallPostScreen';
import UserFeedScreenComponent from './screen';

import {graphql} from 'react-apollo';
import {addMediaHoc, createPostHoc, getAllPostsHoc, getUserPostsHoc, likePostHoc, userHoc} from '../../graphql';
import {IAllPostsDataResponse, IPostsProps, IUserDataResponse, IUserQuery} from '../../types/gql';
import {CurrentUser} from '../../utils';

import {hideActivityIndicator, showActivityIndicator} from '../../actions';

import {IBlobData} from '../../lib/ipfs';
import {addBlob} from '../../utils/ipfs';

import base from '../../config/ipfs';

import { IWalletActivityScreenComponentProps } from '../WalletActivityScreen/screen';
import {IMediaRec} from './types';

interface IUserFeedScreenProps {
	navigation: NavigationScreenProp<any>;
	data: IUserDataResponse;
	// TODO: create interface
	Posts: IAllPostsDataResponse;
	User: IUserDataResponse;
	createPost: any;
	likePost: any;
	addMedia: any;
	startMediaPost: any;
	startPostadd: any;
	stopLoading: any;
}

interface IUserFeedScreenState {
	allWallPosts: IWallPostCardProp[];
	wallPosts: IWallPostCardProp[];
	refreshing: boolean;
	currentLoad: number;
}

class UserFeedScreen extends Component<IUserFeedScreenProps, IUserFeedScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'FEED',
	};

	public state = {
		allWallPosts: [],
		wallPosts: [],
		refreshing: false,
		currentLoad: 0,
	};

	public shouldComponentUpdate(nextProp: IUserFeedScreenProps, nextState: IUserFeedScreenState) {
		console.log('will update component');
		return true;
	}

	public componentWillReceiveProps(nextProps: IUserFeedScreenProps) {
		const {data, Posts} = nextProps;
		const {allWallPosts} = this.state;
		if (data.loading || Posts.loading) {
			return;
		}
		this.setState({allWallPosts: this.getWallPosts()});
		this.loadMorePostsHandler();
	}

	public render() {
		const {Posts, data} = this.props;
		const isLoading = data.loading || Posts.loading || this.state.wallPosts.length < 0;

		return (
			<UserFeedScreenComponent
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
		if (!data.loading && !Posts.loading && data.user.avarar) {
			ret = {uri: base.ipfs_URL + data.user.avatar.hash};
		}
		return ret;
	}

	private getWallPosts = () => {
		const {data, Posts} = this.props;
		const arty: any[] = [];

		if (!Posts.allPosts) {
			return arty;
		}

		for (let i = 0; i < Posts.allPosts.length; i++) {
			const post: IPostsProps = Posts.allPosts[i];
			// TODO: for each media create a Photo handler object to pass on a click / display multiple / etc..
			const media = post.Media ? (post.Media.length > 0 ? base.ipfs_URL + post.Media[0].hash : undefined) : undefined;
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
				numberOfComments: 0,
				numberOfWalletCoins: 0,
				onCommentsButtonClick: () => Alert.alert('click'),
				// TODO: append all media to this with the index of the image
				onImageClick: () => this.onPhotoPressHandler(0, [{url: media, index: 0}]),
				onLikeButtonClick: () => this.onLikeButtonClickHandler(post),
				canDelete: false,
				owner: post.owner,
			};
			arty.push(res);
		}

		// sort posts by time desc (most recent)
		return arty.sort((a, b) => {
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

	private loadMorePostsHandler = () => {
		const {wallPosts, allWallPosts, currentLoad} = this.state;

		if (allWallPosts.length < 0) {
			return;
		}

		if (wallPosts.length === allWallPosts.length) {
			return;
		}

		if (currentLoad === allWallPosts.length) {
			return;
		}

		const appendRate = allWallPosts.length % 2 === 0 ? 2 : 3;

		const rest: IWallPostCardProp[] = [];
		let currentLoadNew = currentLoad;

		for (currentLoadNew; currentLoadNew < wallPosts.length + appendRate; currentLoadNew++) {
			rest.push(allWallPosts[currentLoadNew]);
		}

		this.setState({
			wallPosts: this.state.wallPosts.concat(rest as any),
			currentLoad: currentLoadNew,
		});
	}

	private addWallPostHandler = async (data: NewWallPostData) => {
		const {createPost, addMedia, startMediaPost, startPostadd, stopLoading} = this.props;
		const blobfiles: IBlobData[] = [] as IBlobData[];

		const ipfsHashes: any = [];
		const mediaIds: string[] = [];

		let multiflag = false;

		data.mediaObjects.forEach((media: MediaObject) => {
			blobfiles.push({filename: media.name, data: media.content, name: media.name.split('.')[0]});
		});

		try {
			// check if user entered any text
			// if (data.text.length < 5) {
			// 	// TODO: add some warning
			// 	return;
			// }
			// there is media
			if (data.mediaObjects.length > 0) {
				// start adding media loading
				startMediaPost();

				// add files to ipfs
				let ipfsResp = await addBlob(blobfiles);
				ipfsResp = ipfsResp.data.split('\n');
				// parse all media files from ipfs
				if (ipfsResp.length > 2) {
					multiflag = true;
					ipfsResp.forEach((resp: string) => {
						if (resp !== '') {
							const parsed = JSON.parse(resp);
							ipfsHashes.push({size: parsed.Size, hash: parsed.Hash, type: parsed.Name.split('.')[1]});
						}
					});
				} else {
					const parsed = JSON.parse(ipfsResp[0]);
					ipfsHashes.push({size: parsed.Size, hash: parsed.Hash, type: parsed.Name.split('.')[1]});
				}
				// add media file/s to appsync
				// start creating post loading
				startPostadd();
				if (multiflag) {
					for (let i = 0; i < ipfsHashes.length; i++) {
						const ipfsData = ipfsHashes[i];
						const resp = await addMedia({
							variables: {
								hash: ipfsData.hash,
								type: ipfsData.type,
								size: parseInt(ipfsData.size, undefined),
							},
						});
						mediaIds.push(resp.data.addMedia.id);
					}
				} else {
					const ipfsData = ipfsHashes[0];
					const resp = await addMedia({
						variables: {hash: ipfsData.hash, type: ipfsData.type, size: parseInt(ipfsData.size, undefined)},
					});
					mediaIds.push(resp.data.addMedia.id);
				}

				// create the post with media
				await createPost({
					variables: {
						text: data.text,
						Media: mediaIds,
					},
				});
			} else {
				// create the post without media
				await createPost({
					variables: {
						text: data.text,
					},
				});
			}

			// stop loading
			stopLoading();
			// refresh the wall posts to append the new post
			this.refreshWallPosts();
		} catch (ex) {
			// stop loading
			stopLoading();
			// TODO: err handle
			console.log(ex);
		}
	}

	private refreshWallPosts = async () => {
		const {Posts} = this.props;

		this.setState({refreshing: true});
		await Posts.refetch();
		// TODO: @Jake: code below is never reached. Re-fetch fails?
		this.setState({
			refreshing: false,
			wallPosts: [],
			allWallPosts: this.getWallPosts(),
			currentLoad: 0,
		});
		this.loadMorePostsHandler();
	}

	private onPhotoPressHandler = (index: number, photos: any) => {
		this.props.navigation.navigate('MediaViewerScreen', {
			photos,
			startIndex: index,
		});
	}

	private onLikeButtonClickHandler = async (post: IPostsProps) => {
		const {likePost} = this.props;
		const currentUser = await CurrentUser();
		const likedByMe = post.likes.find((like: IUserQuery) => like.username === currentUser.username);
		if (likedByMe) {
			// TODO: add unlike handler
			return;
		}

		const likeRes = await likePost({ variables: { postId: post.id } });
		if (likeRes.error) {
			console.log(likeRes.error);
			return;
		}

		const {likePosts: {likes}} = likeRes.data;
		// TODO: make better
		this.setState((preveState: IUserFeedScreenState | any) => ({
			wallPosts: preveState.wallPosts.map((p: IWallPostCardProp) => {
				return p.id === post.id ? {...p, numberOfLikes: likes.length} : p;
			}),
		}));
	}

	private onCommentsButtonClickHandler = (wallPostData: IWallPostCardProp) => {
		// console.log('Go to comments screen for', wallPostData);
		// TODO: comments should be passed as a nav param to CommentsScreen
		this.props.navigation.navigate('CommentsStack');
	}
}

const MapDispatchToProps = (dispatch: any) => ({
	startMediaPost: () => dispatch(showActivityIndicator('Decentralizing your media', 'Please wait..')),
	startPostadd: () => dispatch(showActivityIndicator('Creating your post', 'finalizing post..')),
	stopLoading: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(null, MapDispatchToProps)(UserFeedScreen);

const userWrapper = userHoc(reduxWrapper);
const allPostsWrapper = getAllPostsHoc(userWrapper);
const createPostWrapper = createPostHoc(allPostsWrapper);
const addMediaWrapper = addMediaHoc(createPostWrapper);
const likePostWrapper = likePostHoc(addMediaWrapper);

export default likePostWrapper;
