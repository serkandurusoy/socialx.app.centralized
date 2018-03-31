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

export const searchUsersHoc = (comp: any) => graphql(searchUsers, { name: 'search' })(comp);

export const checkUsernameHoc = (comp: any) => graphql(checkUsername, { name: 'checkUsername' })(comp);
