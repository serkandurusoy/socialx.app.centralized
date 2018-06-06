import React, {Component} from 'react';
import {InteractionManager, TouchableOpacity, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import MyProfileScreenComponent from './screen';

import {IconButton} from 'components';

import {ipfsConfig as base} from 'configuration';
import {getUserAvatar} from 'utilities';

import {addMediaHoc, createUpdateUserHoc, userHoc} from 'backend/graphql';
import {Icon} from 'native-base';
import {IMediaProps, IUserDataResponse, IPostsProps} from 'types';

const GRID_PAGE_SIZE = 20;
const GRID_MAX_RESULTS = 500;

const FULL_NAME = 'Lester Wheeler';
const USER_BIG_AVATAR_URL = 'https://placeimg.com/240/240/people';
const USER_NAME = 'LesterWheeler';

const INITIAL_STATE = {
	numberOfPhotos: 13,
	numberOfLikes: 24,
	numberOfFollowers: 13401,
	numberOfFollowing: 876324,
	avatarURL: USER_BIG_AVATAR_URL,
	fullName: FULL_NAME,
	username: USER_NAME,
	loaded: false,
	mediaObjects: [],
};

interface IMyProfileScreenProps {
	navigation: NavigationScreenProp<any>;
	data: IUserDataResponse;
	// todo
	createUser: any;
	addMedia: any;
}

interface IMyProfileScreenState {
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	avatarURL: any;
	fullName: string;
	username?: string;
	loaded: boolean;
	mediaObjects: IMediaProps[];
}

class MyProfileScreen extends Component<IMyProfileScreenProps, IMyProfileScreenState> {
	private static navigationOptions = (props: any) => ({
		title: 'PROFILE',
		headerRight: (
			<IconButton ex={true} iconSource={'refresh'} onPress={() => props.navigation.state.params.refreshScreen} />
		),
	});

	public state = INITIAL_STATE;

	// todo @serkan @jake why?
	private lastLoadedPhotoIndex = 0;

	public async componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({
				refreshScreen: this.props.data.refetch,
			});
		});
	}

	public componentWillReceiveProps(nextProps: IMyProfileScreenProps) {
		const {data} = nextProps;
		if (data.loading || this.state.loaded) {
			return;
		}

		const {user} = data;
		const {posts, avatar} = user;

		const userImages = posts ? posts.reduce(
			(count: number, post: IPostsProps) => count + (post.Media ? post.Media.length : 0),
			0,
		) : 0;
		const numOfLikes = posts ? posts.reduce(
			(total: number, post: IPostsProps) => total + post.likes.length,
			0,
		) : 0;

		const userAvatar = getUserAvatar(user);

		this.setState({
			numberOfPhotos: userImages,
			numberOfLikes: numOfLikes,
			numberOfFollowers: 0,
			numberOfFollowing: 0,
			avatarURL: userAvatar,
			fullName: user.name,
			username: user.username,
			loaded: true,
			mediaObjects: this.preloadAllMediaObjects(),
		});
	}

	public render() {
		const {data} = this.props;
		return (
			<MyProfileScreenComponent
				isLoading={data.loading}
				totalNumberOfPhotos={GRID_MAX_RESULTS}
				gridPageSize={GRID_PAGE_SIZE}
				numberOfPhotos={this.state.numberOfPhotos}
				numberOfLikes={this.state.numberOfLikes}
				numberOfFollowers={this.state.numberOfFollowers}
				numberOfFollowing={this.state.numberOfFollowing}
				avatarURL={this.state.avatarURL}
				fullName={this.state.fullName}
				username={this.state.username}
				loadMorePhotosHandler={() => this.loadMorePhotosHandler(GRID_PAGE_SIZE, this.state.numberOfPhotos)}
				getAllPhotos={this.state.mediaObjects}
				navigation={this.props.navigation}
			/>
		);
	}

	// todo @serkan @jake what?
	private loadMorePhotosHandler = (numberOfResults: number, maxResults: number): IMediaProps[] => {
		const ret: IMediaProps[] = [];
		const endIndex = this.lastLoadedPhotoIndex + numberOfResults;
		for (let i = this.lastLoadedPhotoIndex; i < endIndex; i++) {
			if (this.lastLoadedPhotoIndex < maxResults) {
				ret.push(this.state.mediaObjects[i]);
				this.lastLoadedPhotoIndex++;
			}
		}
		return ret;
	};

	private preloadAllMediaObjects = () => {
		const {data} = this.props;
		const {user} = data;

		const {posts} = user;

		if (!posts) {
			return [];
		}

		// todo @serkan @jake this looks like an unwrap/flatten, let's review
		return posts.reduce((Images: any, post: IPostsProps) => {
			if (post.Media) {
				return Images.concat.apply(post.Media)
			}
		}, []);
	};
}

const userDataWrapper = userHoc(MyProfileScreen);
const addMediaWrapper = addMediaHoc(userDataWrapper);
const updateUserWrapper = createUpdateUserHoc(addMediaWrapper);

export default updateUserWrapper;
