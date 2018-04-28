import {AvatarImage} from 'components/Avatar';
import {IWallPostCardProp, WallPostCard} from 'components/Displayers';
import {IWithLoaderProps, withInlineLoader} from 'hoc/InlineLoader';
import React, {SFC} from 'react';
import {FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
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
}

const UserFeedScreen: SFC<IUserFeedScreenProps> = (props: IUserFeedScreenProps) => {
	const keyExtractor = (item: any, index: string) => index.toString(); // TODO: use an ID here

	const renderWallPosts = (data: {item: IWallPostCardProp}) => {
		const canDelete = props.currentUser.userId === data.item.owner.userId;
		return (
			<View style={style.wallPostContainer}>
				<WallPostCard
					{...data.item}
					canDelete={canDelete}
					onCommentsButtonClick={() => props.onCommentsButtonClick(data.item)}
				/>
			</View>
		);
	};

	const renderWithLoading = () => {
		return props.renderWithLoader(
			<FlatList
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

	// TODO: @ionut
	const renderNoPosts = () => (
		<View>
			<Text>No Posts Found</Text>
		</View>
	);

	return (
		<View style={style.container}>
			<View style={style.shareMessageContainer}>
				<AvatarImage image={props.avatarImage} style={style.avatarImage} />
				<TouchableWithoutFeedback onPress={props.showNewWallPostPage}>
					<View style={style.shareTextContainer}>
						<Text style={style.shareTextPlaceholder}>{'Share with your friends what you think'}</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
			{!props.noPosts ? renderWithLoading() : renderNoPosts()}
		</View>
	);
};

export default withInlineLoader(UserFeedScreen as any);
