import moment from 'moment';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../../components/TextInput';
import {Sizes} from '../../theme';
import {Colors} from '../../theme/';
import {MessageData} from './index';
import style from './style';

interface IChatThreadScreenComponentProps {
	sendOwnMessage: (message: string) => void;
	messages: MessageData[];
}

export default class ChatThreadScreenComponent extends Component<IChatThreadScreenComponentProps> {
	private chatTextInputRef: SXTextInput | null = null;

	public render() {
		return (
			<View style={style.container}>
				<GiftedChat
					messages={this.props.messages}
					onSend={this.addOwnMessage}
					isAnimated={false}
					renderMessage={this.renderMessage}
					textInputStyle={style.textInputStyles}
					// renderInputToolbar={this.renderInputToolbar}
					// renderFooter={} // can be used for something like typing
				/>
			</View>
		);
	}

	private addOwnMessage = (newMessages: MessageData[] = []) => {
		newMessages[0].ownMessage = true;
		this.props.sendOwnMessage(newMessages[0]);
	}

	private renderMessage = (props: any) => {
		const currentMessage: MessageData = props.currentMessage;
		const messageDateWithFormat = moment(currentMessage.createdAt).format('hh:mm A');
		if (currentMessage.ownMessage) {
			return this.renderOwnMessage(currentMessage, messageDateWithFormat);
		} else {
			return this.renderFriendMessage(currentMessage, messageDateWithFormat);
		}
	}

	private renderOwnMessage = (currentMessage: MessageData, messageDateWithFormat: string) => {
		return (
			<View style={style.messageContainer}>
				<View style={{flex: 1}} />
				<View style={style.ownMessageShadow}>
					<LinearGradient
						start={{x: 0, y: 0.5}}
						end={{x: 1, y: 0.5}}
						colors={[Colors.fuchsiaBlue, Colors.hollywoodCerise]}
						style={style.ownMessageGradient}
					>
						<Text style={style.ownMessageText} selectable={true}>
							{currentMessage.text}
						</Text>
						<Text style={style.ownMessageDate}>{messageDateWithFormat}</Text>
					</LinearGradient>
				</View>
			</View>
		);
	}

	private renderFriendMessage = (currentMessage: MessageData, messageDateWithFormat: string) => {
		return (
			<View style={style.messageContainer}>
				<View style={style.friendMessageBorder}>
					<Text style={style.friendMessageText} selectable={true}>
						{currentMessage.text}
					</Text>
					<Text style={style.friendMessageDate}>{messageDateWithFormat}</Text>
				</View>
				<View style={{flex: 1}} />
			</View>
		);
	}

	private renderInputToolbar = () => {
		// console.log('renderInputToolbar');
		return (
			<View style={style.inputToolbar}>
				<View style={{flex: 1}}>
					{/*TODO: update borderWidth*/}
					<SXTextInput
						ref={(input) => (this.chatTextInputRef = input)}
						onSubmitPressed={this.sendMessageHandler}
						returnKeyType={TRKeyboardKeys.send}
						placeholder={'Type something...'}
						size={InputSizes.Small}
						borderColor={Colors.chatTextInputBorder}
					/>
				</View>
				<TouchableOpacity style={style.shareButton} onPress={this.showShareOptions}>
					<Icon name={'md-add'} size={Sizes.smartHorizontalScale(30)} color={Colors.tundora} />
				</TouchableOpacity>
			</View>
		);
	}

	private sendMessageHandler = (event: any) => {
		this.props.sendOwnMessage(event.nativeEvent.text);
		if (this.chatTextInputRef) {
			this.chatTextInputRef.inputComponent.clear();
		}
	}

	private showShareOptions = () => {
		alert('showShareOptions');
	}
}
