import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

import {CurrentUserInfo} from '../utils';

const options: any = {
	fetchPolicy: 'no-cache',
};

export const createUser = gql`
	mutation create(
		$username: String!
		$name: String!
		$email: String!
		$bio: String
		$age: Int
		$gender: String
		$location: String
		$avatar: String
	) {
		createUser(
			username: $username,
			name: $name,
			email: $email,
			bio: $bio,
			age: $age,
			gender: $gender,
			location: $location,
			avatar: $avatar
		) {
			userId
		}
	}
`;

export const user = gql`
	query user {
		user {
			userId
			username
			name
			email
			bio
			age
			gender
			location
			avatar
		}
	}
`;

export const createUpdateUserHoc = (component: any) => {
	return graphql(createUser, {name: 'createUser', options})(component);
};

export const userHoc = () => graphql(user, { options: { fetchPolicy: 'network-only' } });
