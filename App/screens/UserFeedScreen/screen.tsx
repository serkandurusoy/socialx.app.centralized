import {AvatarImage} from 'components/Avatar';
import {IWallPostCardProp, WallPostCard} from 'components/Displayers';
import {IWithLoaderProps, withInlineLoader} from 'hoc/InlineLoader';
import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from 'theme';
import {IMediaProps, IUserQuery} from 'types';
import style from './style';

interface IUserFeedScreenProps extends IWithLoaderProps {
	avatarImage: any;
	wallPosts: IWallPostCardProp[];
	refreshing: boolean;
	loadMorePosts: () => void;
	refreshData: () => void;
	addWallPost: (data: any) => void;
	showNewWallPostPage: () => void;
	onMediaPress: (index: any, medias: IMediaProps[]) => void;
	onCommentPress: (postId: any, owner: any, startComment: boolean) => void;
	currentUser: IUserQuery;
	noPosts: boolean;
	hideShareSection?: boolean;
	onLikePress: (likedByMe?: boolean, postId?: string) => Promise<any>;
	onPostDeletePress: any;
	onUserPress: any;
	loadingMore: Promise<boolean>;
	hasMore: boolean;
}

interface IUserFeedScreenState {
	fetchingMore: boolean;
}

const renderNoPosts = () => (
	<View style={style.noPostsContainer}>
		<Icon name={'md-film'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
		<Text style={style.noPostsText}>{'Your feed is empty. Start adding your first post!'}</Text>
	</View>
);

class UserFeedScreen extends Component<IUserFeedScreenProps, IUserFeedScreenState> {
	// public shouldComponentUpdate(nextProps: IUserFeedScreenProps) {
	// 	if (nextProps.wallPosts.length !== this.props.wallPosts.length) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	public state = {
		fetchingMore: false,
	}

	public renderShareSection = () => {
		if (!this.props.hideShareSection) {
			return (
				<View style={style.shareMessageContainer}>
					<AvatarImage image={this.props.avatarImage} style={style.avatarImage} />
					<TouchableWithoutFeedback onPress={this.props.showNewWallPostPage}>
						<View style={style.shareTextContainer}>
							<Text style={style.shareTextPlaceholder}>{'Share with your friends what you think'}</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			);
		} else {
			return (
				<View style={style.shareMessageContainer}>
					<AvatarImage image={this.props.avatarImage} style={style.avatarImage} />
					<TouchableWithoutFeedback onPress={this.props.showNewWallPostPage}>
						<View style={style.shareTextContainer}>
							<Text style={style.shareTextPlaceholder}>{'Share with the world what you think'}</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			);
		}
	};
	public renderWallPosts = (data: {item: IWallPostCardProp}) => {
		const canDelete = this.props.currentUser.userId === data.item.owner.userId;
		const likedByMe = !!data.item.likes.find((like: IUserQuery) => like.userId === this.props.currentUser.userId);
		console.log('likedByMe', likedByMe);
		console.log('data.item.likedByMe', data.item.likedByMe);
		return (
			<View style={style.wallPostContainer}>
				<WallPostCard
					{...data.item}
					canDelete={canDelete}
					likedByMe={likedByMe}
					onCommentClick={(startComment: boolean) =>
						this.props.onCommentPress(data.item.id, data.item.owner.userId, startComment)
					}
					onImageClick={(index: number) => this.props.onMediaPress(index, data.item.media)}
					onDeleteClick={() => this.props.onPostDeletePress(data.item.id)}
					onLikeButtonClick={() => this.props.onLikePress(likedByMe, data.item.id)}
					onUserClick={(userId: string) => this.props.onUserPress(userId)}
				/>
			</View>
		);
	};

	public renderFooterWhenLoading = () => {
		if (this.props.hasMore) {
			return (
				<View style={style.bottomLoadingContainer}>
					<ActivityIndicator size={'large'} />
				</View>
			);
		}
		return <View />;
	};

	public renderWithLoading = () => {
		// TODO: @jake @serkan let's refactor this!
		const keyExtractor = (item: IWallPostCardProp, index: number) => item.id;
		return this.props.renderWithLoader(
			<FlatList
				windowSize={10}
				refreshing={this.props.refreshing}
				onRefresh={this.props.refreshData}
				data={this.props.wallPosts}
				keyExtractor={keyExtractor}
				renderItem={this.renderWallPosts}
				onEndReached={async () => {
					if (!this.props.isLoading && this.props.hasMore && !this.state.fetchingMore) {
						this.setState({fetchingMore: true}, async () => {
							await this.props.loadMorePosts();
							this.setState({fetchingMore: false});
						});
					}
				}}
				onEndReachedThreshold={0.5}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
				ListFooterComponent={this.renderFooterWhenLoading}
			/>,
		);
	};
	public render() {
		return (
			<View style={style.container}>
				{this.renderShareSection()}
				{!this.props.noPosts ? this.renderWithLoading() : renderNoPosts()}
			</View>
		);
	}
}

export default withInlineLoader(UserFeedScreen as any);
