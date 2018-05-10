import React, {Component, ReactText} from 'react';
import {Dimensions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {DataProvider} from 'recyclerlistview';

import {
	IWallPostCardProp,
	MediaObjectViewer,
	NewGridPhotos,
	ProfileStatistics,
	UserAvatar,
	WallPostCard,
} from 'components';
import {Metrics} from 'theme';
import {IMediaViewerObject, ISimpleMediaObject} from 'types';
import {getTypePropsForMediaViewerObject, getURLForMediaViewerObject} from 'utilities';
import style, {USER_MEDIA_THUMB_SIZE} from './style';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const GRID_PHOTOS_SCROLL_THRESHOLD = 150;

interface IUserProfileScreenProps {
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
}

interface IUserProfileScreenComponentState {
	isFollowed: boolean;
	scrollView: any;
	isScrolled: boolean;
	gridMediaProvider: DataProvider;
}

export default class UserProfileScreenComponent extends Component<
	IUserProfileScreenProps,
	IUserProfileScreenComponentState
> {
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
		};
	}

	public render() {
		return (
			<ScrollView
				scrollEnabled={!this.state.isFollowed}
				style={style.container}
				contentContainerStyle={style.scrollContainer}
				showsVerticalScrollIndicator={false}
				ref={this.setScrollView}
			>
				<View style={style.topContainer}>
					<UserAvatar
						avatarURL={{uri: this.props.avatarURL}}
						fullName={this.props.fullName}
						username={this.props.username}
					/>
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

	private setScrollView = (ref: any) => {
		this.setState({
			scrollView: ref,
		});
	}

	private conditionalRendering = () => {
		if (this.state.isFollowed) {
			return this.renderFollowedState();
		} else {
			return this.renderNotFollowedState();
		}
	}

	private renderFollowedState = () => {
		const gridPhotosStyles = [style.gridPhotosContainer];
		if (this.props.totalNumberOfPhotos > this.props.gridPageSize) {
			const recyclerHeight = SCREEN_HEIGHT - Metrics.navBarHeight;
			gridPhotosStyles.push({
				height: recyclerHeight,
			});
		}
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
	}

	private renderGridItemHandler = (type: ReactText, mediaData: IMediaViewerObject) => {
		const mediaURL = getURLForMediaViewerObject(mediaData);
		const mediaTypeProps = getTypePropsForMediaViewerObject(mediaData);
		return (
			<TouchableOpacity onPress={() => this.onPhotoPressHandler(mediaData.index)}>
				<MediaObjectViewer {...mediaTypeProps} uri={mediaURL} style={style.userMediaThumb} thumbOnly={true} />
			</TouchableOpacity>
		);
	}

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
	}

	private renderRecentPosts = () => {
		const ret = [];
		for (let i = 0; i < this.props.recentPosts.length; i++) {
			ret.push(
				<View style={style.wallPostContainer} key={i}>
					<WallPostCard {...this.props.recentPosts[i]} canDelete={false} />
				</View>,
			);
		}
		return ret;
	}

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
	}

	private initLoadMorePhotosHandler = () => {
		const {gridMediaProvider} = this.state;
		const loadedMedia = gridMediaProvider.getAllData();
		const newMedia = this.props.loadMorePhotosHandler();
		const allMedia = loadedMedia.concat(newMedia);
		this.setState({
			gridMediaProvider: this.state.gridMediaProvider.cloneWithRows(allMedia),
		});
	}

	private onPhotoPressHandler = (index: number) => {
		alert('TBD:onPhotoPressHandler ' + index);
	}
}
