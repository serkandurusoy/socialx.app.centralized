export interface ISearchUserResult {
	data: Data;
}

export interface Data {
	searchUsers: SearchUser[];
}

export interface SearchUser {
	user: User;
	connection: Connection;
}

export enum Connection {
	Friend = 'FRIEND',
	NotFriend = 'NOT_FRIEND',
	FriendRequestSent = 'FRIEND_REQUEST_SENT',
}

export interface User {
	userId: string;
	username: string;
	name: string;
	avatar: Avatar | null;
}

export interface Avatar {
	id: string;
	hash: string;
}
