import {CommentCard} from 'components/Displayers/WallPostCard/CommentCard';
import {CommentTextInput} from 'components/Inputs/CommentTextInput';
import {OS_TYPES} from 'consts';
import {IWithResizeOnKeyboardShowProps} from 'hoc';
import {IWithLoaderProps, withInlineLoader} from 'hoc/InlineLoader';
import {withResizeOnKeyboardShow} from 'hoc/ResizeOnKeyboardShow';
import React, {Component, RefObject} from 'react';
import {Platform, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from 'theme';
import {IWallPostComment} from './index';
import style from './style';

interface ICommentsScreenComponentProps extends IWithLoaderProps, IWithResizeOnKeyboardShowProps {
	comments: IWallPostComment[];
	onCommentLike: (comment: IWallPostComment) => void;
	onCommentDelete: (comment: IWallPostComment) => void;
	onCommentReply: (comment: IWallPostComment, startReply: boolean) => void;
	onCommentSend: (commentText: string) => void;
	noComments: boolean;
	startComment: boolean;
	onViewUserProfile: (userId: string) => void;
}

interface ICommentsScreenComponentState {
	showSendButton: boolean;
	commentText: string;
}

class CommentsScreenComponent extends Component<ICommentsScreenComponentProps, ICommentsScreenComponentState> {
	public state = {
		showSendButton: false,
		commentText: '',
	};

	private readonly scrollRef: RefObject<ScrollView> = React.createRef();

	public render() {
		const containerStyles = [
			style.container,
			...(Platform.OS === OS_TYPES.IOS ? [{marginBottom: this.props.marginBottom}] : []),
		];

		return (
			<SafeAreaView style={containerStyles}>
				<ScrollView
					style={style.commentsList}
					keyboardShouldPersistTaps={'handled'}
					ref={this.scrollRef}
					onLayout={() => this.scrollRef.current.scrollToEnd()}
				>
					{this.props.noComments ? (
						<View style={style.noCommentsContainer}>
							<Icon name={'md-list'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
							<Text style={style.noCommentsText}>{'Be the first to comment here'}</Text>
						</View>
					) : (
						// TODO: @jake @serkan check out the similar comment from repliesscreen!
						// and what's with the code repetition here? why not make this a component and reuse?
						this.props.comments.map((comment, index) => (
							<CommentCard
								key={index}
								comment={comment}
								onCommentLike={() => this.props.onCommentLike(comment)}
								onCommentReply={(startReply: boolean) => this.props.onCommentReply(comment, startReply)}
								onCommentDelete={() => this.props.onCommentDelete(comment)}
								onViewUserProfile={this.props.onViewUserProfile}
							/>
						))
					)}
				</ScrollView>
				<CommentTextInput
					autoFocus={this.props.startComment}
					onCommentSend={this.props.onCommentSend}
					placeholder={'Write a comment...'}
				/>
			</SafeAreaView>
		);
	}
}

const inlineLoaderWrapper = withInlineLoader(CommentsScreenComponent);

export default withResizeOnKeyboardShow(inlineLoaderWrapper);
