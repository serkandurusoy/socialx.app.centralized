import React, {Component} from 'react';
import {NavigationStackScreenOptions} from 'react-navigation';
import NotificationsScreenComponent from './screen';

import {
	acceptFriendRequestHoc,
	checkNotificationHoc,
	declineFriendRequestHoc,
	getMyNotificationsHoc,
} from 'backend/graphql';
import {INotificationsResponse, NOTIFICATION_TYPES} from 'types';

import {ipfsConfig as base} from 'configuration';
import {AvatarImagePlaceholder} from 'consts';

export const ACTIVITY_CARDS = [
	{
		type: NOTIFICATION_TYPES.RECENT_COMMENT,
		avatarURL: 'https://placeimg.com/150/150/tech',
		fullName: 'Seth Saunders',
		timestamp: new Date(2018, 2, 12, 5, 51, 23),
		wallPosts: [
			{
				postThumbURL: 'https://placeimg.com/140/140/nature',
				postId: '11',
			},
			{
				postThumbURL: 'https://placeimg.com/141/141/nature',
				postId: '22',
			},
			{
				postThumbURL: 'https://placeimg.com/142/142/nature',
				postId: '33',
			},
			{
				postThumbURL: 'https://placeimg.com/143/143/nature',
				postId: '44',
			},
			{
				postThumbURL: 'https://placeimg.com/144/144/nature',
				postId: '55',
			},
		],
	},
	{
		type: NOTIFICATION_TYPES.FRIEND_REQUEST,
		avatarURL: 'https://placeimg.com/151/151/people',
		fullName: 'Teresa Lamb',
		username: 'terlamb',
		requestId: '981326537',
	},
	{
		type: NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE,
		avatarURL: 'https://placeimg.com/160/160/people',
		fullName: 'Teresa Lamb',
		username: 'terlamb',
		requestId: '981326537',
		text: 'Friend request accepted.',
	},
	{
		type: NOTIFICATION_TYPES.SUPER_LIKED,
		avatarURL: 'https://placeimg.com/152/152/tech',
		fullName: 'Cory Maxwell',
		timestamp: new Date(2018, 1, 24, 8, 23, 12),
		wallPosts: [
			{
				postThumbURL: 'https://placeimg.com/130/130/arch',
				postId: '130',
			},
			{
				postThumbURL: 'https://placeimg.com/131/131/arch',
				postId: '131',
			},
			{
				postThumbURL: 'https://placeimg.com/132/132/arch',
				postId: '132',
			},
			{
				postThumbURL: 'https://placeimg.com/133/133/arch',
				postId: '133',
			},
			{
				postThumbURL: 'https://placeimg.com/135/135/arch',
				postId: '134',
			},
		],
	},
	{
		type: NOTIFICATION_TYPES.GROUP_REQUEST,
		avatarURL: 'https://placeimg.com/150/150/tech',
		fullName: 'Claudia Kulmitzer',
		groupName: 'MfMJAkkAs2jLISYyv',
		requestId: '990325',
	},
];

interface INotificationsScreenProps {
	notifications: INotificationsResponse;
	acceptFriendRequest: any;
	declineFriendRequest: any;
	checkNotification: any;
}

interface INotificationsScreenState {
	activityCards: any[];
	refreshing: boolean;
}

class NotificationsScreen extends Component<INotificationsScreenProps, INotificationsScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'ACTIVITY',
	};

	public state = {
		refreshing: false,
		activityCards: [],
	};

	public componentWillReceiveProps(nextProps: INotificationsScreenProps) {
		const {notifications} = nextProps;
		if (!notifications.loading) {
			if (this.state.activityCards.length < 1 && notifications.myNotifications.length > 0) {
				const {myNotifications} = notifications;
				const spine = [];
				for (let i = 0; i < myNotifications.length; i++) {
					const current = myNotifications[i];
					let res = null;
					switch (current.type) {
						case NOTIFICATION_TYPES.FRIEND_REQUEST:
							res = {
								type: NOTIFICATION_TYPES.FRIEND_REQUEST,
								avatarURL: current.owner.avatar ? base.ipfs_URL + current.owner.avatar.hash : AvatarImagePlaceholder,
								fullName: current.owner.name,
								username: current.owner.username,
								requestId: current.id,
								status: current.status,
							};
							break;

						case NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE:
							res = {
								type: NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE,
								avatarURL: current.owner.avatar ? base.ipfs_URL + current.owner.avatar.hash : AvatarImagePlaceholder,
								fullName: current.owner.name,
								username: current.owner.username,
								requestId: current.id,
								text: `${current.owner.username} has ${current.status} you\'r friend request.`,
								status: current.status,
							};
							break;

						default:
							res = null;
							break;
					}
					spine.push(res);
				}
				this.setState({activityCards: spine});
			}
		}
	}

	public render() {
		const {notifications} = this.props;

		return (
			<NotificationsScreenComponent
				isLoading={notifications.loading}
				activityCards={this.state.activityCards}
				refreshing={this.state.refreshing}
				refreshData={this.refreshNotifications}
				onPostThumbPressed={this.postThumbPressedHandler}
				onSuperLikedPhotoPressed={this.superLikedPhotoPressedHandler}
				onCheckNotification={this.checkNotification}
				onFriendRequestApproved={this.friendRequestApprovedHandler}
				onFriendRequestDeclined={this.friendRequestDeclinedHandler}
				onGroupRequestConfirmed={this.groupRequestConfirmedHandler}
				onGroupRequestDeclined={this.onGroupRequestDeclinedHandler}
			/>
		);
	}

	private refreshNotifications = async () => {
		const {notifications} = this.props;
		try {
			this.setState({refreshing: true, activityCards: []});
			await notifications.refetch();
			this.setState({refreshing: false});
		} catch (ex) {
			console.log(ex);
			this.setState({refreshing: false});
		}
	}

	private postThumbPressedHandler = (postId: string) => {
		alert('postThumbPressedHandler: ' + postId);
	}

	private superLikedPhotoPressedHandler = (postId: string) => {
		alert('superLikedPhotoPressedHandler: ' + postId);
	}

	private friendRequestApprovedHandler = async (requestId: string) => {
		const {acceptFriendRequest} = this.props;
		await acceptFriendRequest({
			variables: {
				request: requestId,
			},
		});
		await this.refreshNotifications();
	}

	private friendRequestDeclinedHandler = async (requestId: string) => {
		const {declineFriendRequest} = this.props;
		await declineFriendRequest({
			variables: {
				request: requestId,
			},
		});
		await this.refreshNotifications();
	}

	private groupRequestConfirmedHandler = (requestId: string) => {
		alert('groupRequestConfirmedHandler: ' + requestId);
	}

	private onGroupRequestDeclinedHandler = (requestId: string) => {
		alert('onGroupRequestDeclinedHandler: ' + requestId);
	}

	private checkNotification = async (requestId: string) => {
		const {checkNotification} = this.props;
		await checkNotification({variables: {request: requestId}});
		await this.refreshNotifications();
	}
}

const notificationsWrapper = getMyNotificationsHoc(NotificationsScreen);
const acceptFriendRequestWrapper = acceptFriendRequestHoc(notificationsWrapper);
const declineFriendRequestWrapper = declineFriendRequestHoc(acceptFriendRequestWrapper);
const checkNotificationWrapper = checkNotificationHoc(declineFriendRequestWrapper);

export default checkNotificationWrapper;
