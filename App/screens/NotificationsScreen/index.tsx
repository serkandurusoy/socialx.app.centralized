import React, {Component} from 'react';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {compose} from 'recompose';

import {
	acceptFriendRequestHoc,
	checkNotificationHoc,
	declineFriendRequestHoc,
	getMyNotificationsHoc,
} from 'backend/graphql';
import {ipfsConfig as base} from 'configuration';
import {AvatarImagePlaceholder} from 'consts';
import {INotificationsResponse, NOTIFICATION_TYPES} from 'types';
import {IWithTranslationProps, showToastMessage, withTranslations} from 'utilities';
import NotificationsScreenComponent from './screen';

// TODO: used this until we have all type of activity cards from the backend!
const SAMPLE_ACTIVITY_CARDS = [
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
		requestId: '981326538',
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

const ACCEPTED_NOTIFICATION_TYPES = [NOTIFICATION_TYPES.FRIEND_REQUEST, NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE];

const dataSpine = (notifications: any, getText: any) =>
	notifications
		.filter(({type}) => ACCEPTED_NOTIFICATION_TYPES.includes(type))
		.map(({type, owner: {name: fullName, avatar, username, userId}, id: requestId, status}) => ({
			type,
			avatarURL: avatar ? base.ipfs_URL + avatar.hash : AvatarImagePlaceholder,
			text:
				type === NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE
					? getText('notifications.friend.request.accepted', username, status.toLowerCase())
					: undefined,
			fullName,
			username,
			requestId,
			status,
			userId,
		}));

interface INotificationsScreenProps extends IWithTranslationProps {
	notifications: INotificationsResponse;
	acceptFriendRequest: any;
	declineFriendRequest: any;
	checkNotification: any;
	navigation: NavigationScreenProp<any>;
}

interface INotificationsScreenState {
	activityCards: any[];
	refreshing: boolean;
	loadingConfirmed: any;
	loadingDeclined: any;
	loadingNotificationCheck: any;
}

class NotificationsScreen extends Component<INotificationsScreenProps, INotificationsScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'ACTIVITY',
	};

	public state = {
		refreshing: false,
		activityCards: [],
		loadingConfirmed: {},
		loadingDeclined: {},
		loadingNotificationCheck: {},
	};

	// TODO: @jake -> mask with the hoc
	public componentWillReceiveProps({notifications}: INotificationsScreenProps) {
		if (!notifications.loading && notifications) {
			if (!notifications.myNotifications) {
				return null;
			}
			if (this.state.activityCards.length < 1 && notifications.myNotifications.length > 0) {
				const {getText} = this.props;
				const spine = dataSpine(notifications.myNotifications, getText);
				this.setState({activityCards: spine});
			}
		}
	}

	public render() {
		const {notifications} = this.props;
		const {activityCards, refreshing, loadingConfirmed, loadingDeclined, loadingNotificationCheck} = this.state;

		return (
			<NotificationsScreenComponent
				isLoading={notifications.loading}
				activityCards={activityCards}
				refreshing={refreshing}
				refreshData={this.refreshNotifications}
				onPostThumbPressed={this.postThumbPressedHandler}
				onSuperLikedPhotoPressed={this.superLikedPhotoPressedHandler}
				onCheckNotification={this.checkNotification}
				onFriendRequestApproved={this.friendRequestApprovedHandler}
				onFriendRequestDeclined={this.friendRequestDeclinedHandler}
				onGroupRequestConfirmed={this.groupRequestConfirmedHandler}
				onGroupRequestDeclined={this.onGroupRequestDeclinedHandler}
				onViewUserProfile={this.navigateToUserProfile}
				loadingConfirmed={loadingConfirmed}
				loadingDeclined={loadingDeclined}
				loadingNotificationCheck={loadingNotificationCheck}
			/>
		);
	}

	private refreshNotifications = async () => {
		const {notifications, getText} = this.props;
		this.setState({refreshing: true});
		try {
			const results = await notifications.refetch();
			const spine = dataSpine(results.data.myNotifications, getText);
			this.setState({refreshing: false, activityCards: spine});
		} catch (ex) {
			console.log(ex);
			this.setState({refreshing: false});
		}
	};

	private postThumbPressedHandler = (postId: string) => {
		alert('postThumbPressedHandler: ' + postId);
	};

	private superLikedPhotoPressedHandler = (postId: string) => {
		alert('superLikedPhotoPressedHandler: ' + postId);
	};

	private friendRequestApprovedHandler = async (requestId: string) => {
		const {acceptFriendRequest} = this.props;
		await this.genericNotificationAction(
			requestId,
			acceptFriendRequest,
			'notifications.friend.request.accept.failed',
			'loadingConfirmed',
		);
	};

	private friendRequestDeclinedHandler = async (requestId: string) => {
		const {declineFriendRequest} = this.props;
		await this.genericNotificationAction(
			requestId,
			declineFriendRequest,
			'notifications.friend.request.decline.failed',
			'loadingDeclined',
		);
	};

	private checkNotification = async (requestId: string) => {
		const {checkNotification} = this.props;
		await this.genericNotificationAction(
			requestId,
			checkNotification,
			'notifications.check.failed',
			'loadingNotificationCheck',
		);
	};

	private genericNotificationAction = async (
		requestId: string,
		networkCallMethod: any,
		errorKey: string,
		stateKey: string, // TODO: this last arg. here kind of breaks TS
	) => {
		const {getText} = this.props;
		this.setState({[stateKey]: {...this.state[stateKey], [requestId]: true}});
		try {
			await networkCallMethod({variables: {request: requestId}});
			await this.refreshNotifications();
		} catch (ex) {
			console.log(`ex: ${ex}`);
			showToastMessage(getText(errorKey));
		}
		const {[requestId]: rId, ...newChecked} = this.state[stateKey];
		this.setState({[stateKey]: newChecked});
	};

	private groupRequestConfirmedHandler = (requestId: string) => {
		alert('groupRequestConfirmedHandler: ' + requestId);
	};

	private onGroupRequestDeclinedHandler = (requestId: string) => {
		alert('onGroupRequestDeclinedHandler: ' + requestId);
	};

	private navigateToUserProfile = (userId: string) => {
		this.props.navigation.navigate('UserProfileScreen', {userId});
	};
}

export default compose(
	withTranslations,
	getMyNotificationsHoc,
	acceptFriendRequestHoc,
	declineFriendRequestHoc,
	checkNotificationHoc,
)(NotificationsScreen);
