import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

const searchUsers = gql`
	mutation search($query: String!) {
		searchUsers(query: $query) {
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
