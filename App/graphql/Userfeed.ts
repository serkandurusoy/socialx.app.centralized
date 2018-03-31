import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

import {CurrentUserInfo} from '../utils';

export const createPostMut = gql`
	mutation($text: String!, $Media: [ID]) {
		createPost(text: $text, Media: $Media) {
			id
		}
	}
`;

export const addMediaMut = gql`
	mutation($hash: String!, $type: String!, $size: Int!) {
		addMedia(hash: $hash, type: $type, size: $size) {
			id
		}
	}
`;

export const getUserPosts = gql`
	query {
		user {
			userId
			posts {
				id
				createdAt
				text
				Media {
					id
					hash
					type
					size
				}
				likes {
					userId
					username
					avatar {
                        hash
                        size
                        type
                    }
				}
			}
		}
	}
`;

export const getAllPosts = gql`
	query {
		allPosts {
			id
			createdAt
			text
			Media {
				id
				hash
				type
				size
			}
		}
	}
`;

export const getAllPostsHoc = (comp: any) =>
	graphql(getAllPosts, {name: 'Posts', options: {fetchPolicy: 'network-only'}})(comp);

export const getUserPostsHoc = (comp: any) =>
	graphql(getUserPosts, {name: 'User', options: {fetchPolicy: 'network-only'}})(comp);

export const addMediaHoc = (comp: any) =>
	graphql(addMediaMut, {name: 'addMedia', options: {fetchPolicy: 'no-cache'}})(comp);

export const createPostHoc = (comp: any) => graphql(createPostMut, {name: 'createPost'})(comp);
