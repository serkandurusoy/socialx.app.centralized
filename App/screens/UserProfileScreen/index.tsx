import {ModalCloseButton, ScreenHeaderButton} from 'components';
import {IWallPostCardProp} from 'components/Displayers';
import React, {Component} from 'react';
import {InteractionManager, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {IMediaProps, IMediaViewerObject, ISimpleMediaObject, MediaTypeImage} from 'types';
import UserProfileScreenComponent from './screen';

import {addFriendHoc, getUserPostHoc, getUserProfileHoc} from 'backend/graphql';

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
				<ScreenHeaderButton iconName={'md-refresh'} onPress={props.navigation.state.params.refreshScreen} />
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
				refreshScreen: () => alert('refresh now'), // TODO: @Aaron - handle refresh here
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
				allMediaObjects={getUserQuery.getUser.mediaObjects}
				onCommentClick={this.onCommentsButtonClickHandler}
				onImageClick={this.onMediaObjectPressHandler}
				onLikeClick={null}
				onAddFriend={this.addFriendHandler}
				friendRequestStatus={getUserQuery.getUser.relationship}
			/>
		);
	}

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
		const {addFriend, navigation} = this.props;
		const userId = navigation.state.params.userId;
		await addFriend({variables: {userId}});
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
