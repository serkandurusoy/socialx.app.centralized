import React, {Component} from 'react';
import {Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CommentCard} from '../../components/Displayers/WallPostCard/CommentCard';
import {CommentTextInput} from '../../components/Inputs/CommentTextInput';
import {OS_TYPES} from '../../constants';
import {IWithLoaderProps, withInlineLoader} from '../../hoc/InlineLoader';
import {withResizeOnKeyboardShow} from '../../hoc/ResizeOnKeyboardShow';
import {Colors, Sizes} from '../../theme';
import {IWallPostComment} from './index';
import style from './style';

interface ICommentsScreenComponentProps extends IWithLoaderProps {
	marginBottom: number;
	comments: IWallPostComment[];
	onCommentLike: (comment: IWallPostComment) => void;
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
				<View style={style.inputContainer}>
					<TextInput
						ref={(ref: TextInput) => (this.textInput = ref)}
						onChangeText={this.commentTextChangedHandler}
						style={style.textInput}
						placeholder={'Write a comment...'}
						autoFocus={true}
						multiline={true}
						autoCorrect={false}
						underlineColorAndroid={Colors.transparent}
						autoCapitalize='none'
					/>
					{this.renderSendButton()}
				</View>
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
