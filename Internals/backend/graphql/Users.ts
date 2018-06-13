import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

import {ipfsConfig as base} from 'configuration';
import {AvatarImagePlaceholder} from 'consts';
import {IMediaProps, IPostsProps} from 'types';
import {bestTwoComments, getPostMedia, numberOfComments} from 'utilities';

export const getUserQueryProfileQ = gql`
	query getUserQuery($userId: ID!) {
		getUserQuery(userId: $userId) {
			relationship
			user {
				userId
				name
				username
				email
				bio
				posts {
					id
					likes {
						userId
					}
					Media {
						id
						hash
					}
				}
				avatar {
					id
					hash
				}
			}
		}
	}
`;

export const getUserProfileQ = gql`
	query getUser($userId: ID!) {
		getUser(userId: $userId) {
			userId
			name
			username
			email
			bio
			posts {
				id
				likes {
					userId
				}
				Media {
					id
				}
			}
			avatar {
				id
				hash
			}
		}
	}
`;

export const getUserPostsQ = gql`
	query getPosts($userId: ID!) {
		getPostsOwner(userId: $userId) {
			Items {
				id
				createdAt
				location
				text
				likes {
					userId
					username
				}
				owner {
					userId
					name
					avatar {
						id
						hash
					}
				}
				Media {
					id
					hash
					type
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
					}
				}
			}
			nextToken
		}
	}
`;

const searchUsers = gql`
	mutation search($query: String!) {
		searchUsers(query: $query) {
			user {
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
			connection
		}
	}
`;

const checkUsername = gql`
	mutation check($username: String!) {
		checkUsername(username: $username) {
			userId
		}
	}
`;

const blockUserMut = gql`
	mutation blockUser($user: ID!) {
		blockUser(user: $user) {
			userId
		}
	}
`;

const addFriendMut = gql`
	mutation addFriend($user: ID!) {
		addFriend(user: $user) {
			userId
		}
	}
`;

const removeFriendMut = gql`
	mutation removeFriend($user: ID!) {
		removeFriend(user: $user) {
			userId
		}
	}
`;

const updateUserData = gql`
	mutation updateUserData(
		$name: String
		$email: String
		$bio: String
		$age: Int
		$gender: String
		$location: String
		$avatar: ID
	) {
		updateUserData(
			name: $name
			email: $email
			bio: $bio
			age: $age
			gender: $gender
			location: $location
			avatar: $avatar
		) {
			userId
		}
	}
`;

const preloadAllMediaObjects = (posts: any) => {
	if (!posts) {
		return [];
	}

	const images: IMediaProps[] = [];
	posts.forEach((post: IPostsProps) => {
		const medias = post.Media;
		if (post.Media) {
			medias.forEach((media) => {
				images.push(media);
			});
		}
	});
	return images;
};

export const addFriend = (comp: any) => graphql(addFriendMut, {name: 'addFriend'})(comp);

export const blockUserHoc = (comp: any) => graphql(blockUserMut, {name: 'blockUser'})(comp);

export const removeFriend = (comp: any) => graphql(removeFriendMut, {name: 'removeFriend'})(comp);

export const searchUsersHoc = (comp: any) => graphql(searchUsers, {name: 'search'})(comp);

export const checkUsernameHoc = (comp: any) => graphql(checkUsername, {name: 'checkUsername'})(comp);

export const updateUserDataHoc = (comp: any) => graphql(updateUserData, {name: 'updateUserData'})(comp);

export const getUserProfileHoc = (comp: any) =>
	graphql(getUserQueryProfileQ, {
		name: 'getUserQuery',
		props(pps: any) {
			const {
				getUserQuery: {loading, getUserQuery},
			} = pps;
			const results = {getUserQuery: {getUser: {}, loading}};
			if (!loading) {
				const avatar = getUserQuery.user.avatar
					? base.ipfs_URL + getUserQuery.user.avatar.hash
					: AvatarImagePlaceholder;
				const mediaObjs = preloadAllMediaObjects(getUserQuery.user.posts);
				results.getUserQuery.getUser = {
					avatarURL: avatar,
					fullName: getUserQuery.user.name,
					username: getUserQuery.user.username,
					aboutMeText: getUserQuery.user.bio,
					mediaObjects: mediaObjs,
					numberOfPhotos: mediaObjs.length,
					numberOfLikes: getUserQuery.user.posts.reduce((likes: number, x: any) => (likes += x.likes.length), 0),
					relationship: getUserQuery.relationship,
				};
			}
			return results;
		},
		options: (ownProps: any) => {
			const {navigation} = ownProps;
			const userId = navigation.state.params.userId;
			return {
				variables: {
					userId,
				},
			};
		},
	})(comp);

export const getUserPostHoc = (comp: any) =>
	graphql(getUserPostsQ, {
		name: 'getUserPosts',
		props(pps: any) {
			const {
				getUserPosts: {loading, getPostsOwner},
			} = pps;
			const results = {getUserPosts: {Items: [], loading}};
			if (!loading) {
				results.getUserPosts.Items =
					getPostsOwner.Items.length > 0
						? getPostsOwner.Items.map((item: any) => {
								const avatar = item.owner.avatar ? base.ipfs_URL + item.owner.avatar.hash : AvatarImagePlaceholder;
								const numComments = numberOfComments(item);
								return {
									id: item.id,
									title: null,
									text: item.text,
									location: item.location,
									smallAvatar: avatar,
									fullName: item.owner.name,
									timestamp: new Date(parseInt(item.createdAt, 10) * 1000),
									numberOfLikes: item.likes.length,
									numberOfComments: numComments,
									canDelete: false,
									media: getPostMedia(item.Media, item.likes.length, numComments),
									owner: item.owner,
									bestComments: bestTwoComments(item),
									likes: item.likes,
								};
						  })
						: [];
			}
			return results;
		},
		options: (ownProps: any) => {
			const {navigation} = ownProps;
			const userId = navigation.state.params.userId;
			return {
				variables: {
					userId,
				},
			};
		},
	})(comp);
