import {ActivityRecentCommentCard, ActivitySuperLikedCard} from 'components/Activity';
import {FriendRequest, GroupRequest} from 'components/Displayers';
import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {Icons} from 'theme/Icons';
import {NOTIFICATION_TYPES} from './index';
import style from './style';

interface INotificationsScreenComponentProps {
	activityCards: any[];
	refreshing: boolean;
	refreshData: () => void;
	loadMoreNotifications: () => void;
	onPostThumbPressed: (postId: string) => void;
	onSuperLikedPhotoPressed: (postId: string) => void;
	onFriendRequestApproved: (requestId: string) => void;
	onGroupRequestConfirmed: (requestId: string) => void;
}

export default class NotificationsScreenComponent extends Component<INotificationsScreenComponentProps, any> {
	public render() {
		return <View style={style.container}>{this.conditionalRender()}</View>;
	}

	private conditionalRender = () => {
		if (this.props.activityCards.length > 0) {
			return this.renderWithNotifications();
		} else {
			return this.renderNoNotifications();
		}
	}

	private renderNoNotifications = () => {
		return (
			<FlatList
				contentContainerStyle={style.noNotificationsScrollContainer}
				data={['single_item_here']}
				keyExtractor={() => 'single_id_here'}
				renderItem={this.renderOneItemList}
				refreshing={this.props.refreshing}
				onRefresh={this.props.refreshData}
				showsVerticalScrollIndicator={false}
			/>
		);
	}

	private renderOneItemList = () => {
		return (
			<View style={style.emptyContainer}>
				<Image style={style.noNotificationsIcon} source={Icons.iconNotificationsScreenEmpty} resizeMode={'contain'} />
				<Text style={style.noNotificationsText}>{'You have no notifications!'}</Text>
			</View>
		);
	}

	private renderWithNotifications = () => {
		return (
			<FlatList
				data={this.props.activityCards}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderActivityCard}
				onEndReachedThreshold={0.2}
				onEndReached={this.props.loadMoreNotifications}
				refreshing={this.props.refreshing}
				onRefresh={this.props.refreshData}
				ListFooterComponent={this.renderFooterWhenLoading}
			/>
		);
	}

	private keyExtractor = (item: any, index: string) => index.toString(); // TODO: use an ID here

	private renderActivityCard = (data: any) => {
		const activityCardData = data.item;
		if (activityCardData.type === NOTIFICATION_TYPES.RECENT_COMMENT) {
			return <ActivityRecentCommentCard {...activityCardData} onThumbPress={this.props.onPostThumbPressed} />;
		} else if (activityCardData.type === NOTIFICATION_TYPES.FRIEND_REQUEST) {
			return (
				<FriendRequest
					{...activityCardData}
					onRequestConfirmed={() => this.props.onFriendRequestApproved(activityCardData.requestId)}
				/>
			);
		} else if (activityCardData.type === NOTIFICATION_TYPES.SUPER_LIKED) {
			return <ActivitySuperLikedCard {...activityCardData} onThumbPress={this.props.onSuperLikedPhotoPressed} />;
		} else if (activityCardData.type === NOTIFICATION_TYPES.GROUP_REQUEST) {
			return (
				<GroupRequest
					{...activityCardData}
					onGroupConfirmed={() => this.props.onGroupRequestConfirmed(activityCardData.requestId)}
				/>
			);
		}
	}

	private renderFooterWhenLoading = () => {
		return (
			<View style={style.bottomLoadingContainer}>
				<ActivityIndicator size={'small'} />
			</View>
		);
	}
}
