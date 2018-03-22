import React, {Component} from 'react';
import {ActivityIndicator, FlatList, TouchableWithoutFeedback, View} from 'react-native';
import {MessagingChatListEntry} from '../../components/MessagingChatListEntry';
import style from './chat.screen.style';
import {IChatListEntry} from './index';

interface IChatScreenTabProps {
	chatListData: IChatListEntry[];
	refreshing: boolean;
	refreshData: () => void;
	loadMoreChatEntries: () => void;
	hasMore: boolean;
}

export default class ChatScreenTab extends Component<IChatScreenTabProps, any> {
	public render() {
		return (
			<FlatList
				refreshing={this.props.refreshing}
				onRefresh={this.props.refreshData}
				data={this.props.chatListData}
				keyExtractor={(item: IChatListEntry, index: number) => index.toString()}
				renderItem={this.renderUserWithLastMessage}
				onEndReached={this.props.loadMoreChatEntries}
				onEndReachedThreshold={0.2}
				keyboardShouldPersistTaps={'handled'}
				extraData={this.props.hasMore}
				ListFooterComponent={this.renderFooterWhenLoading}
			/>
		);
	}

	private renderUserWithLastMessage = (data: {item: IChatListEntry; index: number}) => {
		return <MessagingChatListEntry {...data.item} />;
	}

	private renderFooterWhenLoading = () => {
		if (this.props.hasMore) {
			return (
				<View style={style.bottomLoadingContainer}>
					<ActivityIndicator size={'small'} />
				</View>
			);
		}
		return null;
	}
}
