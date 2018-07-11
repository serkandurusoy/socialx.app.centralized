import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';

import {
	ActivityRecentCommentCard,
	ActivitySuperLikedCard,
	FriendRequest,
	GroupRequest,
	NotificationGI,
} from 'components';
import {IWithLoaderProps, withInlineLoader} from 'hoc';
import {Icons} from 'theme';
import {NOTIFICATION_TYPES} from 'types';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

interface INotificationsScreenComponentProps extends IWithLoaderProps {
	activityCards: any[];
	refreshing: boolean;
	refreshData: () => void;
	onPostThumbPressed: (postId: string) => void;
	onSuperLikedPhotoPressed: (postId: string) => void;
	onFriendRequestApproved: (requestId: string) => void;
	onFriendRequestDeclined: (requestId: string) => void;
	onGroupRequestConfirmed: (requestId: string) => void;
	onGroupRequestDeclined: (requestId: string) => void;
	onCheckNotification: (requestId: string) => void;
	onViewUserProfile: (userId: string) => void;
	loadingConfirmed: {};
	loadingDeclined: {};
}

interface IActivityCardsProps {
	activityCardData: any;
	onPostThumbPressed: (postId: string) => void;
	onSuperLikedPhotoPressed: (postId: string) => void;
	onFriendRequestApproved: (requestId: string) => void;
	onFriendRequestDeclined: (requestId: string) => void;
	onGroupRequestConfirmed: (requestId: string) => void;
	onGroupRequestDeclined: (requestId: string) => void;
	onCheckNotification: (requestId: string) => void;
	onViewUserProfile: (userId: string) => void;
	loadingConfirmed: {};
	loadingDeclined: {};
}

const EmptyListComponent: React.SFC<IWithTranslationProps> = withTranslations(({getText}) => (
	<View style={style.emptyContainer}>
		<Image style={style.noNotificationsIcon} source={Icons.iconNotificationsScreenEmpty} resizeMode={'contain'} />
		<Text style={style.noNotificationsText}>{getText('notifications.empty.list')}</Text>
	</View>
));

const ActivityCard: React.SFC<IActivityCardsProps> = ({
	activityCardData,
	onPostThumbPressed,
	loadingConfirmed,
	loadingDeclined,
	onFriendRequestApproved,
	onFriendRequestDeclined,
	onViewUserProfile,
	onCheckNotification,
	onSuperLikedPhotoPressed,
	onGroupRequestConfirmed,
	onGroupRequestDeclined,
}) => {
	switch (activityCardData.type) {
		case NOTIFICATION_TYPES.RECENT_COMMENT:
			return <ActivityRecentCommentCard {...activityCardData} onThumbPress={onPostThumbPressed} />;

		case NOTIFICATION_TYPES.FRIEND_REQUEST:
			return (
				<FriendRequest
					{...activityCardData}
					loadingConfirmed={loadingConfirmed.hasOwnProperty(activityCardData.requestId)}
					loadingDeclined={loadingDeclined.hasOwnProperty(activityCardData.requestId)}
					onRequestConfirmed={() => onFriendRequestApproved(activityCardData.requestId)}
					onRequestDeclined={() => onFriendRequestDeclined(activityCardData.requestId)}
					onViewUserProfile={onViewUserProfile}
				/>
			);

		case NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE:
			return (
				<NotificationGI
					{...activityCardData}
					onCheckNotification={onCheckNotification}
					onViewUserProfile={onViewUserProfile}
				/>
			);

		case NOTIFICATION_TYPES.SUPER_LIKED:
			return <ActivitySuperLikedCard {...activityCardData} onThumbPress={onSuperLikedPhotoPressed} />;

		case NOTIFICATION_TYPES.GROUP_REQUEST:
			return (
				<GroupRequest
					{...activityCardData}
					onGroupConfirmed={() => onGroupRequestConfirmed(activityCardData.requestId)}
					onGroupDeclined={() => onGroupRequestDeclined(activityCardData.requestId)}
				/>
			);
	}
	return null;
};

const keyExtractor = (item: any, index: number) => item.requestId;

const NotificationsScreenComponent: React.SFC<INotificationsScreenComponentProps> = ({
	activityCards,
	refreshing,
	refreshData,
	onPostThumbPressed,
	onSuperLikedPhotoPressed,
	onFriendRequestApproved,
	onFriendRequestDeclined,
	onGroupRequestConfirmed,
	onGroupRequestDeclined,
	onCheckNotification,
	onViewUserProfile,
	loadingConfirmed,
	loadingDeclined,
}) => (
	<View style={style.container}>
		<FlatList
			data={activityCards}
			keyExtractor={keyExtractor}
			renderItem={(data) => (
				<ActivityCard
					activityCardData={data.item}
					onPostThumbPressed={onPostThumbPressed}
					loadingConfirmed={loadingConfirmed}
					loadingDeclined={loadingDeclined}
					onFriendRequestApproved={onFriendRequestApproved}
					onFriendRequestDeclined={onFriendRequestDeclined}
					onViewUserProfile={onViewUserProfile}
					onCheckNotification={onCheckNotification}
					onSuperLikedPhotoPressed={onSuperLikedPhotoPressed}
					onGroupRequestConfirmed={onGroupRequestConfirmed}
					onGroupRequestDeclined={onGroupRequestDeclined}
				/>
			)}
			ListEmptyComponent={<EmptyListComponent />}
			refreshing={refreshing}
			onRefresh={refreshData}
			extraData={{loadingDeclined, loadingConfirmed}}
		/>
	</View>
);

export default withInlineLoader(NotificationsScreenComponent, false);
