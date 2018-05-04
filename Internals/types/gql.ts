import {GraphqlQueryControls} from 'react-apollo';

export enum CommentType {
	Post = 'Post',
	Comment = 'Comment',
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
	Media?: IMediaProps[];
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

interface IUserData {
	user: IUserQuery;
}

interface IPostsData {
	allPosts: IPostsProps[];
}

export interface ICommentsResponse {
	data: {
		getComments: IComments[];
	};
}

export type IUserDataResponse = GraphqlQueryControls & IUserData;

export type IAllPostsDataResponse = GraphqlQueryControls & IPostsData;

export type createUserFunc = (params: ICreateUserProps) => void;
