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

const ACCEPTED_NOTIFICATION_TYPES = [NOTIFICATION_TYPES.FRIEND_REQUEST, NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE];

const dataSpine = (notifications: any, getText: any) =>
	notifications
		.filter(({type}) => ACCEPTED_NOTIFICATION_TYPES.includes(type))
		.map(({type, owner: {name: fullName, avatar, username, userId}, id: requestId, status}) => ({
			type,
			avatarURL: avatar ? base.ipfs_URL + avatar.hash : AvatarImagePlaceholder,
			text:
				type === NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE
					? getText('notifications.friend.request.accepted', username, status)
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
