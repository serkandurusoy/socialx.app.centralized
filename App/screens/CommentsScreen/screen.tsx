import React, {Component} from 'react';
import {Platform, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CommentCard} from '../../components/Displayers/WallPostCard/CommentCard';
import {OS_TYPES} from '../../constants';
import {withResizeOnKeyboardShow} from '../../hoc/ResizeOnKeyboardShow';
import {Colors, Sizes} from '../../theme';
import {IWallPostComment} from './index';
import style from './style';

interface ICommentsScreenComponentProps {
	marginBottom: number;
	comments: IWallPostComment[];
}

class CommentsScreenComponent extends Component<ICommentsScreenComponentProps> {
	public state = {
		showSendButton: true,
	};

	public render() {
		const containerStyles = [style.container];
		if (Platform.OS === OS_TYPES.iOS) {
			containerStyles.push({marginBottom: this.props.marginBottom});
		}
		return (
			<SafeAreaView style={containerStyles}>
				<ScrollView style={style.commentsList} keyboardShouldPersistTaps={'handled'}>
					{this.renderComments()}
				</ScrollView>
				<View style={style.inputContainer}>
					<TextInput
						// value={''}
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
			</SafeAreaView>
		);
	}

	private renderSendButton = () => {
		if (this.state.showSendButton) {
			return (
				<TouchableOpacity onPress={this.sendCommentHandler} style={style.sendButton}>
					<Icon name={'md-send'} size={Sizes.smartHorizontalScale(30)} color={Colors.fuchsiaBlue} />
				</TouchableOpacity>
			);
		}
		return null;
	}

	private sendCommentHandler = () => {
		// console.log('sendCommentHandler');
	}

	private renderComments = () => {
		const ret = [];
		for (const [index, comment] of this.props.comments.entries()) {
			ret.push(
				<CommentCard
					key={index}
					comment={comment}
					onCommentLike={this.onCommentLikeHandler}
					onCommentReply={this.onCommentReplyHandler}
				/>,
			);
		}
		return ret;
	}

	private onCommentLikeHandler = () => {
		// console.log('onCommentLikeHandler');
	}

	private onCommentReplyHandler = () => {
		// console.log('onCommentReplyHandler');
	}
}

export default withResizeOnKeyboardShow(CommentsScreenComponent);
