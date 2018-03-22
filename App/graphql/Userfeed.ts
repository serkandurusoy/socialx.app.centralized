import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

import {CurrentUserInfo} from '../utils';

export const createPostMut = gql`
    mutation($text: String!, $Media: String){
        createPost(text: $text, Media: $Media){
            id
        }
    }
`;

export const getUserPosts = gql`
    query{
        user {
            userId
            posts {
                id
                createdAt
                text
                Media
                likes {
                    userId
                    username
                    avatar
                }
            }
        }
    }
`;

export const getAllPosts = gql`
    query{
        allPosts {
            id
            createdAt
            text
            Media
            likes {
                userId
                username
                avatar
            }
        }
    }
`;

export const getAllPostsHoc = (comp: any) => graphql(getAllPosts,
		{ name: 'Posts', options: { fetchPolicy: 'network-only' } })(comp);

export const getUserPostsHoc = (comp: any) => graphql(getUserPosts,
		{ name: 'User', options: { fetchPolicy: 'network-only' } })(comp);

export const createPostHoc = (comp: any) => graphql(createPostMut, { name: 'createPost' })(comp);
