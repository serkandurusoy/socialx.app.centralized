import {IUserQuery} from 'types';

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

export type ICommentOrReply = IWallPostComment | IWallPostCommentReply;

export enum CommentsSortingOptions {
	Likes = 'Likes',
	Recent = 'Recent',
}
