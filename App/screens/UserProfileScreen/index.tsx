import {ModalCloseButton} from 'components';
import {IWallPostCardProp} from 'components/Displayers';
import {ToggleIconButton} from 'components/Interaction';
import get from 'lodash/get';
import React, {Component} from 'react';
import {InteractionManager, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {Icons} from 'theme/';
import {IMediaProps, IMediaViewerObject, ISimpleMediaObject, MediaTypeImage} from 'types';
import UserProfileScreenComponent from './screen';

import {ApolloClient} from 'apollo-client';
import {withApollo} from 'react-apollo';

import {getUserPostsQ, getUserProfileQ} from 'backend/graphql';
import {ipfsConfig as base} from 'configuration';
import {AvatarImagePlaceholder} from 'consts';

const GRID_PAGE_SIZE = 20;
const GRID_MAX_RESULTS = 5000;

const FULL_NAME = 'Lester Wheeler';
const USER_SMALL_AVATAR_URL = 'https://placeimg.com/120/120/people';
const USER_BIG_AVATAR_URL = 'https://placeimg.com/240/240/people';
const USER_NAME = 'LesterWheeler';

const RECENT_USER_POSTS: IWallPostCardProp[] = [
	{
		id: '111',
		title: 'My first post!',
		text:
			'This is a very long text that will be truncated and only the first 3 lines will be displayed. ' +
			'Then ellipsis will show to indicate that more text is hidden. ' +
			'To a general advertiser outdoor advertising is worthy of consideration',
		imageSource: 'https://placeimg.com/2000/1500/any',
		smallAvatar: USER_SMALL_AVATAR_URL,
		fullName: FULL_NAME,
		timestamp: new Date('Jan 20 2018'),
		numberOfLikes: 20,
		numberOfSuperLikes: 4,
		numberOfComments: 3,
		numberOfWalletCoins: 5,
		canDelete: true,
		mediaType: 'jpg',
	},
	{
		id: '222',
		taggedFriends: [{fullName: 'Isabelle Wilson'}, {fullName: 'Teddy Decola'}, {fullName: 'Michiko Bisson'}],
		location: 'Miami Beach, Florida',
		title: 'Hey, my second post to SocialX network!',
		imageSource: 'https://placeimg.com/640/550/any',
		smallAvatar: USER_SMALL_AVATAR_URL,
		fullName: FULL_NAME,
		timestamp: new Date('Jun 17 2017'),
		numberOfLikes: 11,
		numberOfSuperLikes: 6,
		numberOfComments: 4,
		numberOfWalletCoins: 2,
		canDelete: true,
		mediaType: 'jpg',
	},
];

const INITIAL_STATE = {
	numberOfPhotos: 13,
	numberOfLikes: 24,
	numberOfFollowers: 0,
	numberOfFollowing: 0,
	avatarURL: null,
	fullName: '',
	username: '',
	aboutMeText: '',
	isFollowed: false,
	recentPosts: RECENT_USER_POSTS,
	isLoading: true,
	mediaObjects: [], // TODO: update this similar with MyProfileScreen
};

interface IUserProfileScreenProps {
	navigation: NavigationScreenProp<any>;
	client: ApolloClient<any>;
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
				<ToggleIconButton
					selectedSource={Icons.iconHeartWhiteFilled}
					unselectedSource={Icons.iconHeartWhiteOutline}
					onPress={get(props, 'navigation.state.params.toggleFollow', undefined)}
					selected={get(props, 'navigation.state.params.isFollowed', false)}
				/>
				<ModalCloseButton navigation={props.navigation} />
			</View>
		),
	})

	public state = INITIAL_STATE;

	private lastLoadedPhotoIndex = 0;

	public async componentDidMount() {
		const {client} = this.props;
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({
				isFollowed: this.state.isFollowed,
				toggleFollow: this.toggleFollowHandler,
			});
		});

		try {
			const userId = this.props.navigation.state.params.userId;
			const userProfileRes = await client.query({query: getUserProfileQ, variables: {userId}});

			const getUser = userProfileRes.data.getUser;
			const mediaObjs = this.preloadAllMediaObjects(getUser.posts);

			let numOfLikes = 0;
			getUser.posts.forEach((post: any) => {
				numOfLikes += post.likes.length;
			});

			const avatar = getUser.avatar ? base.ipfs_URL + getUser.avatar.hash : AvatarImagePlaceholder;
			const preLoadPosts = this.preLoadPrevPosts(getUser.posts, avatar, getUser.name, getUser.userId);

			console.log(preLoadPosts);
			this.setState({
				isLoading: false,
				avatarURL: avatar,
				fullName: getUser.name,
				username: getUser.username,
				aboutMeText: getUser.bio,
				mediaObjects: mediaObjs,
				numberOfPhotos: mediaObjs.length,
				recentPosts: preLoadPosts,
			});
		} catch (ex) {
			console.log(ex);
		}
	}

	public render() {
		return (
			<UserProfileScreenComponent
				isLoading={this.state.isLoading}
				totalNumberOfPhotos={GRID_MAX_RESULTS}
				gridPageSize={GRID_PAGE_SIZE}
				numberOfPhotos={this.state.numberOfPhotos}
				numberOfLikes={this.state.numberOfLikes}
				numberOfFollowers={this.state.numberOfFollowers}
				numberOfFollowing={this.state.numberOfFollowing}
				isFollowed={this.state.isFollowed}
				avatarURL={this.state.avatarURL}
				fullName={this.state.fullName}
				username={this.state.username}
				aboutMeText={this.state.aboutMeText}
				recentPosts={this.state.recentPosts}
				loadMorePhotosHandler={() => this.loadMorePhotosHandler(GRID_PAGE_SIZE, GRID_MAX_RESULTS)}
				navigation={this.props.navigation}
				allMediaObjects={this.state.mediaObjects}
			/>
		);
	}

	private preLoadPrevPosts = (posts: any, ownerAvatar: any, ownerName: any, ownerId: any) => {
		if (!posts) {
			return [];
		}

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

		const recentPosts: any = [];
		for (let i = 0; i < posts.length; i++) {
			if (i > 2) {
				return recentPosts;
			}
			const currentPost = posts[i];
			recentPosts.push({
				id: currentPost.id,
				title: null,
				text: currentPost.text,
				location: currentPost.location,
				imageSource: currentPost.Media[0] ? base.ipfs_URL + currentPost.Media[0].hash : null,
				smallAvatar: ownerAvatar,
				fullName: ownerName,
				timestamp: new Date(parseInt(currentPost.createdAt, 10) * 1000),
				numberOfLikes: currentPost.likes.length,
				numberOfComments: getCommentsNum(currentPost.comments),
				canDelete: currentPost.owner.userId === ownerId,
				mediaType: currentPost.Media[0] ? currentPost.Media[0].type : null,
			});
		}
		return recentPosts;
	}

	private preloadAllMediaObjects = (posts: any) => {
		if (!posts) {
			return [];
		}

		const Imgs: IMediaProps[] = [];
		for (let y = 0; y < posts.length; y++) {
			const currentMedia = posts[y].Media;
			if (currentMedia) {
				for (let x = 0; x < currentMedia.length; x++) {
					Imgs.push(currentMedia[x]);
				}
			}
		}

		return Imgs;
	}

	private toggleFollowHandler = () => {
		this.props.navigation.setParams({isFollowed: !this.state.isFollowed});
		this.setState({
			isFollowed: !this.state.isFollowed,
		});
	}

	private loadMorePhotosHandler = (numberOfResults: number, maxResults: number): IMediaViewerObject[] => {
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
	}
}

const ApolloWrapper = withApollo(UserProfileScreen);

export default ApolloWrapper;
