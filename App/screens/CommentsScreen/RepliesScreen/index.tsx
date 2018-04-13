import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import RepliesScreenComponent from './screen';

interface IRepliesScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class RepliesScreen extends Component<IRepliesScreenProps> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'Replies',
		headerRight: <View />,
	};

	public render() {
		return (
			<RepliesScreenComponent
				{...this.props.navigation.state.params}
				onReplyLike={this.onReplyLikeHandler}
				onSendReply={this.onSendReplyHandler}
			/>
		);
	}

	private onReplyLikeHandler = () => {
		// console.log('onReplyLikeHandler');
	}

	private onSendReplyHandler = (replyText: string) => {
		// console.log('onSendReplyHandler', replyText);
	}
}
