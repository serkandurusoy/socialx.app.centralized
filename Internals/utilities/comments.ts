import {ISimpleComment} from 'types';

export const bestTwoComments = (post: {comments: ISimpleComment[]}) => {
	const comments = [...post.comments];
	// return comments;
	comments.sort((c1: ISimpleComment, c2: ISimpleComment) => {
		if (c1.likes.length > c2.likes.length) {
			return -1;
		} else if (c1.likes.length < c2.likes.length) {
			return 1;
		}
		return 0;
	});
	return comments.slice(0, 2);
};

export const numberOfComments = (post: any) => {
	let cres = 0;
	for (let x = 0; x < post.comments.length; x++) {
		cres += post.comments[x].comments.length + 1;
	}
	return cres;
};
