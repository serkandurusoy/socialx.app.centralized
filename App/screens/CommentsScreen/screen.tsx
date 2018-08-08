import React, {RefObject} from 'react';
import {Platform, SafeAreaView, ScrollView} from 'react-native';
import {compose} from 'recompose';

import {CommentCard, CommentTextInput, WallPostMedia} from 'components';
import {OS_TYPES} from 'consts';
import {IWithLoaderProps, IWithResizeOnKeyboardShowProps, withInlineLoader, withResizeOnKeyboardShow} from 'hoc';
import {IMediaProps, IUserQuery, IWallPostComment} from 'types';
import {IWithTranslationProps, withTranslations} from 'utilities';

import {NoComments, PostActions, PostLikes, PostOwner, PostText} from './components';
import style from './style';

const scrollRef: RefObject<ScrollView> = React.createRef();

interface ICommentsScreenComponentProps
	extends IWithLoaderProps,
		IWithResizeOnKeyboardShowProps,
		IWithTranslationProps {
	comments: IWallPostComment[];
	onCommentLike: (comment: IWallPostComment) => void;
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
	onShowOptionsMenu: (comment: IWallPostComment) => void;
	postData: any;
	postOwner: object;
	onCommentsBackPress: () => void;
	onImagePress: (index: any, medias: IMediaProps[]) => void;
	onLikePress: (likedByMe?: boolean, postId?: string) => Promise<any>;
	currentUser: any;
	getText: (value: string, ...args: any[]) => string;
	getCommentContainerWidth: (value: number) => void;
	commentLikesPosition: object;
	optionsProps: object;
}

const CommentsScreenComponent: React.SFC<ICommentsScreenComponentProps> = ({
	comments,
	onCommentLike,
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
	onShowOptionsMenu,
	postData,
	postOwner,
	onCommentsBackPress,
	onImagePress,
	onLikePress,
	currentUser,
	getText,
	getCommentContainerWidth,
	commentLikesPosition,
	optionsProps,
}) => {
	const containerStyles = [style.container, ...(Platform.OS === OS_TYPES.IOS ? [{marginBottom}] : [])];
	const {id, likes, media, numberOfLikes, text, timestamp} = postData;
	const likedByMe = !!likes.find((like: IUserQuery) => like.userId === currentUser.userId);

	return (
		<SafeAreaView style={containerStyles}>
			<ScrollView
				style={style.commentsList}
				keyboardShouldPersistTaps='handled'
				ref={scrollRef}
				onLayout={() => scrollRef.current && scrollRef.current.scrollToEnd()}
			>
				<PostOwner
					owner={postOwner}
					timestamp={timestamp}
					onBackPress={onCommentsBackPress}
					optionsProps={optionsProps}
				/>
				{text ? <PostText text={text} /> : null}
				{media && (
					<WallPostMedia
						mediaObjects={media}
						onMediaObjectView={(index: number) => onImagePress(index, media)}
						// onLikeButtonPressed={this.onDoubleTapLikeHandler}
						noInteraction={false}
					/>
				)}
				<PostLikes getText={getText} likes={likes} numberOfLikes={numberOfLikes} />
				<PostActions likedByMe={likedByMe} onLikePress={() => onLikePress(likedByMe, id)} />
				{noComments ? (
					<NoComments text={noCommentsText} />
				) : (
					comments.map((comment) => (
						<CommentCard
							key={comment.id}
							comment={comment}
							onCommentLike={() => onCommentLike(comment)}
							onCommentReply={(startReply: boolean) => onCommentReply(comment, startReply)}
							onViewUserProfile={onViewUserProfile}
							requestingLike={!!requestingLikeMap[comment.id]}
							onShowOptionsMenu={() => onShowOptionsMenu(comment)}
							getCommentContainerWidth={(width: number) => getCommentContainerWidth(width)}
							commentLikesPosition={commentLikesPosition}
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
	withTranslations,
)(CommentsScreenComponent);
