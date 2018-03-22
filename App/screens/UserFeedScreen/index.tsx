import React, {Component} from 'react';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {Images} from '../../theme';
import {NewWallPostData} from '../NewWallPostScreen';
import UserFeedScreenComponent from './screen';

import {graphql} from 'react-apollo';
import {user} from '../../graphql';
import {IUserDataResponse} from '../../types/gql';

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
	data: IUserDataResponse;
}

interface IUserFeedScreenState {
	wallPosts: IWallPostData[];
	refreshing: boolean;
}

const INITIAL_USER_POSTS: IWallPostData[] = [
	{
		text: 'text',
		smallAvatar: 'https://placeimg.com/110/110/people',
		fullName: 'Ionut Movila',
		timestamp: new Date(),
		numberOfLikes: 0,
		numberOfSuperLikes: 0,
		numberOfComments: 0,
		numberOfWalletCoins: 0,
	},
];

class UserFeedScreen extends Component<IUserFeedScreenProps, IUserFeedScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'FEED',
	};

	public state = {
		wallPosts: INITIAL_USER_POSTS,
		refreshing: false,
	};

	public render() {
		const {data} = this.props;
		if (data.loading) {
			return (
				<UserFeedScreenComponent
					refreshing={this.state.refreshing}
					refreshData={this.refreshWallPosts}
					fullName={''}
					avatarImage={Images.user_avatar_placeholder}
					wallPosts={this.state.wallPosts}
					loadMorePosts={this.loadMorePostsHandler}
					addWallPost={this.addWallPostHandler}
					showNewWallPostPage={this.showNewWallPostPage}
				/>
			);
		}
		return (
			<UserFeedScreenComponent
				refreshing={this.state.refreshing}
				refreshData={this.refreshWallPosts}
				fullName={this.props.data.user.name}
				avatarImage={{uri: this.props.data.user.avatar}}
				wallPosts={this.state.wallPosts}
				loadMorePosts={this.loadMorePostsHandler}
				addWallPost={this.addWallPostHandler}
				showNewWallPostPage={this.showNewWallPostPage}
			/>
		);
	}

	private showNewWallPostPage = () => {
		this.props.navigation.navigate('NewWallPostScreen', {
			fullName: this.props.data.user.name,
			avatarImage: {uri: this.props.data.user.avatar},
			postCreate: this.addWallPostHandler,
		});
	}

	private loadMorePostsHandler = () => {
		// TODO
		// this.setState({
		// 	wallPosts: this.state.wallPosts.concat(INITIAL_USER_POSTS),
		// });
	}

	private addWallPostHandler = (data: NewWallPostData) => {
		// TODO
		// const newPost: IWallPostData = {
		// 	text: data.text,
		// 	imageSource: data.mediaObjects.length > 0 ? data.mediaObjects[0].path : undefined,
		// 	smallAvatar: 'https://placeimg.com/110/110/people',
		// 	fullName: 'Ionut Movila',
		// 	timestamp: new Date(),
		// 	numberOfLikes: 0,
		// 	numberOfSuperLikes: 0,
		// 	numberOfComments: 0,
		// 	numberOfWalletCoins: 0,
		// };
		// this.setState({
		// 	wallPosts: [newPost].concat(this.state.wallPosts),
		// });
	}

	private refreshWallPosts = async () => {
		this.setState({
			refreshing: true,
		});

		await this.props.data.refetch();

		this.setState({
			refreshing: false,
			// TODO
			wallPosts: INITIAL_USER_POSTS,
		});
	}
}

export default graphql(user)(UserFeedScreen as any);
