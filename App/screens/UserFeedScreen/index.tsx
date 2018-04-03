import React, {Component} from 'react';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {Images} from '../../theme';
import {NewWallPostData} from '../NewWallPostScreen';
import UserFeedScreenComponent from './screen';

import {graphql} from 'react-apollo';
import {IWallPostCardProp} from '../../components/WallPostCard';
import {createPostHoc, getAllPostsHoc, getUserPostsHoc, userHoc} from '../../graphql';
import {IUserDataResponse} from '../../types/gql';

interface IUserFeedScreenProps {
	navigation: NavigationScreenProp<any>;
	data: IUserDataResponse;
	// TODO: create interface
	Posts: any;
	User: any;
	createPost: any;
}

interface IUserFeedScreenState {
	wallPosts: IWallPostCardProp[];
	refreshing: boolean;
}

const INITIAL_USER_POSTS: IWallPostCardProp[] = [
	{
		title: 'Post title here',
		text: 'Sample existing post text',
		location: 'Tower Bridge, London',
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

	public componentWillReceiveProps(nextProps: IUserFeedScreenProps) {
		const {data, Posts} = nextProps;
		if (data.loading || Posts.loading) {
			return;
		}
		this.setState({wallPosts: this.getWallPosts()});
	}

	public render() {
		const {data, Posts} = this.props;
		if (data.loading || Posts.loading) {
			// TODO: Loading..
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

	private getWallPosts = () => {
		const {Posts, data} = this.props;
		const arty: any[] = [];
		for (let i = 0; i < Posts.allPosts.length; i++) {
			const post = Posts.allPosts[i];
			const res = {
				text: post.text,
				smallAvatar: data.user.avatar,
				fullName: data.user.name,
				timestamp: new Date(post.createdAt),
				numberOfLikes: 0,
				numberOfSuperLikes: 0,
				numberOfComments: 0,
				numberOfWalletCoins: 0,
			};
			arty.push(res);
		}

		return arty;
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

	private addWallPostHandler = async (data: NewWallPostData) => {
		const {createPost} = this.props;
		await createPost({
			variables: {
				text: data.text,
				Media: data.mediaObjects.length > 0 ? data.mediaObjects[0].path : undefined,
			},
		});

		this.refreshWallPosts();
	}

	private refreshWallPosts = async () => {
		this.setState({refreshing: true});

		await this.props.Posts.refetch();

		this.setState({refreshing: false, wallPosts: this.getWallPosts()});
	}
}

const userWrapper = userHoc(UserFeedScreen);
const allPostsWrapper = getAllPostsHoc(userWrapper);
const createPostWrapper = createPostHoc(allPostsWrapper);

export default createPostWrapper;
