import React, {Component} from 'react';
import {Platform, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import Icon from 'react-native-vector-icons/Ionicons';
import {CommentCard} from '../../../components/Displayers/WallPostCard/CommentCard';
import {OS_TYPES} from '../../../constants';
import {withResizeOnKeyboardShow} from '../../../hoc/ResizeOnKeyboardShow';
import {Colors, Sizes} from '../../../theme';
import {IWallPostCommentReply} from '../index';
import style from './style';

interface IRepliesScreenComponentProps {
	replies: IWallPostCommentReply[];
	marginBottom: number;
	onSendReply: (replyText: string) => void;
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
	private textInput: TextInput;

	public componentDidMount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustResize();
		}
	}

	public componentWillUnmount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
	}

	public render() {
		const containerStyles = [style.container];
		if (Platform.OS === OS_TYPES.iOS) {
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
				<View style={style.inputContainer}>
					<TextInput
						ref={(ref: TextInput) => (this.textInput = ref)}
						onChangeText={this.replyTextChangedHandler}
						style={style.textInput}
						placeholder={'Write a reply...'}
						autoFocus={this.props.startReply}
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
				<TouchableOpacity onPress={this.sendReplyHandler} style={style.sendButton}>
					<Icon name={'md-send'} size={Sizes.smartHorizontalScale(30)} color={Colors.fuchsiaBlue} />
				</TouchableOpacity>
			);
		}
		return null;
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
				/>,
			);
		});
		return ret;
	}

	private sendReplyHandler = () => {
		this.props.onSendReply(this.state.replyText);
		this.setState({
			replyText: '',
			showSendButton: false,
		});
		this.textInput.blur();
		this.textInput.clear(); // not working on iOS?! ..very strange
	}

	private replyTextChangedHandler = (value: string) => {
		this.setState({
			replyText: value,
			showSendButton: value !== '',
		});
	}
}

export default withResizeOnKeyboardShow(RepliesScreenComponent);
