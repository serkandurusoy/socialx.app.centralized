import React, {Component} from 'react';
import {NavigationStackScreenOptions} from 'react-navigation';
import NotificationsScreenComponent from './screen';

export enum NOTIFICATION_TYPES {
	RECENT_COMMENT = 'RECENT_COMMENT',
	FRIEND_REQUEST = 'FRIEND_REQUEST',
	GROUP_REQUEST = 'GROUP_REQUEST',
	SUPER_LIKED = 'SUPER_LIKED',
}

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

interface INotificationsScreenState {
	activityCards: any[];
	refreshing: boolean;
}

export default class NotificationsScreen extends Component<any, INotificationsScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'ACTIVITY',
	};

	public state = {
		refreshing: false,
		activityCards: [],
	};

	public render() {
		return (
			<NotificationsScreenComponent
				activityCards={this.state.activityCards}
				refreshing={this.state.refreshing}
				refreshData={this.refreshNotifications}
				loadMoreNotifications={this.loadMoreNotificationsHandler}
				onPostThumbPressed={this.postThumbPressedHandler}
				onSuperLikedPhotoPressed={this.superLikedPhotoPressedHandler}
				onFriendRequestApproved={this.friendRequestApprovedHandler}
				onGroupRequestConfirmed={this.groupRequestConfirmedHandler}
			/>
		);
	}

	private refreshNotifications = () => {
		this.setState({
			refreshing: true,
		});
		setTimeout(() => {
			this.setState({
				refreshing: false,
				activityCards: ACTIVITY_CARDS,
			});
		}, 1500);
	}

	private loadMoreNotificationsHandler = () => {
		this.setState({
			activityCards: this.state.activityCards.concat(ACTIVITY_CARDS),
		});
	}

	private postThumbPressedHandler = (postId: string) => {
		alert('postThumbPressedHandler: ' + postId);
	}

	private superLikedPhotoPressedHandler = (postId: string) => {
		alert('superLikedPhotoPressedHandler: ' + postId);
	}

	private friendRequestApprovedHandler = (requestId: string) => {
		alert('friendRequestApprovedHandler: ' + requestId);
	}

	private groupRequestConfirmedHandler = (requestId: string) => {
		alert('groupRequestConfirmedHandler: ' + requestId);
	}
}
