import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {NavigationStackScreenOptions} from 'react-navigation';
import {sentence} from 'txtgen'; // TODO: can be removed later from package.json
import ChatThreadScreenComponent from './screen';

export interface MessageData {
	_id: number;
	text: string;
	createdAt: Date;
	ownMessage: boolean;
}

export interface IChatThreadScreenState {
	messages: MessageData[];
}

let currentMessageId = 0;

const getHistoryMessages = () => {
	const ret = [];
	for (let i = 0; i < 30; i++) {
		ret.push({
			_id: ++currentMessageId,
			text: sentence(),
			createdAt: new Date(),
			ownMessage: Math.random() >= 0.5,
		});
	}
	return ret;
};

export default class ChatThreadScreen extends Component<any, IChatThreadScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'ChatThreadScreen',
	};

	public state = {
		messages: getHistoryMessages(), // we should init here with history messages
		// messages: [], // we should init here with history messages
	};

	public render() {
		return <ChatThreadScreenComponent messages={this.state.messages} sendOwnMessage={this.sendOwnMessageHandler} />;
	}

	private simulateFriendResponse = () => {
		const replyDelay = (Math.round(Math.random() * 5) + 2) * 1000;
		const replyMessage = sentence();
		// console.log('Friend will reply in', replyDelay, 'with message', replyMessage);
		setTimeout(() => {
			const friendMessage: MessageData = {
				_id: ++currentMessageId,
				text: replyMessage,
				createdAt: new Date(),
				ownMessage: false,
			};
			this.addNewMessageToTheChat([friendMessage]);
		}, replyDelay);
	}

	private sendOwnMessageHandler = (message: string) => {
		// TODO: Network send message
		const newMessage: MessageData = {
			_id: ++currentMessageId,
			text: message,
			createdAt: new Date(),
			ownMessage: true,
		};
		this.addNewMessageToTheChat([newMessage]);
		this.simulateFriendResponse();
	}

	private addNewMessageToTheChat = (messages: MessageData[]) => {
		// TODO: call this when a friend message arrives
		this.setState({
			messages: GiftedChat.append(this.state.messages, messages),
		});
	}
}
