import React, {RefObject} from 'react';
import {Platform, SafeAreaView, ScrollView} from 'react-native';
import {compose} from 'recompose';

import {CommentCard, CommentTextInput} from 'components';
import {OS_TYPES} from 'consts';
import {IWithLoaderProps, IWithResizeOnKeyboardShowProps, withInlineLoader, withResizeOnKeyboardShow} from 'hoc';
import {IWallPostComment} from 'types';
import {NoComments} from './components/NoComments';
import style from './style';

const scrollRef: RefObject<ScrollView> = React.createRef();

interface ICommentsScreenComponentProps extends IWithLoaderProps, IWithResizeOnKeyboardShowProps {
	comments: IWallPostComment[];
	onCommentLike: (comment: IWallPostComment) => void;
	onCommentDelete: (comment: IWallPostComment) => void;
	onCommentReply: (comment: IWallPostComment, startReply: boolean) => void;
	onCommentSend: () => void;
	onCommentTextChange: (commentText: string) => void;
	noComments: boolean;
	startComment: boolean;
	onViewUserProfile: (userId: string) => void;
	requestingLikeMap: any;
	commentText: string;
	showSendButton: boolean;
	noCommentsText: string;
	commentInputPlaceholder: string;
}

const CommentsScreenComponent: React.SFC<ICommentsScreenComponentProps> = ({
	comments,
	onCommentLike,
	onCommentDelete,
	onCommentReply,
	onCommentSend,
	noComments,
	startComment,
	onViewUserProfile,
	marginBottom,
	requestingLikeMap,
	commentText,
	showSendButton,
	onCommentTextChange,
	noCommentsText,
	commentInputPlaceholder,
}) => {
	const containerStyles = [style.container, ...(Platform.OS === OS_TYPES.IOS ? [{marginBottom}] : [])];

	return (
		<SafeAreaView style={containerStyles}>
			<ScrollView
				style={style.commentsList}
				keyboardShouldPersistTaps={'handled'}
				ref={scrollRef}
				onLayout={() => scrollRef.current && scrollRef.current.scrollToEnd()}
			>
				{noComments ? (
					<NoComments text={noCommentsText} />
				) : (
					comments.map((comment) => (
						<CommentCard
							key={comment.id}
							comment={comment}
							onCommentLike={() => onCommentLike(comment)}
							onCommentReply={(startReply: boolean) => onCommentReply(comment, startReply)}
							onCommentDelete={() => onCommentDelete(comment)}
							onViewUserProfile={onViewUserProfile}
							requestingLike={requestingLikeMap.hasOwnProperty(comment.id)}
						/>
					))
				)}
			</ScrollView>
			<CommentTextInput
				autoFocus={startComment}
				onCommentSend={onCommentSend}
				placeholder={commentInputPlaceholder}
				showSendButton={showSendButton}
				commentText={commentText}
				onCommentTextChange={onCommentTextChange}
			/>
		</SafeAreaView>
	);
};

export default compose(
	withInlineLoader,
	withResizeOnKeyboardShow,
)(CommentsScreenComponent);
