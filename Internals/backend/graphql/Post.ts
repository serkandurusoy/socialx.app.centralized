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

// IPostInputProps, IPostResponse, IPostVariables
export const getPublicPostsHoc = (comp: any) =>
	graphql(getPublicPostsQ, {
		name: 'Posts',
		options: {fetchPolicy: 'network-only'},
		props(pps) {
			const {
				Posts: {loading, error, getPublicPosts, fetchMore, refetch},
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

			const dataSpine = (pItems: any) => {
				let rets = [];
				for (let i = 0; i < pItems.length; i++) {
					const post = pItems[i];
					const media = post.Media
						? post.Media.length > 0
							? base.ipfs_URL + post.Media[0].optimizedHash
							: undefined
						: undefined;
					rets.push({
						id: post.id,
						text: post.text,
						location: post.location,
						smallAvatar: post.owner.avatar ? base.ipfs_URL + post.owner.avatar.hash : AvatarImagePlaceholder,
						imageSource: media,
						mediaType: post.Media.length ? post.Media[0].type : null,
						media: post.Media,
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
				refresh: async () => {
					await refetch();
				},
				noPosts: !Items.length,
				loadMore: () => fetchMore({
					variables: {next: nextToken},
					updateQuery: (previousResult, {fetchMoreResult}) => {
						const previousEntry = previousResult.getPublicPosts;
						const previousItems = previousEntry ? previousEntry.Items : [];

						const newItems = fetchMoreResult.getPublicPosts.Items;
						const newNext = fetchMoreResult.getPublicPosts.nextToken;

						const newPosts = {
							getPublicPosts : {
								nextToken: newNext,
								Items: newNext ? previousItems.concat(newItems) : previousItems,
								__typename: 'PaginatedPosts',
							},
						};

						const res = newNext ? newPosts : previousResult;

						return res;
					},
				}),
			};
		},
	})(comp);
