import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

import {IAllPostsDataResponse, IPaginatedPosts} from 'types';

import {AvatarImagePlaceholder} from 'consts';

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
const getNumberOfComments = (comments: any, holder: number = 0) => {
	if (!comments) { return 0 };
	if (comments.length > 0) {
		holder += comments.length;
		return comments.map((com: any) => {
			if (com.comments.length > 0) {
				return getNumberOfComments(com.comments, holder);
			} else {
				return holder;
			}
		});
	} else {
		return 0;
	}
}

export const likePostHoc = (comp: any) => graphql(likePost, {name: 'likePost'})(comp);
export const removeLikePostHoc = (comp: any) => graphql(removeLikePost, {name: 'removeLikePost'})(comp);

export const deleteOwnPostHoc = (comp: any) => graphql(deletePostMut, {name: 'deletePost'})(comp);

// IPostInputProps, IPostResponse, IPostVariables
export const getPublicPostsHoc = (comp: any) =>
	graphql(getPublicPostsQ, {
		name: 'Posts',
		options: {fetchPolicy: 'network-only'},
		props(pps) {
			const {
				Posts: {loading, error, getPublicPosts, fetchMore, refetch, hasMore},
			} = pps;
			// {Posts: {loading, getPublicPosts, fetchMore, refetch}
			// const {nextToken, Items, rawItems} = getPublicPosts;
			const nextToken = getPublicPosts ? getPublicPosts.nextToken : null;
			const Items = getPublicPosts ? getPublicPosts.Items : [];
			const numberOfComments = (post: any) => {
				let cres = 0;
				for (let x = 0; x < post.comments.length; x++) {
					cres += post.comments[x].comments.length + 1;
				}
				return cres;
			};

			const dataSpine = (pItems: any) => pItems.map((post: any) => ({
				id: post.id,
				text: post.text,
				location: post.location,
				media: post.Media,
				// TODO: add (@username) somewhere here? for duplicate friends names, usernames cant be duplicates
				timestamp: new Date(parseInt(post.createdAt, 10) * 1000),
				numberOfLikes: post.likes.length,
				numberOfSuperLikes: 0,
				numberOfComments: numberOfComments(post),
				numberOfWalletCoins: 0,
				onLikeButtonClick: () => null,
				canDelete: false,
				owner: post.owner,
				onDeleteClick: null,
				likes: post.likes,
			}));

			return {
				loading,
				rawItems: Items,
				Items: dataSpine(Items),
				refresh: refetch,
				nextToken,
				noPosts: !Items.length,
				hasMore: nextToken !== null,
				loadMore: () => nextToken !== null ?
					fetchMore({
						variables: {next: nextToken},
						updateQuery: (previousResult, {fetchMoreResult}) => {
							const previousEntry = previousResult.getPublicPosts;
							const previousItems = previousEntry ? previousEntry.Items : [];

							const newItems = fetchMoreResult.getPublicPosts.Items;
							const newNext = fetchMoreResult.getPublicPosts.nextToken;

							return{
								getPublicPosts: {
									nextToken: newNext,
									Items: newNext ? [...previousItems, ...newItems] : previousItems,
									__typename: 'PaginatedPosts',
								},
							};
						},
					}) : {},
			};
		},
})(comp);

export const getFriendsPostsHoc = (comp: any) =>
	graphql(getFriendsPostsQ, {
		name: 'Posts',
		options: {fetchPolicy: 'network-only'},
		props(pps) {
			const {
				Posts: {loading, error, getFriendsPosts, fetchMore, refetch, hasMore},
			} = pps;
			console.log(pps);
			// {Posts: {loading, getPublicPosts, fetchMore, refetch}
			// const {nextToken, Items, rawItems} = getPublicPosts;
			const nextToken = getFriendsPosts ? getFriendsPosts.nextToken : null;
			const Items = getFriendsPosts ? getFriendsPosts.Items : [];
			const numberOfComments = (post: any) => {
				let cres = 0;
				for (let x = 0; x < post.comments.length; x++) {
					cres += post.comments[x].comments.length + 1;
				}
				return cres;
			};

			const dataSpine = (pItems: any) => {
				const rets = [];
				for (let i = 0; i < pItems.length; i++) {
					const post = pItems[i];
					rets.push({
						id: post.id,
						text: post.text,
						location: post.location,
						media: post.Media,
						// TODO: add (@username) somewhere here? for duplicate friends names, usernames cant be duplicates
						timestamp: new Date(parseInt(post.createdAt, 10) * 1000),
						numberOfLikes: post.likes.length,
						numberOfSuperLikes: 0,
						numberOfComments: numberOfComments(post),
						numberOfWalletCoins: 0,
						onLikeButtonClick: () => null,
						canDelete: false,
						owner: post.owner,
						onDeleteClick: null,
						likes: post.likes,
					});
				}
				return rets;
			};
			return {
				loading,
				rawItems: Items,
				Items: dataSpine(Items),
				refresh: refetch,
				nextToken,
				noPosts: !Items.length,
				hasMore: nextToken !== null,
				loadMore: () => nextToken !== null ?
					fetchMore({
						variables: {next: nextToken},
						updateQuery: (previousResult, {fetchMoreResult}) => {
							const previousEntry = previousResult.getFriendsPosts;
							const previousItems = previousEntry ? previousEntry.Items : [];
							const newItems = fetchMoreResult.getFriendsPosts.Items || [];
							const newNext = fetchMoreResult.getFriendsPosts.nextToken;

							const newPosts = {
								getFriendsPosts: {
									nextToken: newNext,
									Items: newNext ? previousItems.concat(newItems) : previousItems,
									__typename: 'PaginatedPosts',
								},
							};
							return newPosts;
						},
					}) : {},
			};
		},
})(comp);
