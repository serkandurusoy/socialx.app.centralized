import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

import {CurrentUserInfo} from '../utils';

export const createPostMut = gql`
	mutation($text: String, $Media: [ID]) {
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
				hash
			}
			owner {
				userId
				username
				name
				avatar {
					hash
				}
			}
			likes {
			    userId
			}
		}
	}
`;

export const getAllPostsHoc = (comp: any) => graphql(getAllPosts, {name: 'Posts'})(comp);

export const getUserPostsHoc = (comp: any) => graphql(getUserPosts, {name: 'User'})(comp);

export const addMediaHoc = (comp: any) => graphql(addMediaMut, {name: 'addMedia'})(comp);

export const createPostHoc = (comp: any) => graphql(createPostMut, {name: 'createPost'})(comp);
