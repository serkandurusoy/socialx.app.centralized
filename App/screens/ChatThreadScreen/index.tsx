import {ScreenHeaderButton} from 'components/Interaction';
import React, {Component} from 'react';
import {Image, InteractionManager, Text, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {NavigationScreenProp} from 'react-navigation';
import uuidv4 from 'uuid/v4';
import ChatThreadScreenComponent from './screen';
import style from './style';

import {NetServerPort, TCPClient, TCPServer} from 'backend/socket';
import {Server, Socket} from 'net';

export interface MessageData {
	_id: string;
	text?: string;
	createdAt: Date;
	ownMessage: boolean;
	imageURL?: string;
	base64Image?: string; // we should try to avoid this option!
	user?: any; // just to avoid library warnings
	geolocation?: {
		latitude: number;
		longitude: number;
	};
}

const instanceOfMessageData = (object: any): object is MessageData => {
	return typeof object._id === 'string';
};

export interface IExtraData {
	isTyping: boolean;
}

export interface IChatThreadScreenState {
	messages: MessageData[];
	isLoadingEarlier: boolean;
	hasMore: boolean;
	text: string;
	isTyping: boolean;
	timeframeBuffer: number;
}

interface IChatThreadScreenProps {
	navigation: NavigationScreenProp<any>;
}

const TOTAL_NUMBER_OF_MESSAGES = 44;
const ONE_PAGE_NUMBER_OF_MESSAGES = 10;

const getOnePageOfMessages = () => {
	const ret = [];
	for (let i = 0; i < ONE_PAGE_NUMBER_OF_MESSAGES; i++) {
		const isImageMessage = Math.random() >= 0.7;
		const imageWidth = Math.round(Math.random() * 2000);
		const imageHeight = Math.round(Math.random() * 1125);
		const newMessage: MessageData = {
			_id: uuidv4(),
			createdAt: new Date(),
			ownMessage: Math.random() >= 0.5,
			user: {},
		};
		if (isImageMessage) {
			newMessage.imageURL = `https://placeimg.com/${imageWidth}/${imageHeight}/any`;
		} else {
			newMessage.text = 'hey';
		}
		ret.push(newMessage);
	}
	return ret;
};

export default class ChatThreadScreen extends Component<IChatThreadScreenProps, IChatThreadScreenState> {
	private static navigationOptions = (props: IChatThreadScreenProps) => ({
		headerTitle: () => {
			const params = props.navigation.state.params || {};
			if (params.user) {
				const {fullName, avatarURL} = params.user;
				return (
					<View style={style.headerContainer}>
						<Image source={{uri: avatarURL}} style={style.friendAvatar} />
						<Text style={style.friendFullName}>{fullName.toUpperCase()}</Text>
					</View>
				);
			}
			return null;
		},
		headerRight: <ScreenHeaderButton iconName={'md-call'} onPress={() => ChatThreadScreen.runMakeCallHandler(props)} />,
	})

	private static runMakeCallHandler(props: any) {
		const params = props.navigation.state.params || {};
		if (params.makeCallHandler) {
			params.makeCallHandler();
		}
	}

	// to send data only.
	public friendTcpClient: any;
	// to receive data only.
	public phoneTcpServer: any;

	public state = {
		messages: getOnePageOfMessages(), // we should init here with history messages
		isLoadingEarlier: false,
		hasMore: true,
		text: '',
		isTyping: false,
		timeframeBuffer: 0,
	};

	public componentWillMount() {
		// hook server calls from this client. messages etc..
		// this.phoneTcpServer = TCPServer(this.socketOnGetData, () => {
		// 	// after the server is started, hook the client to own server (TODO: hook to friend server)
		// 	// and assign to local var for local use
		// 	this.friendTcpClient = new TCPClient(NetServerPort);
		// });
	}

	public componentDidMount() {
		this.setState({timeframeBuffer: new Date(Date.now()).getTime()});
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({
				makeCallHandler: this.makeCallHandler,
			});
		});
	}

	public renderUserTyping = () => {
		if (this.state.isTyping) {
			return (
				<View style={style.isTypingContainer}>
					<Text style={style.isTypingText}>is Typing..</Text>
				</View>
			);
		}
	}

	public render() {
		return (
			<ChatThreadScreenComponent
				messages={this.state.messages}
				sendOwnMessage={this.sendOwnMessageHandler}
				loadEarlierMessages={this.loadEarlierMessagesHandler}
				isLoadingEarlier={this.state.isLoadingEarlier}
				hasMore={this.state.hasMore}
				text={this.state.text}
				onTextChange={this.setText}
				renderFooter={this.renderUserTyping}
			/>
		);
	}

	private setComment = (text: string) => {
		const port = parseInt(text, undefined);
		console.log('connecting to', port);
		// this.friendTcpClient = new TCPClient(port, '10.0.2.2');
	}

	private setText = (text: string) => {
		// // create time buffer to prevent bulky socket data
		// const bufferDate = this.state.timeframeBuffer;
		// const nowDate = new Date(Date.now());
		// const secondsBuffer = (nowDate.getTime() - bufferDate) / 1000;

		// if (text === '') {
		// 	const sendData: IExtraData = {
		// 		isTyping: false,
		// 	};
		// 	this.friendTcpClient.write(JSON.stringify(sendData));
		// 	this.setState({text});
		// 	return;
		// }

		// if (text.length === 1) {
		// 	const sendData: IExtraData = {
		// 		isTyping: true,
		// 	};
		// 	this.friendTcpClient.write(JSON.stringify(sendData));
		// 	this.setState({timeframeBuffer: nowDate.getTime()});
		// }

		// if (secondsBuffer > 5) {
		// 	const sendData: IExtraData = {
		// 		isTyping: true,
		// 	};
		// 	this.friendTcpClient.write(JSON.stringify(sendData));
		// 	this.setState({timeframeBuffer: nowDate.getTime()});
		// }
		// this.setState({text});
	}

	// each time the server gets a message, it gets parsed and passed here.
	private socketOnGetData = (data: MessageData | IExtraData) => {
		// if (instanceOfMessageData(data)) {
		// 	data.text = 'From realtime p2p';
		// 	data.ownMessage = false;
		// 	data._id = uuidv4();
		// 	this.addNewMessageToTheChat(data);
		// } else {
		// 	this.setState({isTyping: data.isTyping});
		// 	// stop typing handler if the user is not typing for x~ seconds
		// 	// TODO: make better
		// 	setTimeout(() => {
		// 		this.setState({isTyping: false});
		// 	}, 50000);
		// }
	}

	private sendOwnMessageHandler = (message: MessageData) => {
		// // TODO: Network send message
		// if (message.text.includes('!port')) {
		// 	this.setComment(message.text.replace('!port ', ''));
		// 	this.addNewMessageToTheChat({
		// 		_id: uuidv4(),
		// 		text: 'Connecting..',
		// 		createdAt: new Date(),
		// 		ownMessage: true,
		// 	});
		// 	return;
		// }
		// this.friendTcpClient.write(JSON.stringify(message));
		// this.addNewMessageToTheChat(message);
		// this.setText('');
	}

	private addNewMessageToTheChat = (message: MessageData) => {
		message.user = {};
		this.setState({
			messages: GiftedChat.append(this.state.messages, [message]),
		});
	}

	private makeCallHandler = () => {
		alert('TODO: makeCallHandler');
	}

	// todo: get all recent messages with the socket client? database? storage?
	private loadEarlierMessagesHandler = () => {
		if (this.state.messages.length < TOTAL_NUMBER_OF_MESSAGES) {
			this.setState({isLoadingEarlier: true});
			setTimeout(() => {
				const newMessages = this.state.messages.concat(getOnePageOfMessages());
				this.setState({
					isLoadingEarlier: false,
					messages: newMessages,
					hasMore: newMessages.length < TOTAL_NUMBER_OF_MESSAGES,
				});
			}, 1500);
		}
	}
}
