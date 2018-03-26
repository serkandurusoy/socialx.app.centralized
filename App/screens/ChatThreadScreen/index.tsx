import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {NavigationScreenProp} from 'react-navigation';
import {sentence} from 'txtgen'; // TODO: can be removed later from package.json
import uuidv4 from 'uuid/v4';
import {ScreenHeaderButton} from '../../components/ScreenHeaderButton';
import ChatThreadScreenComponent from './screen';
import style from './style';

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

export interface IChatThreadScreenState {
	messages: MessageData[];
	isLoadingEarlier: boolean;
	hasMore: boolean;
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
			newMessage.text = sentence();
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
		headerRight: <ScreenHeaderButton iconName={'md-call'} onPress={() => ChatThreadScreen.sampleMethod(props)} />,
	})

	private static sampleMethod(props: any) {
		const params = props.navigation.state.params || {};
		if (params.makeCallHandler) {
			params.makeCallHandler();
		}
	}

	public state = {
		messages: getOnePageOfMessages(), // we should init here with history messages
		isLoadingEarlier: false,
		hasMore: true,
	};

	public componentWillMount() {
		this.props.navigation.setParams({
			user: {
				fullName: 'Michael Perry',
				avatarURL: 'https://placeimg.com/119/119/any',
			},
			makeCallHandler: this.makeCallHandler,
		});
	}

	public render() {
		return (
			<ChatThreadScreenComponent
				messages={this.state.messages}
				sendOwnMessage={this.sendOwnMessageHandler}
				loadEarlierMessages={this.loadEarlierMessagesHandler}
				isLoadingEarlier={this.state.isLoadingEarlier}
				hasMore={this.state.hasMore}
			/>
		);
	}

	private simulateFriendResponse = () => {
		const replyDelay = (Math.round(Math.random() * 5) + 2) * 1000;
		const replyMessage = sentence();
		setTimeout(() => {
			const friendMessage: MessageData = {
				_id: uuidv4(),
				text: replyMessage,
				createdAt: new Date(),
				ownMessage: false,
			};
			this.addNewMessageToTheChat(friendMessage);
		}, replyDelay);
	}

	private sendOwnMessageHandler = (message: MessageData) => {
		// TODO: Network send message
		this.addNewMessageToTheChat(message);
		this.simulateFriendResponse();
	}

	private addNewMessageToTheChat = (message: MessageData) => {
		// TODO: call this when a friend message arrives
		message.user = {};
		this.setState({
			messages: GiftedChat.append(this.state.messages, [message]),
		});
	}

	private makeCallHandler = () => {
		alert('TODO: makeCallHandler');
	}

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
