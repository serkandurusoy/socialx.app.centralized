import {IContactListItem} from 'components/Displayers';
import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import MessagingComponent from './screen';

export interface IChatListEntry {
	avatarURL: string;
	fullName: string;
	message: string;
	time: Date;
}

interface IMessagingScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class MessagingScreen extends Component<IMessagingScreenProps> {
	private static navigationOptions = {
		title: 'MESSAGING',
		headerRight: <View />,
	};

	public render() {
		return (
			<MessagingComponent onContactSelect={this.onContactSelectHandler} onChatItemPress={this.onChatItemPressHandler} />
		);
	}

	private onContactSelectHandler = (data: IContactListItem) => {
		this.props.navigation.navigate('ChatThreadScreen', {
			user: {
				fullName: data.name,
				avatarURL: data.avatarURL,
			},
		});
	};

	private onChatItemPressHandler = (item: IChatListEntry) => {
		this.props.navigation.navigate('ChatThreadScreen', {user: item});
	};
}
