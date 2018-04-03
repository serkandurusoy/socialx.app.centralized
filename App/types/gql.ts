import {QueryProps} from './gql';

export {QueryProps} from 'react-apollo';

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

interface IMediaProps {
	id: string;
	hash: string;
	type: string;
	size: number;
}

export interface IPostsProps {
	id: string;
	createdAt: string;
	text: string;
	Media?: IMediaProps[];
	owner: IUserQuery;
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

export type IUserDataResponse = QueryProps & IUserData;

export type IAllPostsDataResponse = QueryProps & IPostsData;

export type createUserFunc = (params: ICreateUserProps) => void;
