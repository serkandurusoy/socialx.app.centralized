import {AvatarImage} from 'components/Avatar';
import {IWallPostCardProp, WallPostCard} from 'components/Displayers';
import {IWithLoaderProps, withInlineLoader} from 'hoc/InlineLoader';
import React, {Component, RefObject} from 'react';
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
	shareSectionPlaceholder: string | null;
	onLikePress: (likedByMe?: boolean, postId?: string) => Promise<any>;
	onPostDeletePress: any;
	onUserPress: any;
	loadingMore: Promise<boolean>;
	hasMore: boolean;
	onAddCommentPress: (scrollRef: any, scrollYOffset: number, cardHeight: number) => void;
	listLoading: boolean;
}

interface IUserFeedScreenState {
	fetchingMore: boolean;
}

const FeedWithNoPosts: React.SFC = () => (
	<View style={style.noPostsContainer}>
		<Icon name={'md-film'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
		<Text style={style.noPostsText}>{'Your feed is empty. Start adding your first post!'}</Text>
	</View>
);

const LoadingFooter: React.SFC<any> = ({hasMore}) => {
	if (hasMore) {
		return (
			<View style={style.bottomLoadingContainer}>
				<ActivityIndicator size={'large'} />
			</View>
		);
	}
	return null;
};

const ShareSection: React.SFC<any> = ({sharePlaceholder, avatarImage, showNewWallPostPage}) => (
	<View style={style.shareMessageContainer}>
		<AvatarImage image={avatarImage} style={style.avatarImage} />
		<TouchableWithoutFeedback onPress={showNewWallPostPage}>
			<View style={style.shareTextContainer}>
				<Text style={style.shareTextPlaceholder}>{sharePlaceholder}</Text>
			</View>
		</TouchableWithoutFeedback>
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
	};

	public render() {
		const {avatarImage, showNewWallPostPage, shareSectionPlaceholder, noPosts} = this.props;

		return (
			<View style={style.container}>
				{shareSectionPlaceholder && (
					<ShareSection
						avatarImage={avatarImage}
						showNewWallPostPage={showNewWallPostPage}
						sharePlaceholder={shareSectionPlaceholder}
					/>
				)}
				{noPosts ? (
					<FeedWithNoPosts />
				) : (
					<FlatList
						ref={this.scrollRef}
						windowSize={10}
						refreshing={this.props.refreshing}
						onRefresh={this.props.refreshData}
						data={this.props.wallPosts}
						keyExtractor={this.keyExtractor}
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
						ListFooterComponent={<LoadingFooter hasMore={this.props.hasMore} />}
						onScrollToIndexFailed={() => {}}
					/>
				)}
			</View>
		);
	}

	private readonly scrollRef: RefObject<FlatList<IWallPostCardProp>> = React.createRef();

	private keyExtractor = (item: IWallPostCardProp, index: number) => item.id;

	private renderWallPosts = (data: {item: IWallPostCardProp; index: number}) => {
		const canDelete = this.props.currentUser.userId === data.item.owner.userId;
		const likedByMe = !!data.item.likes.find((like: IUserQuery) => like.userId === this.props.currentUser.userId);
		return (
			<View style={style.wallPostContainer}>
				<WallPostCard
					{...data.item}
					canDelete={canDelete}
					likedByMe={likedByMe}
					listLoading={this.props.listLoading}
					currentUser={this.props.currentUser}
					onCommentClick={(startComment: boolean) =>
						this.props.onCommentPress(data.item.id, data.item.owner.userId, startComment)
					}
					onImageClick={(index: number) => this.props.onMediaPress(index, data.item.media)}
					onDeleteClick={() => this.props.onPostDeletePress(data.item.id)}
					onLikeButtonClick={() => this.props.onLikePress(likedByMe, data.item.id)}
					onUserClick={(userId: string) => this.props.onUserPress(userId)}
					onAddComment={(cardHeight: number) => this.onAddCommentPressHandler(data.index, cardHeight)}
				/>
			</View>
		);
	};

	private onAddCommentPressHandler = (index: number, cardHeight: number) => {
		this.props.onAddCommentPress(this.scrollRef, index, cardHeight);
	};
}

export default withInlineLoader(UserFeedScreen);
