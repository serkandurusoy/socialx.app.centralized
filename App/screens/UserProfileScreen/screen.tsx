import React, {Component} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {GridPhotos} from '../../components/GridPhotos';
import {ProfileStatistics} from '../../components/ProfileStatistics';
import {UserAvatar} from '../../components/UserAvatar';
import {IWallPostCardProp, WallPostCard} from '../../components/WallPostCard';
import {Metrics} from '../../theme';
import style from './style';

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
	loadMorePhotosHandler: () => void;
	totalNumberOfPhotos: number;
	gridPageSize: number;
}

interface IUserProfileScreenComponent {
	isFollowed: boolean;
	scrollView: any;
	isScrolled: boolean;
}

export default class UserProfileScreenComponent extends Component<
	IUserProfileScreenProps,
	IUserProfileScreenComponent
> {
	public static getDerivedStateFromProps(
		nextProps: Readonly<IUserProfileScreenProps>,
		prevState: Readonly<IUserProfileScreenComponent>,
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

	public state = {
		scrollView: null,
		isScrolled: false,
		isFollowed: this.props.isFollowed,
	};

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
				<GridPhotos
					onScroll={this.scrollUpdated}
					loadMorePhotos={this.props.loadMorePhotosHandler}
					itemPressed={this.onPhotoPressHandler}
				/>
			</View>
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
					<WallPostCard {...this.props.recentPosts[i]} />
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

	private onPhotoPressHandler = () => {
		alert('TBD:onPhotoPressHandler');
	}
}
