import React, {SFC} from 'react';
import {FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
import {AvatarImage} from '../../components/Avatar';
import {IWallPostCardProp, WallPostCard} from '../../components/Displayers';
import style from './style';

interface IUserFeedScreenProps {
	avatarImage: any;
	wallPosts: IWallPostCardProp[];
	fullName: string;
	refreshing: boolean;
	loadMorePosts: () => void;
	refreshData: () => void;
	addWallPost: (data: any) => void;
	showNewWallPostPage: () => void;
}

const UserFeedScreen: SFC<IUserFeedScreenProps> = (props: IUserFeedScreenProps) => {
	const keyExtractor = (item: any, index: string) => index.toString(); // TODO: use an ID here

	const renderWallPosts = (data: {item: IWallPostCardProp}) => {
		return (
			<View style={style.wallPostContainer}>
				<WallPostCard {...data.item} />
			</View>
		);
	};

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
			/>
		</View>
	);
};

export default UserFeedScreen;
