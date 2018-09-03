import {IMediaProps, ISimpleComment} from 'types';

export const bestTwoComments = (post: {comments: ISimpleComment[]}) => {
	const comments = [...post.comments];
	comments.sort((c1: ISimpleComment, c2: ISimpleComment) => {
		try {
			if (c1.likes.length > c2.likes.length) {
				return -1;
			} else if (c1.likes.length < c2.likes.length) {
				return 1;
			}
			return 0;
		} catch (ex) {
			console.log('Error sorting comments by likes', ex);
			return 0;
		}
	});
	return comments.slice(0, 2);
};

export const numberOfComments = (post: any) => {
	let ret = 0;
	const {comments} = post;

	if (!comments.length) {
		return 0;
	}

	for (let x = 0; x < comments.length; x++) {
		ret += comments[x].comments.length + 1;
	}
	return ret;
};

export const getPostMedia = (medias: IMediaProps[], numberOfLikes: number, numComments: number) => {
	// for now all medias in a post have the same number of likes, but later each can have own number
	const ret = [];
	const newProps = {
		numberOfComments: numComments,
		numberOfLikes,
	};
	for (let i = 0; i < medias.length; i++) {
		ret[i] = {...medias[i], ...newProps};
	}
	return ret;
};
