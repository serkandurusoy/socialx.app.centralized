import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

import {IAllPostsDataResponse, IPaginatedPosts, ISimpleComment} from 'types';

import {AvatarImagePlaceholder} from 'consts';

import {bestTwoComments, decodeBase64Text, getPostMedia, numberOfComments} from 'utilities';

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

interface IPostInputProps {
	next: string;
}

interface IPostVariables {
	next: string;
}

interface IPostResponse {
	getPublicPosts: IPaginatedPosts;
}

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
					username
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
					text
					likes {
						userId
					}
					owner {
						userId
						username
					}
					comments {
						id
						comments {
							id
							comments {
								id
								comments {
									id
									comments {
										id
									}
								}
							}
						}
					}
				}
			}
			nextToken
		}
	}
`;

const getFriendsPostsQ = gql`
	query getFriendsPosts($next: String) {
		getFriendsPosts(next: $next) {
			Items {
				id
				text
				createdAt
				location
				likes {
					userId
					username
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
					text
					likes {
						userId
					}
					owner {
						userId
						username
					}
					comments {
						id
						comments {
							id
							comments {
								id
								comments {
									id
									comments {
										id
									}
								}
							}
						}
					}
				}
			}
			nextToken
		}
	}
`;

const postsMapper = (posts: any) =>
	posts.map((post: any) => {
		const numComments = numberOfComments(post);
		return {
			id: post.id,
			text: post.text,
			location: post.location,
			media: getPostMedia(post.Media, post.likes.length, numComments),
			// TODO: add (@username) somewhere here? for duplicate friends names, usernames cant be duplicates
			timestamp: new Date(parseInt(post.createdAt, 10) * 1000),
			numberOfLikes: post.likes ? post.likes.length : 0,
			numberOfSuperLikes: 0,
			numberOfComments: numComments,
			numberOfWalletCoins: 0,
			onLikeButtonClick: () => null,
			canDelete: false,
			owner: post.owner,
			onDeleteClick: null,
			likes: post.likes,
			bestComments: bestTwoComments(post),
		};
	});

export const likePostHoc = (comp: any) => graphql(likePost, {name: 'likePost'})(comp);
export const removeLikePostHoc = (comp: any) => graphql(removeLikePost, {name: 'removeLikePost'})(comp);

export const deleteOwnPostHoc = (comp: any) => graphql(deletePostMut, {name: 'deletePost'})(comp);

// IPostInputProps, IPostResponse, IPostVariables
export const getPublicPostsHoc = (comp: any) =>
	graphql(getPublicPostsQ, {
		name: 'Posts',
		options: {variables: {next: ''}, fetchPolicy: 'network-only'},
		props(qPorps: any) {
			const {Posts} = qPorps;
			if (Posts.loading) {
				return qPorps;
			}
			const {getPublicPosts, fetchMore} = Posts;

			const {nextToken, Items} = getPublicPosts;

			const mappedItems = postsMapper(Items);

			const paginationFunc = async () => {
				if (!nextToken) {
					return {};
				}
				await fetchMore({
					variables: {next: nextToken},
					updateQuery: (previousResult: any, {fetchMoreResult}: any) => {
						const previousEntry = previousResult.getPublicPosts;
						const previousItems = previousEntry.Items;

						const newItems = fetchMoreResult.getPublicPosts.Items;
						const newNext = fetchMoreResult.getPublicPosts.nextToken;

						const newFlag = newNext !== nextToken && newNext;

						const newPosts = {
							getPublicPosts: {
								nextToken: newNext,
								Items: newFlag && newItems.length ? [...previousItems, ...newItems] : previousItems,
								__typename: 'PaginatedPosts',
							},
						};

						return newPosts;
					},
				});
			};

			return {
				...Posts,
				Items: mappedItems,
				nextToken,
				noPosts: !Items,
				hasMore: nextToken !== null,
				loadMore: paginationFunc,
				refresh: Posts.refetch,
			};
		},
	})(comp);

export const getFriendsPostsHoc = (comp: any) =>
	graphql(getFriendsPostsQ, {
		name: 'Posts',
		options: {variables: {next: ''}, fetchPolicy: 'network-only'},
		props(qPorps: any) {
			const {Posts} = qPorps;
			if (Posts.loading) {
				return qPorps;
			}
			const {getFriendsPosts, fetchMore} = Posts;

			const {nextToken, Items} = getFriendsPosts;

			const mappedItems = postsMapper(Items);

			const paginationFunc = async () => {
				if (!nextToken) {
					return {};
				}
				await fetchMore({
					variables: {next: nextToken},
					updateQuery: (previousResult: any, {fetchMoreResult}: any) => {
						const previousEntry = previousResult.getFriendsPosts;
						const previousItems = previousEntry.Items;

						const newItems = fetchMoreResult.getFriendsPosts.Items;
						const newNext = fetchMoreResult.getFriendsPosts.nextToken;

						const newFlag = newNext !== nextToken && newNext;

						const newPosts = {
							getFriendsPosts: {
								nextToken: newNext,
								Items: newFlag && newItems.length ? [...previousItems, ...newItems] : previousItems,
								__typename: 'PaginatedPosts',
							},
						};

						return newPosts;
					},
				});
			};

			return {
				...Posts,
				Items: mappedItems,
				nextToken,
				noPosts: !Items,
				hasMore: nextToken !== null,
				loadMore: paginationFunc,
				refresh: Posts.refetch,
			};
		},
	})(comp);
