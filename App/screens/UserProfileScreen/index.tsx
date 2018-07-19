import get from 'lodash/get';
import React, {Component} from 'react';
import {InteractionManager, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {compose} from 'recompose';
import {DataProvider} from 'recyclerlistview';
import uuidv4 from 'uuid/v4';

import {addFriendHoc, getUserPostHoc, getUserProfileHoc} from 'backend/graphql';
import {IWallPostCardProp, ModalCloseButton, ToggleIconButton} from 'components';
import {ipfsConfig as base} from 'configuration';
import {Icons} from 'theme';
import {IMediaProps, IMediaViewerObject, MediaTypeImage} from 'types';
import {getMediaObjectType, getURLForMediaViewerObject, IWithTranslationProps, showToastMessage} from 'utilities';
import UserProfileScreenComponent from './screen';

const GRID_PAGE_SIZE = 20;

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
	refreshing: false,
};

interface IUserProfileScreenProps extends IWithTranslationProps {
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
	refreshing: boolean;
	gridMediaProvider: DataProvider;
}

class UserProfileScreen extends Component<IUserProfileScreenProps, IUserProfileScreenState> {
	private static navigationOptions = ({navigation, navigationOptions}) => ({
		title: navigationOptions.getText('user.profile.screen.title'),
		headerLeft: <View />,
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				<ToggleIconButton
					selectedSource={Icons.iconHeartWhiteFilled}
					unselectedSource={Icons.iconHeartWhiteOutline}
					onPress={get(navigation, 'state.params.toggleFollow', undefined)}
					selected={get(navigation, 'state.params.isFollowed', false)}
				/>
				<ModalCloseButton navigation={navigation} />
			</View>
		),
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
		};
	}

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
		const {refreshing, gridMediaProvider} = this.state;
		return (
			<UserProfileScreenComponent
				isLoading={getUserQuery.loading || getUserPosts.loading}
				numberOfPhotos={getUserQuery.getUser.numberOfPhotos}
				numberOfLikes={getUserQuery.getUser.numberOfLikes}
				numberOfFollowers={this.state.numberOfFollowers}
				numberOfFollowing={this.state.numberOfFollowing}
				isFollowed={this.state.isFollowed}
				avatarURL={getUserQuery.getUser.avatarURL}
				fullName={getUserQuery.getUser.fullName}
				username={getUserQuery.getUser.username}
				aboutMeText={getUserQuery.getUser.aboutMeText}
				recentPosts={getUserPosts.getPostsOwner ? getUserPosts.getPostsOwner.Items : []}
				loadMorePhotosHandler={this.loadMorePhotosHandler}
				onCommentClick={this.onCommentsButtonClickHandler}
				onImageClick={this.onMediaObjectPressHandler}
				onLikeClick={this.onLikeClickHandler}
				onAddFriend={this.addFriendHandler}
				friendRequestStatus={getUserQuery.getUser.relationship}
				onRefresh={this.refreshScreenHandler}
				onViewProfilePhoto={this.showProfilePhoto}
				onViewMediaFullScreen={this.onViewMediaFullScreen}
				refreshing={refreshing}
				gridMediaProvider={gridMediaProvider}
			/>
		);
	}

	private toggleFollowHandler = () => {
		this.props.navigation.setParams({isFollowed: !this.state.isFollowed});
		this.setState({
			isFollowed: !this.state.isFollowed,
		});
	};

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
				.map((mObject: IMediaProps, ix: number) => ({
					// url: 'https://avatars2.githubusercontent.com/u/' + (this.lastLoadedPhotoIndex + ix),
					// type: MediaTypeImage, // just to test gallery is fast with proper resources!
					url: getURLForMediaViewerObject(mObject),
					type: getMediaObjectType(mObject),
					index: this.lastLoadedPhotoIndex + ix,
				}));
			const allMedia = [...loadedMedia, ...newMedia];
			this.setState({
				gridMediaProvider: gridMediaProvider.cloneWithRows(allMedia),
			});
			this.lastLoadedPhotoIndex = allMedia.length;
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

	private onLikeClickHandler = async (likedByMe: boolean, postId: string) => {
		// TODO: later support likes on user profile!
		// const {client} = this.props;
		// const likeQuery = {variables: {postId}};
		// const result = likedByMe ? await removeLikePost(likeQuery) : await likePost(likeQuery);
		// console.log('result:', result);
		// if (result.error) {
		// 	console.log(result.error);
		// 	return;
		// }
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
}

export default compose(
	getUserProfileHoc,
	getUserPostHoc,
	addFriendHoc,
)(UserProfileScreen);
