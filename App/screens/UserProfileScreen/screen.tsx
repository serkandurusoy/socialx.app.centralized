import React, {Component} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {LayoutEvent} from 'react-navigation';
import {GridPhotos} from '../../components/GridPhotos';
import {ProfileStatistics} from '../../components/ProfileStatistics';
import {UserAvatar} from '../../components/UserAvatar';
import {WallPostCard} from '../../components/WallPostCard';
import {Metrics} from '../../theme';
import style from './style';

const SCREEN_HEIGHT = Dimensions.get('window').height;

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
	recentPosts: any[];
	loadMorePhotosHandler: () => void;
	totalNumberOfPhotos: number;
	gridPageSize: number;
}

export default class UserProfileScreenComponent extends Component<IUserProfileScreenProps, any> {
	private scrollView: any;

	private topContainerHeight = 0;

	public render() {
		return (
			<ScrollView
				style={style.container}
				contentContainerStyle={style.scrollContainer}
				showsVerticalScrollIndicator={false}
				ref={(ref: any) => (this.scrollView = ref)}
			>
				<View style={style.topContainer} onLayout={this.topContainerLayoutHandler}>
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

	private topContainerLayoutHandler = (event: LayoutEvent) => {
		this.topContainerHeight = event.nativeEvent.layout.height + 10;
	}

	private conditionalRendering = () => {
		if (this.props.isFollowed) {
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
		if (offsetY < this.topContainerHeight) {
			// this.scrollView.scrollTo({x: 0, y: offsetY, animated: false});
			this.scrollView.scrollToEnd({animated: true});
		}
	}

	private onPhotoPressHandler = () => {
		alert('TBD:onPhotoPressHandler');
	}
}
