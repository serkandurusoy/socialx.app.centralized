import React, {Component} from 'react';
import {Platform} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {TitleWithSubtitle} from '../../components/TitleWithSubtitle';
import {OS_TYPES} from '../../constants';
import {Colors, Images} from '../../theme';
import {NewWallPostData} from '../NewWallPostScreen';
import GroupFeedScreenComponent from './screen';

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

export interface IGroupPostData {
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

interface IGroupFeedScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface IGroupFeedScreenState {
	groupPosts: IGroupPostData[];
	refreshing: boolean;
}

export default class GroupScreen extends Component<IGroupFeedScreenProps, IGroupFeedScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		headerTitle: <TitleWithSubtitle title={'TESTGROUP'} subtitle={'Some subtitle example text'} />,
		headerStyle: {
			backgroundColor: Colors.pink,
			height: Platform.OS === OS_TYPES.iOS ? 52 : 54,
		},
	};

	public state = {
		groupPosts: INITIAL_USER_POSTS,
		refreshing: false,
	};

	public render() {
		return (
			<GroupFeedScreenComponent
				refreshing={this.state.refreshing}
				refreshData={this.refreshGroupPosts}
				fullName={USER_FULL_NAME}
				avatarImage={Images.user_avatar_placeholder}
				groupPosts={this.state.groupPosts}
				loadMorePosts={this.loadMorePostsHandler}
				addGroupPost={this.addGroupPostHandler}
				showNewGroupPostPage={this.showNewGroupPostPage}
			/>
		);
	}

	private showNewGroupPostPage = () => {
		this.props.navigation.navigate('NewWallPostScreen', {
			fullName: USER_FULL_NAME,
			avatarImage: Images.user_avatar_placeholder,
			postCreate: this.addGroupPostHandler,
		});
	}

	private loadMorePostsHandler = () => {
		this.setState({
			groupPosts: this.state.groupPosts.concat(INITIAL_USER_POSTS),
		});
	}

	private addGroupPostHandler = (data: NewWallPostData) => {
		const newPost: IGroupPostData = {
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
			groupPosts: [newPost].concat(this.state.groupPosts),
		});
	}

	private refreshGroupPosts = () => {
		this.setState({
			refreshing: true,
		});
		setTimeout(() => {
			this.setState({
				refreshing: false,
				groupPosts: INITIAL_USER_POSTS,
			});
		}, 1500);
	}
}
