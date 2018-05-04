import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

import {CurrentUserInfo} from 'utilities';

export const createPostMut = gql`
	mutation($text: String, $Media: [ID]) {
		createPost(text: $text, Media: $Media) {
			id
		}
	}
`;

export const addMediaMut = gql`
	mutation($hash: String!, $type: String!, $size: Int!, $optimizedHash: String) {
		addMedia(hash: $hash, type: $type, size: $size, optimizedHash: $optimizedHash) {
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
				id
				hash
				optimizedHash
				type
			}
			owner {
				userId
				username
				name
				avatar {
					id
					hash
				}
			}
			likes {
				userId
			}
			comments {
				id
				comments {
					id
				}
			}
		}
	}
`;

export const getAllPostsHoc = (comp: any) =>
	graphql(getAllPosts, {name: 'Posts', options: {fetchPolicy: 'network-only'}})(comp);

export const getUserPostsHoc = (comp: any) => graphql(getUserPosts, {name: 'User'})(comp);

export const addMediaHoc = (comp: any) => graphql(addMediaMut, {name: 'addMedia'})(comp);

export const createPostHoc = (comp: any) => graphql(createPostMut, {name: 'createPost'})(comp);
