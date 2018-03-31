import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import MyProfileScreenComponent from './screen';

const GRID_PAGE_SIZE = 20;
const GRID_MAX_RESULTS = 500;

const FULL_NAME = 'Lester Wheeler';
const USER_BIG_AVATAR_URL = 'https://placeimg.com/240/240/people';
const USER_NAME = 'LesterWheeler';

const INITIAL_STATE = {
	numberOfPhotos: 13,
	numberOfLikes: 24,
	numberOfFollowers: 13401,
	numberOfFollowing: 876324,
	avatarURL: USER_BIG_AVATAR_URL,
	fullName: FULL_NAME,
	username: USER_NAME,
};

interface IMyProfileScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface IMyProfileScreenState {
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	avatarURL: any;
	fullName: string;
	username?: string;
}

export default class MyProfileScreen extends Component<IMyProfileScreenProps, IMyProfileScreenState> {
	private static navigationOptions = {
		title: 'PROFILE',
	};

	public state = INITIAL_STATE;

	private lastLoadedPhotoIndex = 0;

	public render() {
		return (
			<MyProfileScreenComponent
				totalNumberOfPhotos={GRID_MAX_RESULTS}
				gridPageSize={GRID_PAGE_SIZE}
				numberOfPhotos={this.state.numberOfPhotos}
				numberOfLikes={this.state.numberOfLikes}
				numberOfFollowers={this.state.numberOfFollowers}
				numberOfFollowing={this.state.numberOfFollowing}
				avatarURL={this.state.avatarURL}
				fullName={this.state.fullName}
				username={this.state.username}
				loadMorePhotosHandler={() => this.loadMorePhotosHandler(GRID_PAGE_SIZE, GRID_MAX_RESULTS)}
				getAllPhotos={this.getAllPhotos}
				navigation={this.props.navigation}
			/>
		);
	}

	private loadMorePhotosHandler = (numberOfResults: number, maxResults: number) => {
		const ret = [];
		const endIndex = this.lastLoadedPhotoIndex + numberOfResults;
		for (let i = this.lastLoadedPhotoIndex; i < endIndex; i++) {
			if (this.lastLoadedPhotoIndex < maxResults) {
				ret.push({
					url: 'https://avatars2.githubusercontent.com/u/' + i,
					index: i,
				});
				this.lastLoadedPhotoIndex++;
			}
		}
		return ret;
	}

	private getAllPhotos = () => {
		const ret = [];
		for (let i = 0; i < GRID_MAX_RESULTS; i++) {
			ret.push({
				url: 'https://avatars2.githubusercontent.com/u/' + i,
				index: i,
			});
		}
		return ret;
	}
}
