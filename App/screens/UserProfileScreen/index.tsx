import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import {AnimatedValue, NavigationScreenProp} from 'react-navigation';
import {compose} from 'recompose';
import {DataProvider} from 'recyclerlistview';
import uuidv4 from 'uuid/v4';

import {
	addFriendHoc,
	getUserPostHoc,
	getUserProfileHoc,
	setLikedPostHoc,
	unsetLikedPostHoc,
	userHoc,
} from 'backend/graphql';
import {IWallPostCardProp, ModalCloseButton} from 'components';
import {ipfsConfig as base} from 'configuration';
import {PROFILE_TAB_ICON_TYPES} from 'consts';
import {Colors} from 'theme';
import {IMediaProps, IMediaViewerObject, IUserDataResponse} from 'types';
import {
	getMediaObjectType,
	getURLForMediaViewerObject,
	IWithTranslationProps,
	showToastMessage,
	withTranslations,
} from 'utilities';
import UserProfileScreenComponent from './screen';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_PAGE_SIZE = 20;

const INITIAL_STATE = {
	numberOfPhotos: 0,
	numberOfLikes: 0,
	numberOfFollowers: 0,
	numberOfFollowing: 0,
	numberOfViews: 0,
	avatarURL: null,
	fullName: '',
	username: '',
	aboutMeText: '',
	recentPosts: [],
	isLoading: true,
	refreshing: false,
};

interface IUserProfileScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
	addFriend: any;
	getUserQuery: any;
	getUserPosts: any;
	setLikedPost: any;
	unsetLikedPost: any;
	data: IUserDataResponse;
}

interface IUserProfileScreenState {
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	numberOfViews: number;
	avatarURL: any;
	fullName: string;
	username?: string;
	aboutMeText: string;
	recentPosts: IWallPostCardProp[];
	isLoading: boolean;
	refreshing: boolean;
	gridMediaProvider: DataProvider;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
}

