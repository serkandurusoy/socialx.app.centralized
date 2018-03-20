import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const options: any = {
	fetchPolicy: 'cache-first',
};

export const createUser = gql`
	mutation create(
		$userId: ID!
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
			userId: $userId,
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
	mutation user($userId: ID!) {
		user(userId: $userId) {
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

export const createUserHoc = (component: any) => {
	return graphql(createUser, {name: 'createUser', options})(component);
};

export const userHoc = (component: any) => {
	return graphql(user, {name: 'user', options})(component);
};
