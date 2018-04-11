import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

const searchUsers = gql`
    mutation search($query: String!){
        searchUsers(query: $query){
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
    mutation check($username: String!){
        checkUsername(username: $username){
            userId
        }
    }
`;

const addFriendMut = gql`
    mutation addFriend($user: ID!){
        addFriend(user: $user){
            userId
        }
    }
`;

const removeFriendMut = gql`
    mutation removeFriend($user: ID!){
        removeFriend(user: $user){
            userId
        }
    }
`;

export const addFriend = (comp: any) => graphql(addFriendMut, { name: 'addFriend' })(comp);
export const removeFriend = (comp: any) => graphql(removeFriendMut, { name: 'removeFriend' })(comp);

export const searchUsersHoc = (comp: any) => graphql(searchUsers, { name: 'search' })(comp);

export const checkUsernameHoc = (comp: any) => graphql(checkUsername, { name: 'checkUsername' })(comp);
