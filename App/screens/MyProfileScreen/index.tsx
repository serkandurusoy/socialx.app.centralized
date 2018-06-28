import get from 'lodash/get';
import React, {Component} from 'react';
import {AsyncStorage, InteractionManager, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import MyProfileScreenComponent from './screen';
import style from './style';

import {TooltipDots} from 'components';

import {getUserAvatar, Signout} from 'utilities';

import {resetNavigationToRoute} from 'backend/actions';
import {addMediaHoc, createUpdateUserHoc, userHoc} from 'backend/graphql';
import {Colors} from 'theme';
import {IMediaProps, IPostsProps, IUserDataResponse} from 'types';

const GRID_PAGE_SIZE = 20;
const GRID_MAX_RESULTS = 500;

const INITIAL_STATE = {
	numberOfPhotos: 0,
	numberOfLikes: 0,
	numberOfFollowers: 0,
	numberOfFollowing: 0,
	avatarURL: '',
	fullName: '',
	username: '',
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
	private static navigationOptions = (props: IMyProfileScreenProps) => ({
		title: 'PROFILE',
		headerLeft: <View />,
		headerRight: (
			<View style={style.titleBarRightButton}>
				<TooltipDots items={MyProfileScreen.getTooltipItems(props)} iconColor={Colors.white} />
			</View>
		),
	});

	private static getTooltipItems = (props: IMyProfileScreenProps) => {
		return [
			// {
			// 	label: 'Profile Analytics',
			// 	icon: Icons.iconProfileAnalytics,
			// 	actionHandler: () => MyProfileScreen.goToProfileAnalyticsPage(props),
			// },
			// {
			// 	label: 'Wallet',
			// 	icon: Icons.iconWallet2,
			// 	actionHandler: () => MyProfileScreen.goToWalletActivityPage(props),
			// },
			{
				label: 'Settings',
				icon: 'ios-settings-outline',
				actionHandler: () => MyProfileScreen.goToSettingsPage(props),
			},
			{
				label: 'Logout',
				icon: 'ios-log-out',
				actionHandler: () => MyProfileScreen.logoutHandler(props),
			},
		];
	};

	private static goToProfileAnalyticsPage = (props: IMyProfileScreenProps) => {
		props.navigation.navigate('ProfileAnalyticsScreen');
	};

	private static goToWalletActivityPage = (props: IMyProfileScreenProps) => {
		props.navigation.navigate('WalletActivityScreen');
	};

	private static goToSettingsPage = (props: IMyProfileScreenProps) => {
		props.navigation.navigate('SettingsScreen');
	};

	private static logoutHandler = async (props: IMyProfileScreenProps) => {
		try {
			await Signout();
			await AsyncStorage.clear();
			resetNavigationToRoute('PreAuthScreen', props.navigation);
		} catch (ex) {
			console.log(ex);
		}
	};

	public state = INITIAL_STATE;

	// todo @serkan @jake why?
	private lastLoadedPhotoIndex = 0;

	public componentDidMount() {
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
		this.updateScreenData(data);
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
				onRefresh={this.refreshPageHandler}
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

	private preloadAllMediaObjects = (posts: IPostsProps[]) => {
		const images: IMediaProps[] = [];
		posts.forEach((post: IPostsProps) => {
			const medias = post.Media;
			const newProps = {
				numberOfComments: post.comments.length,
				numberOfLikes: post.likes.length,
			};
			if (post.Media) {
				medias.forEach((media) => {
					images.push({...media, ...newProps});
				});
			}
		});
		return images;
	};

	private updateScreenData = (data: IUserDataResponse) => {
		const {user} = data;
		const posts = get(data, 'user.posts', null);

		const userImages = posts
			? posts.reduce((count: number, post: IPostsProps) => count + (post.Media ? post.Media.length : 0), 0)
			: 0;
		const numOfLikes = posts ? posts.reduce((total: number, post: IPostsProps) => total + post.likes.length, 0) : 0;

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
			mediaObjects: posts ? this.preloadAllMediaObjects(posts) : [],
		});
	};

	private refreshPageHandler = async () => {
		const res = await this.props.data.refetch();
		this.updateScreenData(res.data);
	};
}

const userDataWrapper = userHoc(MyProfileScreen);
const addMediaWrapper = addMediaHoc(userDataWrapper);
const updateUserWrapper = createUpdateUserHoc(addMediaWrapper);

export default updateUserWrapper;
