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

interface IPostsProps {
	id: string;
	ownerId: string;
	createdAt: string;
	text: string;
	Media?: IMediaProps[];
}

interface IUserQuery {
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

export type IUserDataResponse = QueryProps & IUserData;

export type createUserFunc = (params: ICreateUserProps) => void;
