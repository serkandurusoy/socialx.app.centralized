import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

export const getUserProfileQ = gql`
	query getUser($userId: ID!) {
		getUser(userId: $userId) {
			userId
			name
			username
			email
			bio
			avatar {
				id
				hash
			}
		}
	}
`;

export const getUserPostsQ = gql`
	query getPosts($userId: ID!) {
		getPostsOwner(userId: $userId) {
			Items {
				id
				createdAt
				location
				text
				likes {
					userId
				}
				owner {
					userId
				}
				Media {
					id
					hash
					type
				}
				comments {
					id
					comments {
						id
					}
				}
			}
			nextToken
		}
	}
`;

const searchUsers = gql`
	mutation search($query: String!) {
		searchUsers(query: $query) {
			user {
				userId
				username
				name
				email
				avatar {
					hash
					size
					type
				}
			}
			connection
		}
	}
`;

const checkUsername = gql`
	mutation check($username: String!) {
		checkUsername(username: $username) {
			userId
		}
	}
`;

const addFriendMut = gql`
	mutation addFriend($user: ID!) {
		addFriend(user: $user) {
			userId
		}
	}
`;

const removeFriendMut = gql`
	mutation removeFriend($user: ID!) {
		removeFriend(user: $user) {
			userId
		}
	}
`;

const updateUserData = gql`
	mutation updateUserData(
		$name: String
		$email: String
		$bio: String
		$age: Int
		$gender: String
		$location: String
		$avatar: ID
	) {
		updateUserData(
			name: $name
			email: $email
			bio: $bio
			age: $age
			gender: $gender
			location: $location
			avatar: $avatar
		) {
			userId
		}
	}
`;

export const addFriend = (comp: any) => graphql(addFriendMut, {name: 'addFriend'})(comp);
export const removeFriend = (comp: any) => graphql(removeFriendMut, {name: 'removeFriend'})(comp);

export const searchUsersHoc = (comp: any) => graphql(searchUsers, {name: 'search'})(comp);

export const checkUsernameHoc = (comp: any) => graphql(checkUsername, {name: 'checkUsername'})(comp);

export const updateUserDataHoc = (comp: any) => graphql(updateUserData, {name: 'updateUserData'})(comp);
