import {ModalCloseButton} from 'components';
import {IWallPostCardProp} from 'components/Displayers';
import {IconButton, ToggleIconButton} from 'components/Interaction';
import get from 'lodash/get';
import React, {Component} from 'react';
import {InteractionManager, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {Icons} from 'theme/';
import {IMediaProps, IMediaViewerObject, ISimpleMediaObject, IUserQuery, MediaTypeImage} from 'types';
import UserProfileScreenComponent from './screen';

import {ApolloClient} from 'apollo-client';
import {withApollo} from 'react-apollo';

import {addFriendHoc, getUserProfileHoc, getUserPostHoc} from 'backend/graphql';
import {ipfsConfig as base} from 'configuration';
import {AvatarImagePlaceholder, FriendTypes} from 'consts';

const GRID_PAGE_SIZE = 20;
const GRID_MAX_RESULTS = 5000;

const INITIAL_STATE = {
	numberOfPhotos: 0,
	numberOfLikes: 0,
	numberOfFollowers: 0,
	numberOfFollowing: 0,
	avatarURL: null,
	fullName: '',
	username: '',
	aboutMeText: '',
	isFollowed: false,
	recentPosts: [],
	isLoading: true,
	mediaObjects: [],
};

interface IUserProfileScreenProps {
	navigation: NavigationScreenProp<any>;
	addFriend: any;
	getUserQuery: any;
	getUserPosts: any;
}

interface IUserProfileScreenState {
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	isFollowed: boolean;
	avatarURL: any;
	fullName: string;
	username?: string;
	aboutMeText: string;
	recentPosts: IWallPostCardProp[];
	isLoading: boolean;
	mediaObjects: IMediaProps[];
}

class UserProfileScreen extends Component<IUserProfileScreenProps, IUserProfileScreenState> {
	private static navigationOptions = (props: IUserProfileScreenProps) => ({
		title: 'PROFILE',
		headerLeft: <View />,
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				{/* <ToggleIconButton
					selectedSource={Icons.iconHeartWhiteFilled}
					unselectedSource={Icons.iconHeartWhiteOutline}
					onPress={get(props, 'navigation.state.params.toggleFollow', undefined)}
					selected={get(props, 'navigation.state.params.isFollowed', false)}
				/> */}
				{/* @ionut TODO: create a refresh button here? */}
				{/* <IconButton ex={true} iconSource={'sync-alt'} /> */}
				<IconButton ex={true} iconSource={'refresh'} onPress={() => props.navigation.state.params.addFriend} />
				<ModalCloseButton navigation={props.navigation} />
			</View>
		),
	});

	public state = INITIAL_STATE;

	private lastLoadedPhotoIndex = 0;

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({
				isFollowed: this.state.isFollowed,
				toggleFollow: this.toggleFollowHandler,
			});
		});
	}

	public render() {
		const {getUserQuery, getUserPosts} = this.props;
		return (
			<UserProfileScreenComponent
				isLoading={getUserQuery.loading || getUserPosts.loading}
				totalNumberOfPhotos={GRID_MAX_RESULTS}
				gridPageSize={GRID_PAGE_SIZE}
				numberOfPhotos={getUserQuery.getUser.numberOfPhotos}
				numberOfLikes={getUserQuery.getUser.numberOfLikes}
				numberOfFollowers={this.state.numberOfFollowers}
				numberOfFollowing={this.state.numberOfFollowing}
				isFollowed={this.state.isFollowed}
				avatarURL={getUserQuery.getUser.avatarURL}
				fullName={getUserQuery.getUser.fullName}
				username={getUserQuery.getUser.username}
				aboutMeText={getUserQuery.getUser.aboutMeText}
				recentPosts={getUserPosts.Items}
				loadMorePhotosHandler={this.loadMorePhotosHandler}
				navigation={this.props.navigation}
<<<<<<< HEAD
				allMediaObjects={getUserQuery.getUser.mediaObjects}

=======
				allMediaObjects={this.state.mediaObjects}
>>>>>>> 036c7fc247408d7d17d01b17e1b7c577cc061ac8
				onCommentClick={this.onCommentsButtonClickHandler}
				onImageClick={this.onMediaObjectPressHandler}
				onLikeClick={null}
			/>
		);
	}

