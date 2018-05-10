import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const getMyNotificationsQ = gql`
	{
		myNotifications {
			id
			createdAt
			trigger
			data
			targetUser {
				userId
			}
			owner {
				userId
				username
				name
				avatar {
					id
					hash
				}
			}
			type
			status
		}
	}
`;

const checkNotificationsMut = gql`
	mutation checknotis($request: ID!) {
		checkNotification(request: $request) {
			id
		}
	}
`;

export const getMyNotificationsHoc: any = (comp: any) =>
	graphql(getMyNotificationsQ, {name: 'notifications', options: {fetchPolicy: 'network-only'}})(comp);

export const checkNotificationHoc: any = (comp: any) =>
	graphql(checkNotificationsMut, {name: 'checkNotification'})(comp);
