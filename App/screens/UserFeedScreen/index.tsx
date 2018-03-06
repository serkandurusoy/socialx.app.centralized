import React, {Component} from 'react';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {Images} from '../../theme';
import {NewWallPostData} from '../NewWallPostScreen';
import UserFeedScreenComponent from './UserFeed.screen';

const USER_FULL_NAME = 'Marcel Füssinger';

const INITIAL_USER_POSTS = [
	{
		text:
			'This is a very long text that will be truncated and only the first 3 lines will be displayed. ' +
			'Then ellipsis will show to indicate that more text is hidden. ' +
			'To a general advertiser outdoor advertising is worthy of consideration',
		imageSource: 'https://c1.staticflickr.com/8/7378/13997705508_a218e00c81_b.jpg',
		smallAvatar: 'https://s.yimg.com/pw/images/buddyicon00.png',
		fullName: 'Tom Thompson',
		timestamp: new Date('Jan 20 2018'),
		numberOfLikes: 20,
		numberOfSuperLikes: 4,
		numberOfComments: 3,
		numberOfWalletCoins: 5,
	},
	{
		text: 'Hey, my first post to SocialX network!',
		imageSource: 'https://placeimg.com/640/550/any',
		smallAvatar: 'https://placeimg.com/120/120/people',
		fullName: 'Ionut Movila',
		timestamp: new Date('Jun 17 2017'),
		numberOfLikes: 11,
		numberOfSuperLikes: 6,
		numberOfComments: 4,
		numberOfWalletCoins: 2,
	},
];

export interface IWallPostData {
	text: string;
	imageSource?: string;
	smallAvatar: string;
	fullName: string;
	timestamp: Date;
	numberOfLikes: number;
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
}

interface IUserFeedScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface IUserFeedScreenState {
	wallPosts: IWallPostData[];
	refreshing: boolean;
}

export default class UserFeedScreen extends Component<IUserFeedScreenProps, IUserFeedScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'FEED',
	};

	public state = {
		wallPosts: INITIAL_USER_POSTS,
		refreshing: false,
	};

	public render() {
		return (
			<UserFeedScreenComponent
				refreshing={this.state.refreshing}
				refreshData={this.refreshWallPosts}
				fullName={USER_FULL_NAME}
				avatarImage={Images.user_avatar_placeholder}
				wallPosts={this.state.wallPosts}
				loadMorePosts={this.loadMorePostsHandler}
				addWallPost={this.addWallPostHandler}
				showNewWallPostPage={this.showNewWallPostPage}
			/>
		);
	}

	private showNewWallPostPage = () => {
		this.props.navigation.navigate('NewWallPostScreen', {
			fullName: USER_FULL_NAME,
			avatarImage: Images.user_avatar_placeholder,
			postCreate: this.addWallPostHandler,
		});
	}

	private loadMorePostsHandler = () => {
		this.setState({
			wallPosts: this.state.wallPosts.concat(INITIAL_USER_POSTS),
		});
	}

	private addWallPostHandler = (data: NewWallPostData) => {
		const newPost: IWallPostData = {
			text: data.text,
			imageSource: data.mediaObjects.length > 0 ? data.mediaObjects[0].path : undefined,
			smallAvatar: 'https://placeimg.com/110/110/people',
			fullName: 'Ionut Movila',
			timestamp: new Date(),
			numberOfLikes: 0,
			numberOfSuperLikes: 0,
			numberOfComments: 0,
			numberOfWalletCoins: 0,
		};
		this.setState({
			wallPosts: [newPost].concat(this.state.wallPosts),
		});
	}

	private refreshWallPosts = () => {
		this.setState({
			refreshing: true,
		});
		setTimeout(() => {
			this.setState({
				refreshing: false,
				wallPosts: INITIAL_USER_POSTS,
			});
		}, 1500);
	}
}
