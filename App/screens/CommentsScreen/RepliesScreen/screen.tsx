import {CommentCard} from 'components/Displayers/WallPostCard/CommentCard';
import {CommentTextInput} from 'components/Inputs/CommentTextInput';
import {OS_TYPES} from 'consts';
import {withInlineLoader} from 'hoc';
import {withResizeOnKeyboardShow} from 'hoc/ResizeOnKeyboardShow';
import React, {Component} from 'react';
import {Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from 'theme';
import {IWallPostCommentReply} from '../index';
import style from './style';
interface IRepliesScreenComponentProps {
	replies: IWallPostCommentReply[];
	marginBottom: number;
	onSendReply: (replyText: string) => void;
	onReplyDelete: (replyData: IWallPostCommentReply) => void;
	onReplyLike: (replyData: IWallPostCommentReply) => void;
	onReplyComment: (comment: IWallPostCommentReply, startReply: boolean) => void;
	startReply: boolean;
	noReplies: boolean;
	onViewUserProfile: (userId: string) => void;
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
		const containerStyles = [
			style.container,
			...(Platform.OS === OS_TYPES.IOS ? [{marginBottom: this.props.marginBottom}] : []),
		];

		return (
			<SafeAreaView style={containerStyles}>
				<ScrollView
					style={style.repliesList}
					keyboardShouldPersistTaps={'handled'}
					ref={(ref: ScrollView) => (this.scrollRef = ref)}
					onLayout={() => this.scrollRef.scrollToEnd()}
				>
					{this.renderNoReplies()}
					{this.renderReplies()}
				</ScrollView>
				<CommentTextInput onCommentSend={this.props.onSendReply} placeholder={'Write a reply...'} />
			</SafeAreaView>
		);
	}

	private renderNoReplies = () => {
		if (this.props.noReplies) {
			return (
				<View style={style.noRepliesContainer}>
					<Icon name={'md-list'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
					<Text style={style.noRepliesText}>{'Be the first to comment here'}</Text>
				</View>
			);
		}
		return null;
	};

	private renderReplies = () =>
		this.props.replies.map((reply, index) => (
			<CommentCard
				key={index}
				comment={reply}
				onCommentLike={() => this.props.onReplyLike(reply)}
				onCommentReply={() => this.props.onReplyComment(reply, true)}
				isReply={false}
				onCommentDelete={() => this.props.onReplyDelete(reply)}
				onViewUserProfile={this.props.onViewUserProfile}
			/>
		));
}

const inlineLoaderWrapper = withInlineLoader(RepliesScreenComponent as any);

export default withResizeOnKeyboardShow(inlineLoaderWrapper);
