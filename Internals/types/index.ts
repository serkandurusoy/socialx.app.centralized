export * from './gql';
export * from './appUI';
export * from './popup';
export * from './global';
export * from './confirmation';

// temp

import {Image as PickerImage} from 'react-native-image-crop-picker';
import {IUserQuery} from './gql';

export interface FriendsSearchResult {
	id: string;
	fullName: string;
	location: string;
	avatarURL?: string;
}

export interface IWallPostCommentReply {
	id: string;
	text: string;
	user: {
		fullName: string;
		avatarURL?: string;
		id: string;
	};
	timestamp: Date;
	numberOfLikes: number;
	likes: IUserQuery[];
	likedByMe: boolean;
}

export interface IWallPostComment extends IWallPostCommentReply {
	replies: IWallPostCommentReply[];
}

export enum SearchResultKind {
	Friend = 'FRIEND',
	NotFriend = 'NOT_FRIEND',
	FriendRequestSent = 'FRIEND_REQUEST_SENT',
	Group = 'group',
}

export interface SearchResultPeople {
	id: string;
	kind: SearchResultKind;
	fullName: string;
	username: string;
	avatarURL?: string;
}

export interface SearchResultGroups {
	id: string;
	kind: SearchResultKind;
	fullName: string;
	username: string;
	avatarURL?: string;
}

export type SearchResultData = SearchResultPeople | SearchResultGroups;

export interface SearchResultCreateGroup {
	id: string;
	fullName: string;
	location: string;
	avatarURL?: string;
}

export interface WallPostPhotoOptimized extends PickerImage {
	contentOptimizedPath?: string;
	type: string;
	pathx: string;
}
