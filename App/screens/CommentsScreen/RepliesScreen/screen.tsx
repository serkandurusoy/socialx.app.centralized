import {CommentCard} from 'components/Displayers/WallPostCard/CommentCard';
import {CommentTextInput} from 'components/Inputs/CommentTextInput';
import {OS_TYPES} from 'consts';
import {withResizeOnKeyboardShow} from 'hoc/ResizeOnKeyboardShow';
import React, {Component} from 'react';
import {Platform, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import {IWallPostCommentReply} from '../index';
import style from './style';

interface IRepliesScreenComponentProps {
	replies: IWallPostCommentReply[];
	marginBottom: number;
	onSendReply: (replyText: string) => void;
	onReplyDelete: (replyData: IWallPostCommentReply) => void;
	onReplyLike: (replyData: IWallPostCommentReply) => void;
	startReply: boolean;
}

interface IRepliesScreenComponentState {
	showSendButton: boolean;
	replyText: string;
}

class RepliesScreenComponent extends Component<IRepliesScreenComponentProps, IRepliesScreenComponentState> {
	public static defaultProps: Partial<IRepliesScreenComponentProps> = {};

	public state = {
		showSendButton: false,
		replyText: '',
	};

	private scrollRef: ScrollView;

	public render() {
		const containerStyles = [style.container];
		if (Platform.OS === OS_TYPES.IOS) {
			containerStyles.push({marginBottom: this.props.marginBottom});
		}
		return (
			<SafeAreaView style={containerStyles}>
				<ScrollView
					style={style.repliesList}
					keyboardShouldPersistTaps={'handled'}
					ref={(ref: ScrollView) => (this.scrollRef = ref)}
					onLayout={() => this.scrollRef.scrollToEnd()}
				>
					{this.renderReplies()}
				</ScrollView>
				<CommentTextInput onCommentSend={this.props.onSendReply} placeholder={'Write a reply...'} />
			</SafeAreaView>
		);
	}

	private renderReplies = () => {
		const ret: any = [];
		this.props.replies.forEach((reply, index) => {
			ret.push(
				<CommentCard
					key={index}
					comment={reply}
					onCommentLike={() => this.props.onReplyLike(reply)}
					onCommentReply={() => Function()}
					isReply={true}
					onCommentDelete={() => this.props.onReplyDelete(reply)}
				/>,
			);
		});
		return ret;
	}
}

export default withResizeOnKeyboardShow(RepliesScreenComponent);
