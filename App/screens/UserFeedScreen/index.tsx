import React, {Component} from 'react';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {Images} from '../../theme';
import {NewWallPostData} from '../NewWallPostScreen';
import UserFeedScreenComponent from './UserFeed.screen';

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

interface IUserFeedScreenProps {
	navigation: NavigationScreenProp<any>;
}

const USER_FULL_NAME = 'Marcel Füssinger';

export default class UserFeedScreen extends Component<IUserFeedScreenProps, any> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'FEED',
	};

	public render() {
		return (
			<UserFeedScreenComponent
				fullName={USER_FULL_NAME}
				avatarImage={Images.user_avatar_placeholder}
				initialPosts={INITIAL_USER_POSTS}
				loadMorePosts={this.loadMorePostsHandler}
				addWallPost={this.addWallPostHandler}
				showNewWallPostPage={this.showNewWallPostPage}
			/>
		);
	}

	private loadMorePostsHandler = () => {
		alert('loadMorePostsHandler');
		return [];
	}

	private addWallPostHandler = (data: NewWallPostData) => {
		alert('TODO: addWallPostHandler');
		// console.log('addWallPostHandler', data);
	}

	private showNewWallPostPage = () => {
		this.props.navigation.navigate('NewWallPostScreen', {
			fullName: USER_FULL_NAME,
			avatarImage: Images.user_avatar_placeholder,
			postCreate: this.addWallPostHandler,
		});
	}
}
