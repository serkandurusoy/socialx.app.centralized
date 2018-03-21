export interface ICreateUserProps {
	variables: {
		userId: string;
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

export type createUserFunc = (params: ICreateUserProps) => void;
