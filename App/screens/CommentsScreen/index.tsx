import React, {Component} from 'react';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import CommentsScreenComponent from './screen';

export interface IWallPostCommentReply {
	text: string;
	user: {
		fullName: string;
		avatarURL?: string;
	};
	timestamp: Date;
	numberOfLikes: number;
}

export interface IWallPostComment extends IWallPostCommentReply {
	replies: IWallPostCommentReply[];
}

export interface IWallPostCommentsProps {
	// comments: IWallPostComment[];
	navigation: NavigationScreenProp<any>;
}

export default class CommentsScreen extends Component<IWallPostCommentsProps> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		header: null,
	};

	public render() {
		return <CommentsScreenComponent />;
	}
}
