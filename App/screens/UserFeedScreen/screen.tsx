import {AvatarImage} from 'components/Avatar';
import {IWallPostCardProp, WallPostCard} from 'components/Displayers';
import {IWithLoaderProps, withInlineLoader} from 'hoc/InlineLoader';
import React, {SFC} from 'react';
import {FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from 'theme';
import {IUserQuery} from 'types';
import style from './style';

interface IUserFeedScreenProps extends IWithLoaderProps {
	avatarImage: any;
	wallPosts: IWallPostCardProp[];
	refreshing: boolean;
	loadMorePosts: () => void;
	refreshData: () => void;
	addWallPost: (data: any) => void;
	showNewWallPostPage: () => void;
	onCommentsButtonClick: (wallPostData: IWallPostCardProp) => void;
	currentUser: IUserQuery;
	noPosts: boolean;
	hideShareSection?: boolean;
	onMediaPress: any;
	onLikePress: any;
	onPostDeletePress: any;
}

const UserFeedScreen: SFC<IUserFeedScreenProps> = (props: IUserFeedScreenProps) => {
	const keyExtractor = (item: any, index: string) => index.toString(); // TODO: use an ID here

	const renderWallPosts = (data: {item: IWallPostCardProp}) => {
		const canDelete = props.currentUser.userId === data.item.owner.userId;
		const likedByMe = !!data.item.likes.find((like: IUserQuery) => like.userId === props.currentUser.userId)
		return (
			<View style={style.wallPostContainer}>
				<WallPostCard
					{...data.item}
					canDelete={canDelete}
					likedByMe={likedByMe}
					onCommentsButtonClick={() => props.onCommentsButtonClick(data.item)}
					onImageClick={() => props.onMediaPress(0, data.item.media)}
					onDeleteClick={() => props.onPostDeletePress(data.item.id)}
					onLikeButtonClick={() => props.onLikePress(likedByMe, data.item.id)}
				/>
			</View>
		);
	};

	const renderWithLoading = () => {
		return props.renderWithLoader(
			<FlatList
				windowSize={5}
				refreshing={props.refreshing}
				onRefresh={props.refreshData}
				data={props.wallPosts}
				keyExtractor={keyExtractor}
				renderItem={renderWallPosts}
				onEndReached={props.loadMorePosts}
				onEndReachedThreshold={0.2}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
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
		}
		return null;
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
