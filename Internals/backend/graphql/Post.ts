import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

import {IAllPostsDataResponse} from 'types';

import {ipfsConfig as base} from 'configuration';

const likePost = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				userId
				username
			}
		}
	}
`;

const removeLikePost = gql`
	mutation removelikePost($postId: ID!) {
		removelikePost(postId: $postId) {
			id
			likes {
				userId
				username
			}
		}
	}
`;

const deletePostMut = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId) {
			id
		}
	}
`;

const getPublicPostsQ = gql`
	query getPublicPosts($next: String) {
		getPublicPosts(next: $next) {
			Items {
				id
				text
				createdAt
				location
				likes {
					userId
				}
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

export const likePostHoc = (comp: any) => graphql(likePost, {name: 'likePost'})(comp);
export const removeLikePostHoc = (comp: any) => graphql(removeLikePost, {name: 'removeLikePost'})(comp);

export const deleteOwnPostHoc = (comp: any) => graphql(deletePostMut, {name: 'deletePost'})(comp);

export const getPublicPostsHoc = (comp: any) =>
	graphql(getPublicPostsQ, {
		name: 'Posts',
		props(pps) {
			const {
				Posts: {loading, error, getPublicPosts, fetchMore, refetch},
			} = pps;
			// {Posts: {loading, getPublicPosts, fetchMore, refetch}
			const {nextToken, Items} = getPublicPosts;
			const numberOfComments = (post: any) => {
				let cres = 0;
				for (let x = 0; x < post.comments.length; x++) {
					cres += post.comments[x].comments.length + 1;
				}
				return cres;
			};
			const dataSpine = () => {
				let rets = [];
				for (let i = 0; i < getPublicPosts.Items.length; i++) {
					const post = getPublicPosts.Items[i];
					const media = post.Media
						? post.Media.length > 0
							? base.ipfs_URL + post.Media[0].optimizedHash
							: undefined
						: undefined;
					rets.push({
						id: post.id,
						text: post.text,
						location: null, // TODO: enable this later when we have backend support
						smallAvatar: post.owner.avatar
							? base.ipfs_URL + post.owner.avatar.hash
							: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
						imageSource: media,
						mediaType: post.Media.length ? post.Media[0].type : null,
						// TODO: add (@username) somewhere here? for duplicate friends names, usernames cant be duplicates
						fullName: post.owner.name,
						timestamp: new Date(parseInt(post.createdAt, 10) * 1000),
						numberOfLikes: post.likes.length,
						numberOfSuperLikes: 0,
						numberOfComments: numberOfComments(post),
						numberOfWalletCoins: 0,
						onCommentsButtonClick: () => {},
						// TODO: append all media to this with the index of the image
						onImageClick: () => null,
						onLikeButtonClick: () => null,
						likedByMe: false,
						canDelete: false,
						owner: post.owner,
						onDeleteClick: null,
					});
				}
				return rets;
			};

			return {
				loading,
				Items: dataSpine(),
				refresh: async () => {
					await refetch();
				},
				noPosts: !Items.length,
				loadMore: nextToken
					? fetchMore({
							variables: {next: nextToken},
							updateQuery: (previousResult, {fetchMoreResult}) => {
								const previousEntry = previousResult.entry;
								const newPosts = fetchMoreResult.getPublicPosts.Items;
								const newNext = fetchMoreResult.getPublicPosts.nextToken;
								const previousItems = previousEntry ? previousEntry.Items : [];

								return {
									nextToken: newNext,
									entry: {
										Items: [...newPosts, ...previousItems],
									},
								};
							},
					  })
					: null,
			};
		},
	})(comp);
