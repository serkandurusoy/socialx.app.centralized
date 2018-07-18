import get from 'lodash/get';
import React, {Component} from 'react';
import {AsyncStorage, InteractionManager, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {DataProvider} from 'recyclerlistview';
import uuidv4 from 'uuid/v4';

import {resetNavigationToRoute} from 'backend/actions';
import {userHoc} from 'backend/graphql';
import {TooltipDots} from 'components';
import {Colors} from 'theme';
import {IMediaProps, IMediaViewerObject, IPostsProps, IUserDataResponse, MediaTypeImage} from 'types';
import {getMediaObjectType, getURLForMediaViewerObject, getUserAvatar, showToastMessage, Signout} from 'utilities';
import MyProfileScreenComponent from './screen';
import style from './style';

const GRID_PAGE_SIZE = 30;

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
	refreshing: false,
};

interface IMyProfileScreenProps {
	navigation: NavigationScreenProp<any>;
	data: IUserDataResponse;
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
	refreshing: boolean;
	gridMediaProvider: DataProvider;
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

	// todo @serkan @jake why?
	private lastLoadedPhotoIndex = 0;

	private readonly gridPhotosProvider: DataProvider;

	constructor(props: IMyProfileScreenProps) {
		super(props);
		this.gridPhotosProvider = new DataProvider((row1: IMediaViewerObject, row2: IMediaViewerObject) => {
			return row1.index !== row2.index;
		});
		this.state = {
			...INITIAL_STATE,
			gridMediaProvider: this.gridPhotosProvider,
		};
	}

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
				numberOfPhotos={this.state.numberOfPhotos}
				numberOfLikes={this.state.numberOfLikes}
				numberOfFollowers={this.state.numberOfFollowers}
				numberOfFollowing={this.state.numberOfFollowing}
				avatarURL={this.state.avatarURL}
				fullName={this.state.fullName}
				username={this.state.username}
				loadMorePhotosHandler={this.loadMorePhotosHandler}
				getAllPhotos={this.state.mediaObjects}
				navigation={this.props.navigation}
				onRefresh={this.refreshPageHandler}
				refreshing={this.state.refreshing}
				gridMediaProvider={this.state.gridMediaProvider}
			/>
		);
	}

	// todo @serkan @jake what?
	private loadMorePhotosHandler = (forceLoad = false) => {
		const {gridMediaProvider, mediaObjects, refreshing} = this.state;
		if (this.lastLoadedPhotoIndex < mediaObjects.length && (!refreshing || forceLoad)) {
			const loadedSize = gridMediaProvider.getSize();
			const endIndex = this.lastLoadedPhotoIndex + GRID_PAGE_SIZE;
			const loadedMedia = loadedSize === 0 ? [{index: uuidv4()}] : gridMediaProvider.getAllData();
			const newMedia = mediaObjects
				.slice(this.lastLoadedPhotoIndex, endIndex)
				.map((mObject: IMediaProps, ix: number) => ({
					url: getURLForMediaViewerObject(mObject),
					index: this.lastLoadedPhotoIndex + ix,
					type: getMediaObjectType(mObject),
				}));
			const allMedia = [...loadedMedia, ...newMedia];
			this.setState({
				gridMediaProvider: gridMediaProvider.cloneWithRows(allMedia),
			});
			this.lastLoadedPhotoIndex = allMedia.length;
		}
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
		const user = data ? data.user : null;
		const posts = get(data, 'user.posts', null);

		const userImages = posts
			? posts.reduce((count: number, post: IPostsProps) => count + (post.Media ? post.Media.length : 0), 0)
			: 0;
		const numOfLikes = posts ? posts.reduce((total: number, post: IPostsProps) => total + post.likes.length, 0) : 0;

		const userAvatar = getUserAvatar(data);

		this.setState({
			numberOfPhotos: userImages,
			numberOfLikes: numOfLikes,
			numberOfFollowers: 0,
			numberOfFollowing: 0,
			avatarURL: userAvatar,
			fullName: user ? user.name : '',
			username: user ? user.username : '',
			loaded: true,
			mediaObjects: posts ? this.preloadAllMediaObjects(posts) : [],
		});

		this.lastLoadedPhotoIndex = 0;
		this.setState(
			{
				gridMediaProvider: this.state.gridMediaProvider.cloneWithRows([{index: uuidv4()}]),
			},
			() => this.loadMorePhotosHandler(true),
		);
	};

	private refreshPageHandler = async () => {
		this.setState({
			refreshing: true,
		});
		try {
			const res = await this.props.data.refetch();
			this.updateScreenData(res.data);
		} catch (ex) {
			showToastMessage('Could not refresh your profile: ' + ex);
		}
		this.setState({
			refreshing: false,
		});
	};
}

export default userHoc(MyProfileScreen);
