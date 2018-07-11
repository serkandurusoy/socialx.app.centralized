import React, {Component, ReactText} from 'react';
import {Dimensions, RefreshControl, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {DataProvider} from 'recyclerlistview';

import {
	AddFriendButton,
	IWallPostCardProp,
	MediaObjectViewer,
	NewGridPhotos,
	ProfileStatistics,
	UserAvatar,
	WallPostCard,
} from 'components';
import {ipfsConfig as base} from 'configuration';
import {IWithLoaderProps, withInlineLoader} from 'hoc';
import {Metrics} from 'theme';
import {IMediaProps, IMediaViewerObject, ISimpleMediaObject, SearchResultKind} from 'types';
import {getTypePropsForMediaViewerObject, getURLForMediaViewerObject, showToastMessage} from 'utilities';

import style, {USER_MEDIA_THUMB_SIZE} from './style';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const GRID_PHOTOS_SCROLL_THRESHOLD = 150;

interface IUserProfileScreenProps extends IWithLoaderProps {
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
	loadMorePhotosHandler: () => ISimpleMediaObject[];
	totalNumberOfPhotos: number;
	gridPageSize: number;
	navigation: NavigationScreenProp<any>;
	allMediaObjects: IMediaProps[];
	onCommentClick: any;
	onImageClick: any;
	onLikeClick?: (likedByMe: boolean, postId: string) => void;
	onAddFriend: () => Promise<any>;
	friendRequestStatus: SearchResultKind;
	onRefresh: () => Promise<any>;
}

interface IUserProfileScreenComponentState {
	isFollowed: boolean;
	scrollView: any;
	isScrolled: boolean;
	gridMediaProvider: DataProvider;
	refreshing: boolean;
}

// todo @serkan @jake let's refactor this togetgher as an example of react component composition
class UserProfileScreenComponent extends Component<IUserProfileScreenProps, IUserProfileScreenComponentState> {
	public static getDerivedStateFromProps(
		nextProps: Readonly<IUserProfileScreenProps>,
		prevState: Readonly<IUserProfileScreenComponentState>,
	) {
		if (nextProps.isFollowed !== prevState.isFollowed) {
			setTimeout(() => {
				prevState.scrollView.scrollTo({x: 0, y: 0, animated: true});
			}, 500);
			return {
				isFollowed: nextProps.isFollowed,
				isScrolled: false,
			};
		}
		return null;
	}

	private dataProvider = new DataProvider((row1: IMediaViewerObject, row2: IMediaViewerObject) => {
		return row1.index !== row2.index;
	});

	constructor(props: IUserProfileScreenProps, context: any) {
		super(props, context);
		this.state = {
			scrollView: null,
			isScrolled: false,
			isFollowed: this.props.isFollowed,
			gridMediaProvider: this.dataProvider.cloneWithRows(this.props.loadMorePhotosHandler()),
			refreshing: false,
		};
	}

	public render() {
		return (
			<ScrollView
				// TODO: pull to refresh not support when scrollEnabled is false for isFollowed state
				scrollEnabled={!this.state.isFollowed}
				style={style.container}
				contentContainerStyle={style.scrollContainer}
				showsVerticalScrollIndicator={false}
				ref={this.setScrollView}
				refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.screenRefreshHandler} />}
			>
				<View style={style.topContainer}>
					<TouchableOpacity onPress={this.showImage}>
						<UserAvatar
							avatarURL={{uri: this.props.avatarURL}}
							fullName={this.props.fullName}
							username={this.props.username}
						/>
					</TouchableOpacity>
					<View style={style.addFriendContainer}>
						<AddFriendButton
							kind={this.props.friendRequestStatus}
							onAddFriend={this.props.onAddFriend}
							addLabel={'Add friend'}
							outAnimation={'zoomOut'}
						/>
					</View>
					<ProfileStatistics
						numberOfPhotos={this.props.numberOfPhotos}
						numberOfLikes={this.props.numberOfLikes}
						numberOfFollowers={this.props.numberOfFollowers}
						numberOfFollowing={this.props.numberOfFollowing}
					/>
				</View>
				{this.conditionalRendering()}
			</ScrollView>
		);
	}

	private showImage = () => {
		const {navigation, avatarURL} = this.props;
		navigation.navigate('MediaViewerScreen', {
			mediaObjects: [{type: 'jpg', hash: avatarURL.replace(base.ipfs_URL, '')}],
			startIndex: 0,
		});
	};

	private setScrollView = (ref: any) => {
		this.setState({
			scrollView: ref,
		});
	};

	private conditionalRendering = () => {
		if (this.state.isFollowed) {
			return this.renderFollowedState();
		} else {
			return this.renderNotFollowedState();
		}
	};

	private renderFollowedState = () => {
		const gridPhotosStyles = [
			style.gridPhotosContainer,
			...(this.props.totalNumberOfPhotos > this.props.gridPageSize
				? [
						{
							height: SCREEN_HEIGHT - Metrics.navBarHeight,
						},
				  ]
				: []),
		];

		return (
			<View style={gridPhotosStyles}>
				<NewGridPhotos
					thumbWidth={USER_MEDIA_THUMB_SIZE}
					thumbHeight={USER_MEDIA_THUMB_SIZE}
					showsVerticalScrollIndicator={false}
					renderGridItem={this.renderGridItemHandler}
					onLoadMore={this.initLoadMorePhotosHandler}
					dataProvider={this.state.gridMediaProvider}
					onScroll={this.scrollUpdated}
				/>
			</View>
		);
	};

	private renderGridItemHandler = (type: ReactText, mediaData: IMediaViewerObject) => {
		const mediaURL = getURLForMediaViewerObject(mediaData);
		const mediaTypeProps = getTypePropsForMediaViewerObject(mediaData);
		return (
			<TouchableOpacity onPress={() => this.onViewMediaFullScreen(mediaData.index)}>
				<MediaObjectViewer {...mediaTypeProps} uri={mediaURL} style={style.userMediaThumb} thumbOnly={true} />
			</TouchableOpacity>
		);
	};

	private renderNotFollowedState = () => {
		return (
			<View>
				<View style={style.aboutMeContainer}>
					<Text style={style.aboutMeTitle}>{'ABOUT ME'}</Text>
					<Text style={style.aboutMeText}>{this.props.aboutMeText}</Text>
				</View>
				<Text style={style.recentPostsTitle}>{'RECENT POSTS'}</Text>
				{this.renderRecentPosts()}
			</View>
		);
	};

	private renderRecentPosts = () => {
		return this.props.recentPosts.map((post, i) => (
			<View style={style.wallPostContainer} key={i}>
				<WallPostCard
					{...post}
					canDelete={false}
					onCommentClick={() => this.props.onCommentClick(post.id, null)}
					onImageClick={(index) => this.props.onImageClick(index, post.media || post.Media)}
					// onLikeButtonClick={() => this.props.onLikeClick(post.likedByMe || false, post.id)}
				/>
			</View>
		));
	};

	private scrollUpdated = (rawEvent: any, offsetX: number, offsetY: number) => {
		if (offsetY > GRID_PHOTOS_SCROLL_THRESHOLD && !this.state.isScrolled) {
			this.state.scrollView.scrollToEnd({animated: true});
			this.setState({
				isScrolled: true,
			});
		}
		if (offsetY <= 0 && this.state.isScrolled) {
			this.state.scrollView.scrollTo({x: 0, y: 0, animated: true});
			this.setState({
				isScrolled: false,
			});
		}
	};

	private initLoadMorePhotosHandler = () => {
		const {gridMediaProvider} = this.state;
		const loadedMedia = gridMediaProvider.getAllData();
		const newMedia = this.props.loadMorePhotosHandler();
		const allMedia = [...loadedMedia, ...newMedia];
		this.setState({
			gridMediaProvider: this.state.gridMediaProvider.cloneWithRows(allMedia),
		});
	};

	private onViewMediaFullScreen = (index: number) => {
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects: this.props.allMediaObjects,
			// mediaObjects: this.state.gridMediaProvider.getAllData(),
			startIndex: index,
		});
	};

	private screenRefreshHandler = async () => {
		this.setState({refreshing: true});
		try {
			await this.props.onRefresh();
		} catch (ex) {
			showToastMessage('Could not refresh user profile: ' + ex);
		}
		this.setState({refreshing: false});
	};
}

export default withInlineLoader(UserProfileScreenComponent);
