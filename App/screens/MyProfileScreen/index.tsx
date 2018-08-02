import get from 'lodash/get';
import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {compose} from 'recompose';
import {DataProvider} from 'recyclerlistview';
import uuidv4 from 'uuid/v4';

import {resetNavigationToRoute} from 'backend/actions';
import {userHoc} from 'backend/graphql';
import {
	AVATAR_NAME_HEIGHT,
	DEFAULT_AVATAR_SIZE,
	HEADER_TOP_PADDING,
	PROFILE_STATS_HEIGHT,
	TooltipDots,
} from 'components';
import {Colors, Icons} from 'theme';
import {IMediaProps, IMediaViewerObject, IPostsProps, IUserDataResponse} from 'types';
import {
	getMediaObjectType,
	getURLForMediaViewerObject,
	getUserAvatar,
	IWithTranslationProps,
	showToastMessage,
	Signout,
	withTranslations,
} from 'utilities';
import MyProfileScreenComponent from './screen';
import style from './style';

const GRID_PAGE_SIZE = 20;

const INITIAL_STATE = {
	numberOfPhotos: 0,
	numberOfLikes: 0,
	numberOfFollowers: 0,
	numberOfFollowing: 0,
	numberOfViews: 0,
	avatarURL: '',
	fullName: '',
	username: '',
	loaded: false,
	mediaObjects: [],
	refreshing: false,
};

interface IMyProfileScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
	data: IUserDataResponse;
}

interface IMyProfileScreenState {
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	numberOfViews: number;
	avatarURL: any;
	fullName: string;
	username?: string;
	loaded: boolean;
	mediaObjects: IMediaProps[];
	refreshing: boolean;
	gridMediaProvider: DataProvider;
}

const TOTAL_HEADER_HEIGHT = HEADER_TOP_PADDING + DEFAULT_AVATAR_SIZE + PROFILE_STATS_HEIGHT;

class MyProfileScreen extends Component<IMyProfileScreenProps, IMyProfileScreenState> {
	private static navigationOptions = ({navigation, navigationOptions}) => ({
		title: navigationOptions.getText('my.profile.screen.title'),
		headerLeft: <View />,
		headerRight: (
			<View style={style.titleBarRightButton}>
				<TooltipDots
					items={MyProfileScreen.getTooltipItems(navigation, navigationOptions.getText)}
					iconColor={Colors.white}
				/>
			</View>
		),
	});

	private static getTooltipItems = (navigation: NavigationScreenProp<any>, getText: any) => {
		return [
			// {
			// 	label: getText('my.profile.screen.menu.profile.analytics'),
			// 	icon: Icons.iconProfileAnalytics,
			// 	actionHandler: () => MyProfileScreen.goToProfileAnalyticsPage(navigation),
			// },
			// {
			// 	label: getText('my.profile.screen.menu.wallet'),
			// 	icon: Icons.iconWallet2,
			// 	actionHandler: () => MyProfileScreen.goToWalletActivityPage(navigation),
			// },
			{
				label: getText('my.profile.screen.menu.settings'),
				icon: 'ios-settings-outline',
				actionHandler: () => MyProfileScreen.goToSettingsPage(navigation),
			},
			{
				label: getText('my.profile.screen.menu.logout'),
				icon: 'ios-log-out',
				actionHandler: () => MyProfileScreen.logoutHandler(navigation),
			},
		];
	};

	private static goToProfileAnalyticsPage = (navigation: NavigationScreenProp<any>) => {
		navigation.navigate('ProfileAnalyticsScreen');
	};

	private static goToWalletActivityPage = (navigation: NavigationScreenProp<any>) => {
		navigation.navigate('WalletActivityScreen');
	};

	private static goToSettingsPage = (navigation: NavigationScreenProp<any>) => {
		navigation.navigate('SettingsScreen');
	};

	private static logoutHandler = async (navigation: NavigationScreenProp<any>) => {
		try {
			await Signout();
			await AsyncStorage.clear();
			resetNavigationToRoute('PreAuthScreen', navigation);
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

	public componentWillReceiveProps(nextProps: IMyProfileScreenProps) {
		const {data} = nextProps;
		if (data.loading || this.state.loaded) {
			return;
		}
		this.updateScreenData(data);
	}

	public render() {
		const {data} = this.props;
		const {
			numberOfPhotos,
			numberOfLikes,
			numberOfFollowers,
			numberOfFollowing,
			numberOfViews,
			avatarURL,
			fullName,
			username,
			refreshing,
			gridMediaProvider,
			mediaObjects,
		} = this.state;
		return (
			<MyProfileScreenComponent
				isLoading={data.loading}
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFollowers={numberOfFollowers}
				numberOfFollowing={numberOfFollowing}
				numberOfViews={numberOfViews}
				avatarURL={avatarURL}
				fullName={fullName}
				username={username}
				loadMorePhotosHandler={this.loadMorePhotosHandler}
				onRefresh={this.refreshPageHandler}
				refreshing={refreshing}
				gridMediaProvider={gridMediaProvider}
				hasPhotos={mediaObjects.length > 0}
				emptyGalleryMessage={'my.profile.screen.empty.gallery'}
				headerHeight={TOTAL_HEADER_HEIGHT}
				onViewMediaFullScreen={this.onPhotoPressHandler}
				onEditProfile={this.onEditProfilePressHandler}
				ownUser={true}
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
		const {getText, data} = this.props;
		if (!this.state.refreshing) {
			this.setState({
				refreshing: true,
			});
			try {
				const res = await data.refetch();
				this.updateScreenData(res.data);
			} catch (ex) {
				showToastMessage(`${getText('my.profile.screen.refresh.failed')}: ${ex.message}`);
			}
			this.setState({
				refreshing: false,
			});
		}
	};

	private onPhotoPressHandler = (index: number) => {
		const {navigation} = this.props;
		const {mediaObjects} = this.state;
		navigation.navigate('MediaViewerScreen', {
			mediaObjects,
			startIndex: index,
		});
	};

	private onEditProfilePressHandler = () => {
		const {navigation} = this.props;
		navigation.navigate('SettingsScreen');
	};
}

export default compose(
	userHoc,
	withTranslations,
)(MyProfileScreen);