class UserProfileScreen extends Component<IUserProfileScreenProps, IUserProfileScreenState> {
	private static navigationOptions = ({navigation}) => ({
		title: 'PROFILE',
		headerLeft: <View />,
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<ModalCloseButton navigation={navigation} />
			</View>
		),
		headerStyle: {
			borderBottomWidth: 0,
			backgroundColor: Colors.pink,
			elevation: 0,
		},
	});

	private lastLoadedPhotoIndex = 0;
	private readonly gridPhotosProvider: DataProvider;

	constructor(props: IUserProfileScreenProps) {
		super(props);
		this.gridPhotosProvider = new DataProvider((row1: IMediaViewerObject, row2: IMediaViewerObject) => {
			return row1.index !== row2.index;
		});

		this.state = {
			...INITIAL_STATE,
			gridMediaProvider: this.gridPhotosProvider,
			listTranslate: new Animated.Value(0),
			gridTranslate: new Animated.Value(SCREEN_WIDTH),
			activeTab: PROFILE_TAB_ICON_TYPES.LIST,
			containerHeight: 0,
		};
	}

	public render() {
		const {getUserQuery, getUserPosts, data, navigation} = this.props;
		const {refreshing, gridMediaProvider, numberOfFollowing, numberOfFollowers, isFollowed, numberOfViews} = this.state;
		const {loading: postsLoading, getPostsOwner} = getUserPosts;
		const {
			loading: userLoading,
			getUser: {numberOfPhotos, numberOfLikes, avatarURL, fullName, username, aboutMeText, relationship},
		} = getUserQuery;

		return (
			<UserProfileScreenComponent
				isLoading={userLoading || postsLoading} // TODO: loading props are not working ok!
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFollowers={numberOfFollowers}
				numberOfFollowing={numberOfFollowing}
				numberOfViews={numberOfViews}
				isFollowed={isFollowed}
				avatarURL={avatarURL}
				fullName={fullName}
				username={username}
				aboutMeText={aboutMeText}
				recentPosts={getPostsOwner ? getPostsOwner.Items : []}
				loadMorePhotosHandler={this.loadMorePhotosHandler}
				onCommentClick={this.onCommentsButtonClickHandler}
				onImageClick={this.onMediaObjectPressHandler}
				onLikeClick={this.onLikeClickHandler}
				onAddFriend={this.addFriendHandler}
				onShowFriendshipOptions={this.onShowFriendshipOptionsHandler}
				friendRequestStatus={relationship}
				onRefresh={this.refreshScreenHandler}
				onViewProfilePhoto={this.showProfilePhoto}
				onViewMediaFullScreen={this.onViewMediaFullScreen}
				refreshing={refreshing}
				gridMediaProvider={gridMediaProvider}
				currentUserId={data.user.userId}
				ownUser={data.user.userId === navigation.state.params.userId}
				onIconPress={this.onIconPressHandler}
				listTranslate={this.state.listTranslate}
				gridTranslate={this.state.gridTranslate}
				activeTab={this.state.activeTab}
				containerHeight={this.state.containerHeight}
				onLayoutChange={this.onLayoutChangeHandler}
			/>
		);
	}

	private loadMorePhotosHandler = () => {
		const {getUserQuery} = this.props;
		const {gridMediaProvider, refreshing} = this.state;
		const {mediaObjects} = getUserQuery.getUser;
		const headerElement = [{index: uuidv4()}];
		if (mediaObjects.length === 0) {
			this.setState({
				gridMediaProvider: gridMediaProvider.cloneWithRows(headerElement),
			});
		} else if (this.lastLoadedPhotoIndex < mediaObjects.length && !refreshing) {
			const loadedSize = gridMediaProvider.getSize();
			const endIndex = this.lastLoadedPhotoIndex + GRID_PAGE_SIZE;
			const loadedMedia = loadedSize === 0 ? headerElement : gridMediaProvider.getAllData();
			const newMedia = mediaObjects
				.slice(this.lastLoadedPhotoIndex, endIndex)
				.map((mObject: IMediaProps, index: number) => ({
					// url: 'https://avatars2.githubusercontent.com/u/' + (this.lastLoadedPhotoIndex + index),
					// type: MediaTypeImage, // just to test gallery is fast with proper resources!
					url: getURLForMediaViewerObject(mObject),
					type: getMediaObjectType(mObject),
					index: this.lastLoadedPhotoIndex + index,
				}));

			const allMedia = [...loadedMedia, ...newMedia];

			this.setState({
				gridMediaProvider: gridMediaProvider.cloneWithRows(allMedia),
			});
			this.lastLoadedPhotoIndex = allMedia.length - 1;
		}
	};

	private addFriendHandler = async () => {
		const {addFriend, navigation} = this.props;
		const userId = navigation.state.params.userId;
		await addFriend({variables: {user: userId}});
	};

	private onMediaObjectPressHandler = (index: number, media: any) => {
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects: media,
			startIndex: index,
		});
	};

	private onCommentsButtonClickHandler = (postId: any, userId: any) => {
		this.props.navigation.navigate('CommentsStack', {postId, userId});
	};

	private onLikeClickHandler = async (likedByMe: boolean, likedPostId: string) => {
		const {setLikedPost, unsetLikedPost} = this.props;

		const likeQuery = {variables: {likedPostId}};
		const result = likedByMe ? await unsetLikedPost(likeQuery) : await setLikedPost(likeQuery);

		if (result.error) {
			console.log(result.error);
			return likedByMe;
		}

		return !likedByMe;
	};

	private refreshScreenHandler = async () => {
		const {getText, getUserPosts, getUserQuery} = this.props;
		if (!this.state.refreshing) {
			this.setState({
				refreshing: true,
			});
			try {
				await getUserPosts.refetch();
				await getUserQuery.refetch();
			} catch (ex) {
				showToastMessage(`${getText('user.profile.screen.refresh.failed')}: ${ex.message}`);
			}
			this.setState({
				refreshing: false,
			});
		}
	};

	private showProfilePhoto = () => {
		const {navigation, getUserQuery} = this.props;
		navigation.navigate('MediaViewerScreen', {
			mediaObjects: [{type: 'jpg', hash: getUserQuery.getUser.avatarURL.replace(base.ipfs_URL, '')}],
			startIndex: 0,
		});
	};

	private onViewMediaFullScreen = (index: number) => {
		const {getUserQuery} = this.props;
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects: getUserQuery.getUser.mediaObjects,
			startIndex: index,
		});
	};

	private onIconPressHandler = (tab: string) => {
		if (this.state.activeTab !== tab) {
			this.setState({activeTab: tab});
		}

		if (tab === PROFILE_TAB_ICON_TYPES.GRID) {
			Animated.parallel([
				Animated.timing(this.state.listTranslate, {
					toValue: -SCREEN_WIDTH,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(this.state.gridTranslate, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(this.state.listTranslate, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(this.state.gridTranslate, {
					toValue: SCREEN_WIDTH,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();
		}
	};

	private onLayoutChangeHandler = (height: number) => {
		if (this.state.containerHeight !== height) {
			this.setState({containerHeight: height});
		}
	};

	private onShowFriendshipOptionsHandler = () => {
		const {getText} = this.props;
		const menuOptions = [
			getText('friendship.menu.option.remove'),
			getText('button.CANCEL'), // can't have this hidden!
		];
		ActionSheet.show(
			{
				options: menuOptions,
				cancelButtonIndex: menuOptions.length - 1,
			},
			(buttonIndex: number) => {
				if (buttonIndex === 0) {
					this.onRemoveFriendshipHandler();
				}
			},
		);
	};

	private onRemoveFriendshipHandler = () => {
		alert('onRemoveFriendshipHandler: TBD');
		// TODO: API call to remove + refresh user query so relationship is updated!
		// await this.props.getUserQuery.refetch();
	};
}

export default compose(
	getUserProfileHoc,
	getUserPostHoc,
	addFriendHoc,
	userHoc,
	setLikedPostHoc,
	unsetLikedPostHoc,
	withTranslations,
)(UserProfileScreen as any);
