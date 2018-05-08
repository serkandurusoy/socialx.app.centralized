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

export const getMyNotificationsMut: any = (comp: any) =>
	graphql(getMyNotificationsQ, {name: 'notifications', options: {fetchPolicy: 'network-only'}})(comp);
