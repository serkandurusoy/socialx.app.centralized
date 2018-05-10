import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const addFriendMut = gql`
	mutation addFriend($user: ID!) {
		addFriend(user: $user) {
			userId
		}
	}
`;

const acceptFriendRequestMut = gql`
	mutation acceptFriendRequest($request: ID!) {
		acceptFriendRequest(request: $request) {
			userId
		}
	}
`;

const declineFriendRequestMut = gql`
	mutation declineFriendRequest($request: ID!) {
		declineFriendRequest(request: $request) {
			userId
		}
	}
`;

export const addFriendHoc = (comp: any) => graphql(addFriendMut, {name: 'addFriend'})(comp);
export const acceptFriendRequestHoc = (comp: any) =>
  graphql(acceptFriendRequestMut, {name: 'acceptFriendRequest'})(comp);
export const declineFriendRequestHoc = (comp: any) =>
  graphql(declineFriendRequestMut, {name: 'declineFriendRequest'})(comp);