<<<<<<< HEAD
=======
	private preFetch = async () => {
		const {client} = this.props;
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({
				isFollowed: this.state.isFollowed,
				toggleFollow: this.toggleFollowHandler,
			});
		});

		try {
			const userId = this.props.navigation.state.params.userId;
			const userProfileRes = await client.query({
				query: getUserProfileQ,
				variables: {userId},
				fetchPolicy: 'network-only',
			});
			const {getUser} = userProfileRes.data;

			const userPostsRes: any = await client.query({
				query: getUserPostsQ,
				variables: {userId},
				fetchPolicy: 'network-only',
			});
			const userPosts = userPostsRes.data.getPostsOwner.Items || [];
			console.log('userPosts', userPosts);

			const mediaObjs = this.preloadAllMediaObjects(userPosts);
			console.log('mediaObjects', mediaObjs);

			const numOfLikes = getUser.posts.reduce((total: number, post: any) => total + post.likes.length, 0);

			const avatar = getUser.avatar ? base.ipfs_URL + getUser.avatar.hash : AvatarImagePlaceholder;
			const preLoadPosts = this.preLoadPrevPosts(userPosts, avatar, getUser);
			this.setState({
				isLoading: false,
				avatarURL: avatar,
				fullName: getUser.name,
				username: getUser.username,
				aboutMeText: getUser.bio,
				mediaObjects: [],
				numberOfPhotos: mediaObjs,
				numberOfLikes: numOfLikes,
				recentPosts: preLoadPosts,
			});
		} catch (ex) {
			console.log(ex);
		}
	};

	private preLoadPrevPosts = (posts: any, ownerAvatar: any, user: IUserQuery) => {
		if (!posts) {
			return [];
		}

		const ownerName = user.name;
		const ownerId = user.userId;

		const getCommentsNum = (comments: any) => {
			if (!comments.length) {
				return 0;
			}

			let res = 0;
			for (res; res < comments.length; res++) {
				res += comments[res].comments.length > 0 ? comments[res].comments.length : 0;
			}
			return res;
		};

		return posts.map((post: any, index: number) => {
			if (index === 6) { return; }
			return {
				id: post.id,
				title: null,
				text: post.text,
				location: post.location,
				smallAvatar: ownerAvatar,
				fullName: ownerName,
				timestamp: new Date(parseInt(post.createdAt, 10) * 1000),
				numberOfLikes: post.likes.length,
				numberOfComments: getCommentsNum(post.comments),
				canDelete: post.owner.userId === ownerId,
				media: post.Media,
				owner: user,
			}
		});
	};

	private preloadAllMediaObjects = (posts: any) => {
		if (!posts) {
			return [];
		}

		// todo @serkan @jake I think I saw a similar unwrap/flatten approach somewhere else hmm
		return posts.reduce((count: any, post: any) => count += post.Media.length, 0);
		// const Imgs: IMediaProps[] = [];
		// for (let y = 0; y < posts.length; y++) {
		// 	const currentMedia = posts[y].Media;
		// 	if (currentMedia) {
		// 		for (let x = 0; x < currentMedia.length; x++) {
		// 			Imgs.push(currentMedia[x]);
		// 		}
		// 	}
		// }

		// return Imgs;
	};

>>>>>>> 036c7fc247408d7d17d01b17e1b7c577cc061ac8
	private toggleFollowHandler = () => {
		this.props.navigation.setParams({isFollowed: !this.state.isFollowed});
		this.setState({
			isFollowed: !this.state.isFollowed,
		});
	};

	private loadMorePhotosHandler = (numberOfResults: number, maxResults: number): IMediaViewerObject[] => {
		// todo @serkan @jake I think I've something similar to this somewhere else
		const ret: ISimpleMediaObject[] = [];
		const endIndex = this.lastLoadedPhotoIndex + numberOfResults;
		for (let i = this.lastLoadedPhotoIndex; i < endIndex; i++) {
			if (this.lastLoadedPhotoIndex < maxResults) {
				ret.push({
					url: 'https://avatars2.githubusercontent.com/u/' + i,
					type: MediaTypeImage,
					index: i,
				});
				this.lastLoadedPhotoIndex++;
			}
		}
		return ret;
	};

	private addFriendHandler = async () => {
		const {addFriend, navigation, getUserQuery} = this.props;
		const userId = navigation.state.params.userId;

		try {
			if (getUserQuery.relationship === FriendTypes.NotFriend) {
				await addFriend({variables: { userId }});
			} else {
				alert('You are already friends with this user.');
			}
		} catch (ex) {
			console.log(ex);
		}
	}

	private onMediaObjectPressHandler = (index: number, media: any) => {
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects: media,
			startIndex: index,
		});
	};

	private onCommentsButtonClickHandler = (postId: any, userId: any) => {
		this.props.navigation.navigate('CommentsStack', {postId, userId});
	};

	private onLikeButtonClickHandler = async (likedByMe: boolean, postId: string) => {
		// const {client} = this.props;
		// const likeQuery = {variables: {postId}};
		// const result = likedByMe ? await removeLikePost(likeQuery) : await likePost(likeQuery);
		// console.log('result:', result);
		// if (result.error) {
		// 	console.log(result.error);
		// 	return;
		// }
	};
}

const getUserQueryWrapper = getUserProfileHoc(UserProfileScreen);
const getUserPostsWrapper = getUserPostHoc(getUserQueryWrapper);
const addFriendWrapper = addFriendHoc(getUserPostsWrapper);

export default addFriendWrapper;
