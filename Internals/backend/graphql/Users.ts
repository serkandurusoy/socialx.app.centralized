import gql from 'graphql-tag';
import {graphql, QueryProps} from 'react-apollo';

import {ipfsConfig as base} from 'configuration';
import {AvatarImagePlaceholder} from 'consts';
import {IMediaProps, IPostsProps} from 'types';
import {bestTwoComments, getPostMedia, getUserAvatar, numberOfComments} from 'utilities';

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
						id
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
					id
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
					id
					userId
					userName
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
					size
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

const searchUsersMut = gql`
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
	mutation blockUser($userId: ID!) {
		blockUser(userId: $userId)
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

export const checkUsernameHoc = (comp: any) => graphql(checkUsername, {name: 'checkUsername'})(comp);

export const updateUserDataHoc = (comp: any) => graphql(updateUserData, {name: 'updateUserData'})(comp);

export const searchUsersHoc = (comp: any) => graphql(searchUsersMut, {name: 'search'})(comp);

export const getUserProfileHoc = (comp: any) =>
	graphql(getUserQueryProfileQ, {
		name: 'getUserQuery',
		props(pps: any) {
			const {
				getUserQuery: {loading, getUserQuery, refetch},
			} = pps;
			const results = {getUserQuery: {getUser: {}, loading, refetch}};
			if (!loading) {
				const avatar = getUserAvatar(getUserQuery);
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
				getUserPosts: {loading, getPostsOwner, refetch},
			} = pps;
			if (loading) {
				return pps;
			}
			return {
				...pps,
				...pps.getUserPosts,
				getPostsOwner: {
					...pps.getUserPosts.getPostsOwner,
					Items: getPostsOwner.Items.map((item: any) => {
						const avatar = getUserAvatar({user: item ? item.owner : null});
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
					}),
				},
			};
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
