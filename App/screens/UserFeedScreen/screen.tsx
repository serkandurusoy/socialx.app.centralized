import {AvatarImage} from 'components/Avatar';
import {IWallPostCardProp, WallPostCard} from 'components/Displayers';
import {IWithLoaderProps, withInlineLoader} from 'hoc/InlineLoader';
import React, {SFC} from 'react';
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
	onLikePress: () => Promise<any>;
	onPostDeletePress: any;
	onUserPress: any;
	loadingMore: boolean;
	hasMore: boolean;
}

const UserFeedScreen: SFC<IUserFeedScreenProps> = (props: IUserFeedScreenProps) => {
	const keyExtractor = (item: IWallPostCardProp, index: number) => item.id;

	const renderWallPosts = (data: {item: IWallPostCardProp}) => {
		const canDelete = props.currentUser.userId === data.item.owner.userId;
		const likedByMe = !!data.item.likes.find((like: IUserQuery) => like.userId === props.currentUser.userId);
		return (
			<View style={style.wallPostContainer}>
				<WallPostCard
					{...data.item}
					canDelete={canDelete}
					likedByMe={likedByMe}
					onCommentClick={(startComment: boolean) =>
						props.onCommentPress(data.item.id, data.item.owner.userId, startComment)
					}
					onImageClick={(index) => props.onMediaPress(index, data.item.media)}
					onDeleteClick={() => props.onPostDeletePress(data.item.id)}
					onLikeButtonClick={() => props.onLikePress(likedByMe, data.item.id)}
					onUserClick={(userId) => props.onUserPress(userId)}
				/>
			</View>
		);
	};

	const renderFooterWhenLoading = () => {
		if (props.hasMore) {
			return (
				<View style={style.bottomLoadingContainer}>
					<ActivityIndicator size={'large'} />
				</View>
			);
		}
		return null;
	};

	const renderWithLoading = () => {
		// TODO: @jake @serkan let's refactor this!
		return props.renderWithLoader(
			<FlatList
				windowSize={5}
				refreshing={props.refreshing}
				onRefresh={props.refreshData}
				data={props.wallPosts}
				keyExtractor={keyExtractor}
				renderItem={renderWallPosts}
				onEndReached={props.loadMorePosts}
				onEndReachedThreshold={1}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
				ListFooterComponent={renderFooterWhenLoading}
			/>,
		);
	};

	const renderNoPosts = () => (
		<View style={style.noPostsContainer}>
			<Icon name={'md-film'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
			<Text style={style.noPostsText}>{'Your feed is empty. Start adding your first post!'}</Text>
		</View>
	);

	const renderShareSection = () => {
		if (!props.hideShareSection) {
			return (
				<View style={style.shareMessageContainer}>
					<AvatarImage image={props.avatarImage} style={style.avatarImage} />
					<TouchableWithoutFeedback onPress={props.showNewWallPostPage}>
						<View style={style.shareTextContainer}>
							<Text style={style.shareTextPlaceholder}>{'Share with your friends what you think'}</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			);
		} else {
			return (
				<View style={style.shareMessageContainer}>
					<AvatarImage image={props.avatarImage} style={style.avatarImage} />
					<TouchableWithoutFeedback onPress={props.showNewWallPostPage}>
						<View style={style.shareTextContainer}>
							<Text style={style.shareTextPlaceholder}>{'Share with the world what you think'}</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			);
		}
	};

	return (
		<View style={style.container}>
			{renderShareSection()}
			{!props.noPosts ? renderWithLoading() : renderNoPosts()}
		</View>
	);
};

UserFeedScreen.defaultProps = {
	hideShareSection: false,
};

export default withInlineLoader(UserFeedScreen as any);
