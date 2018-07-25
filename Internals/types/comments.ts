import {IUserQuery} from 'types';

export interface IWallPostComment {
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
	replies: IWallPostComment[];
}

export enum CommentsSortingOptions {
	Likes = 'Likes',
	Recent = 'Recent',
}
