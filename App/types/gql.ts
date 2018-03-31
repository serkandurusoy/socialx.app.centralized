import { QueryProps } from './gql';

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

interface IUserQuery {
	userId: string;
	name: string;
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
}

interface IUserData {
	user: IUserQuery;
}

export type IUserDataResponse = QueryProps & IUserData;

export type createUserFunc = (params: ICreateUserProps) => void;
