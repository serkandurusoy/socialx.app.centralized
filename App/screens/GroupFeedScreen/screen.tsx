import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
import {AvatarImage} from '../../components/AvatarImage';
import {WallPostCard} from '../../components/WallPostCard';
import style from './style';

interface IGroupFeedScreenProps {
	avatarImage: any;
	wallPosts: any[];
	fullName: string;
	refreshing: boolean;
	loadMorePosts: () => void;
	refreshData: () => void;
	addWallPost: (data: any) => void;
	showNewWallPostPage: () => void;
}

export interface IGroupFeedScreenComponentState {}

export default class GroupFeedScreenComponent extends Component<IGroupFeedScreenProps, IGroupFeedScreenComponentState> {
	public static defaultProps: Partial<IGroupFeedScreenProps> = {};

	public render() {
		return (
			<View style={style.container}>
				<View style={style.shareMessageContainer}>
					<AvatarImage image={this.props.avatarImage} style={style.avatarImage} />
					<TouchableWithoutFeedback onPress={this.props.showNewWallPostPage}>
						<View style={style.shareTextContainer}>
							<Text style={style.shareTextPlaceholder}>{'Share with your group what you think'}</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<FlatList
					refreshing={this.props.refreshing}
					onRefresh={this.props.refreshData}
					data={this.props.wallPosts}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderWallPosts}
					onEndReached={this.props.loadMorePosts}
					onEndReachedThreshold={0.2}
					alwaysBounceVertical={false}
					keyboardShouldPersistTaps={'handled'}
					ListFooterComponent={this.renderFooterWhenLoading}
				/>
			</View>
		);
	}

	private keyExtractor = (item: any, index: string) => index.toString(); // TODO: use an ID here

	private renderWallPosts = (data: any) => {
		return (
			<View style={style.wallPostContainer}>
				<WallPostCard {...data.item} />
			</View>
		);
	}

	private renderFooterWhenLoading = () => {
		return (
			<View style={style.bottomLoadingContainer}>
				<ActivityIndicator size={'small'} />
			</View>
		);
	}
}
