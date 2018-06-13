import {GraphqlQueryControls} from 'react-apollo';

export enum CommentType {
	Post = 'Post',
	Comment = 'Comment',
}

export enum NOTIFICATION_TYPES {
	RECENT_COMMENT = 'RECENT_COMMENT',
	FRIEND_REQUEST = 'FRIEND_REQUEST',
	FRIEND_REQUEST_RESPONSE = 'FRIEND_REQUEST_RESPONSE',
	GROUP_REQUEST = 'GROUP_REQUEST',
	SUPER_LIKED = 'SUPER_LIKED',
}

export interface INotifications {
	id: string;
	createdAt: string;
	trigger: string;
	data: string;
	targetUser: IUserQuery;
	owner: IUserQuery;
	type: NOTIFICATION_TYPES;
	status: string;
}

export interface ICreateUserProps {
	variables: {
		username: string;
		name: string;
		email: string;
		bio?: string;
		age?: number;
		gender?: string;
		location?: string;
		avatar: string;
	};
}

export interface IMediaProps {
	id: string;
	hash: string;
	type: string;
	size: number;
	optimizedHash: string;
	numberOfLikes?: number;
	numberOfComments?: number;
}

export interface IComments {
	id: string;
	owner: IUserQuery;
	targetComment: string;
	targetPost: string;
	type: CommentType;
	createdAt: string;
	text: string;
	likes: IUserQuery[];
	comments: IComments[];
}

export interface IPostsProps {
	id: string;
	createdAt: string;
	text: string;
	Media: IMediaProps[];
	owner: IUserQuery;
	likes: IUserQuery[];
	comments: IComments[];
}

export interface IUserQuery {
	userId: string;
	name: string;
	username: string;
	email: string;
	bio?: string;
	age?: number;
	gender?: string;
	location?: string;
	avatar?: {
		hash: string;
		type: string;
		id: string;
		size: number;
	};
	posts?: IPostsProps[];
}

export interface IPaginatedPosts {
	Items: IPostsProps[];
	nextToken: string;
}

// <------------- Data Wrappers ------------->
interface INotificationsData {
	myNotifications: INotifications[];
}

interface IUserData {
	user: IUserQuery;
}

interface IPostsData {
	getPublicPosts: IPaginatedPosts;
}

export interface ICommentsResponse {
	data: {
		getComments: IComments[];
	};
}

export interface ISimpleComment {
	id: string;
	text: string;
	likes: Array<{
		userId: string;
	}>;
	owner: {
		userId: string;
		username: string;
	};
}

export type INotificationsResponse = GraphqlQueryControls & INotificationsData;

export type IUserDataResponse = GraphqlQueryControls & IUserData;

export type IAllPostsDataResponse = GraphqlQueryControls & IPostsData;

export type createUserFunc = (params: ICreateUserProps) => void;
