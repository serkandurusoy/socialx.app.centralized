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

const dataSpine = (notifications: any, getText: any) =>
	notifications
		.map(
			({type, owner: {name: fullName, avatar, username, userId}, id: requestId, status}) =>
				type === NOTIFICATION_TYPES.FRIEND_REQUEST
					? {
							type: NOTIFICATION_TYPES.FRIEND_REQUEST,
							avatarURL: avatar ? base.ipfs_URL + avatar.hash : AvatarImagePlaceholder,
							fullName,
							username,
							requestId,
							status,
							userId,
					  }
					: type === NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE
						? {
								type: NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE,
								avatarURL: avatar ? base.ipfs_URL + avatar.hash : AvatarImagePlaceholder,
								text: getText('notifications.friend.request.accepted', username, status),
								fullName,
								username,
								requestId,
								status,
								userId,
						  }
						: null,
		)
		.filter((n) => n !== null);

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
		try {
			this.setState({refreshing: true});
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
		const {acceptFriendRequest, getText} = this.props;
		try {
			this.setState({
				loadingConfirmed: {...this.state.loadingConfirmed, [requestId]: true},
			});
			await acceptFriendRequest({
				variables: {
					request: requestId,
				},
			});
			await this.refreshNotifications();
		} catch (ex) {
			console.log(`ex: ${ex}`);
			showToastMessage(getText('notifications.friend.request.accept.failed'));
		}
		const newConfirmed = {...this.state.loadingConfirmed};
		delete newConfirmed[requestId];
		this.setState({loadingConfirmed: newConfirmed});
	};

	private friendRequestDeclinedHandler = async (requestId: string) => {
		const {declineFriendRequest, getText} = this.props;
		try {
			this.setState({
				loadingDeclined: {...this.state.loadingDeclined, [requestId]: true},
			});
			await declineFriendRequest({
				variables: {
					request: requestId,
				},
			});
			await this.refreshNotifications();
		} catch (ex) {
			console.log(`ex: ${ex}`);
			showToastMessage(getText('notifications.friend.request.decline.failed'));
		}
		const newDeclined = {...this.state.loadingDeclined};
		delete newDeclined[requestId];
		this.setState({loadingDeclined: newDeclined});
	};

	private groupRequestConfirmedHandler = (requestId: string) => {
		alert('groupRequestConfirmedHandler: ' + requestId);
	};

	private onGroupRequestDeclinedHandler = (requestId: string) => {
		alert('onGroupRequestDeclinedHandler: ' + requestId);
	};

	private checkNotification = async (requestId: string) => {
		const {checkNotification, getText} = this.props;
		try {
			this.setState({
				loadingNotificationCheck: {...this.state.loadingNotificationCheck, [requestId]: true},
			});
			await checkNotification({variables: {request: requestId}});
			await this.refreshNotifications();
		} catch (ex) {
			console.log(`ex: ${ex}`);
			showToastMessage(getText('notifications.check.failed'));
		}
		const newChecked = {...this.state.loadingNotificationCheck};
		delete newChecked[requestId];
		this.setState({loadingNotificationCheck: newChecked});
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
