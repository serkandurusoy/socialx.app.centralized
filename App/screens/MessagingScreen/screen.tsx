import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
import {MessagingChatListEntry} from '../../components/MessagingChatListEntry';
import {MessagingTabButton} from '../../components/MessagingTabButton';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../../components/TextInput';
import {Colors, Sizes} from '../../theme';
import {IChatListEntry, MessagingFilterValues} from './index';
import style from './style';

interface IMessagingScreenProps {
	chatListData: IChatListEntry[];
	selectedFilter: MessagingFilterValues;
	setNewFilter: (value: MessagingFilterValues) => void;
	refreshing: boolean;
	refreshData: () => void;
	loadMoreChatEntries: () => void;
	hasMore: boolean;
	searchTermUpdated: (term: string) => void;
}

export interface IMessagingScreenComponentState {}

export default class MessagingComponent extends Component<IMessagingScreenProps, IMessagingScreenComponentState> {
	public static defaultProps: Partial<IMessagingScreenProps> = {};

	public render() {
		return (
			<View style={style.container}>
				<View style={style.searchContainer}>
					<Text style={style.friendsText}>{'Friends'}</Text>
					<View style={style.inputContainer}>
						<SXTextInput
							iconColor={Colors.cadetBlue}
							icon={'search'}
							placeholder={'Search'}
							placeholderColor={Colors.cadetBlue}
							borderColor={Colors.darkGray}
							onChangeText={this.props.searchTermUpdated}
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.done}
							size={InputSizes.Small}
							borderWidth={Sizes.smartHorizontalScale(0.5)}
						/>
					</View>
				</View>
				<View style={style.tabsContainer}>
					<MessagingTabButton
						text={'Chat'}
						selected={this.props.selectedFilter === MessagingFilterValues.Chat}
						onPress={() => this.props.setNewFilter(MessagingFilterValues.Chat)}
					/>
					<MessagingTabButton
						text={'Contacts '}
						selected={this.props.selectedFilter === MessagingFilterValues.Contacts}
						onPress={() => this.props.setNewFilter(MessagingFilterValues.Contacts)}
					/>
				</View>
				{this.conditionalRender()}
			</View>
		);
	}

	private renderChatSection() {
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

	private conditionalRender = () => {
		if (this.props.selectedFilter === MessagingFilterValues.Chat) {
			return this.renderChatSection();
		} else if (this.props.selectedFilter === MessagingFilterValues.Contacts) {
			return this.renderContactsSection();
		}
	}

	private renderContactsSection = () => {
		return <Text>{'renderContactsSection'}</Text>;
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
