import {CommentCard} from 'components/Displayers/WallPostCard/CommentCard';
import {CommentTextInput} from 'components/Inputs/CommentTextInput';
import {OS_TYPES} from 'consts';
import {IWithLoaderProps, withInlineLoader} from 'hoc/InlineLoader';
import {withResizeOnKeyboardShow} from 'hoc/ResizeOnKeyboardShow';
import React, {Component} from 'react';
import {Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from 'theme';
import {IWallPostComment} from './index';
import style from './style';

interface ICommentsScreenComponentProps extends IWithLoaderProps {
	marginBottom: number;
	comments: IWallPostComment[];
	onCommentLike: (comment: IWallPostComment) => void;
	onCommentDelete: (comment: IWallPostComment) => void;
	onCommentReply: (comment: IWallPostComment, startReply: boolean) => void;
	onCommentSend: (commentText: string) => void;
	noComments: boolean;
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

	private scrollRef: ScrollView;

	public render() {
		const containerStyles = [style.container];
		if (Platform.OS === OS_TYPES.iOS) {
			containerStyles.push({marginBottom: this.props.marginBottom});
		}
		return this.props.renderWithLoader(
			<SafeAreaView style={containerStyles}>
				<ScrollView
					style={style.commentsList}
					keyboardShouldPersistTaps={'handled'}
					ref={(ref: ScrollView) => (this.scrollRef = ref)}
					onLayout={() => this.scrollRef.scrollToEnd()}
				>
					{this.renderNoComments()}
					{this.renderComments()}
				</ScrollView>
				<CommentTextInput onCommentSend={this.props.onCommentSend} placeholder={'Write a comment...'} />
			</SafeAreaView>,
		);
	}

	private renderComments = () => {
		const ret: any = [];
		this.props.comments.forEach((comment, index) => {
			ret.push(
				<CommentCard
					key={index}
					comment={comment}
					onCommentLike={() => this.props.onCommentLike(comment)}
					onCommentReply={(startReply: boolean) => this.props.onCommentReply(comment, startReply)}
					onCommentDelete={() => this.props.onCommentDelete(comment)}
				/>,
			);
		});
		return ret;
	}

	private renderNoComments = () => {
		if (this.props.noComments) {
			return (
				<View style={style.noCommentsContainer}>
					<Icon name={'md-list'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
					<Text style={style.noCommentsText}>{'Be the first to comment here'}</Text>
				</View>
			);
		}
		return null;
	}
}

const inlineLoaderWrapper = withInlineLoader(CommentsScreenComponent);

export default withResizeOnKeyboardShow(inlineLoaderWrapper);
