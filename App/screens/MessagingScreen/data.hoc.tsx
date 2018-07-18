import {IContactListItem} from 'components/Displayers';
import {MessagingFilterValues} from 'components/Messaging';
import React from 'react';
import {View} from 'react-native';
import {DUMMY_CONTACTS_LIST} from '../../../storybook/stories/ContactsList.stories';
import {IChatListEntry} from './index';

const FILTERED_CHAT_MESSAGES: IChatListEntry[] = [
	{
		avatarURL: 'https://placeimg.com/122/122/people',
		fullName: 'Ionut Movila',
		message: 'Da da dadadada?',
		time: new Date(),
	},
	{
		avatarURL: 'https://placeimg.com/123/123/people',
		fullName: 'Marius Marius',
		message: 'What are you doing?',
		time: new Date(),
	},
	{
		avatarURL: 'https://placeimg.com/124/124/people',
		fullName: 'Crestin Crestin',
		message: 'What are you doing?',
		time: new Date(),
	},
];

const SAMPLE_CHAT_MESSAGES: IChatListEntry[] = [
	{
		avatarURL: 'https://placeimg.com/120/120/people',
		fullName: 'Tom Thompson',
		message: 'What are you doing? And this message is really long one but only first line should show.',
		time: new Date(2018, 1, 15, 14, 5),
	},
	{
		avatarURL: 'https://placeimg.com/121/121/people',
		fullName: 'Gridan Gabriel',
		message: 'No no no no?',
		time: new Date(),
	},
	{
		avatarURL: 'https://placeimg.com/125/125/people',
		fullName: 'Ionut Movila',
		message: 'What are you doing?',
		time: new Date(),
	},
	{
		avatarURL: 'https://placeimg.com/126/126/people',
		fullName: 'Ionut Movila',
		message: 'What are you doing?',
		time: new Date(),
	},
	...FILTERED_CHAT_MESSAGES,
];

const TOTAL_NUMBER_OF_CHAT_ENTRIES = 40;

export interface IMessagingWithDataHooksProps {
	onContactsFilterUpdated: (filterValue: MessagingFilterValues) => void;
	onSearchTermUpdated: (term: string) => void;
	chatListData: IChatListEntry[];
	refreshingChatListData: boolean;
	onRefreshChatListData: () => void;
	loadMoreChatEntries: () => void;
	hasMoreChatListEntries: boolean;
	contactsList: IContactListItem[];
}

interface IMessagingWithDataHooksState {
	chatListData: IChatListEntry[];
	refreshingChatListData: boolean;
	hasMoreChatListEntries: boolean;
	contactsList: IContactListItem[];
}

export const messagingWithDataHooks = (BaseComponent: React.ComponentType<IMessagingWithDataHooksProps>) => {
	return class extends React.Component<any, IMessagingWithDataHooksState> {
		public state = {
			// TODO: load initial values here for the chat list
			chatListData: SAMPLE_CHAT_MESSAGES,
			// TODO: load all values here for the contacts list. List should be ordered 'asc' by .name
			contactsList: DUMMY_CONTACTS_LIST,
			refreshingChatListData: false,
			hasMoreChatListEntries: true,
		};

		private isLoadingNewChatEntries = false;

		public render() {
			return (
				<View style={{flex: 1}}>
					<BaseComponent
						{...this.props}
						onContactsFilterUpdated={this.onContactsFilterUpdatedHandler}
						onSearchTermUpdated={this.onSearchTermUpdatedHandler}
						chatListData={this.state.chatListData}
						onRefreshChatListData={this.refreshChatListDataHandler}
						refreshingChatListData={this.state.refreshingChatListData}
						hasMoreChatListEntries={this.state.hasMoreChatListEntries}
						loadMoreChatEntries={this.loadMoreChatEntriesHandler}
						contactsList={this.state.contactsList}
					/>
				</View>
			);
		}

		private onContactsFilterUpdatedHandler = (filterValue: MessagingFilterValues) => {
			// console.log('TODO: update this.state.contactsList for filter value', filterValue);
			// and remove below dummy logic
			const updatedContactsList =
				// TODO @serkan @jake use of slice is generally confusing, prefer filter
				filterValue === MessagingFilterValues.Recent ? DUMMY_CONTACTS_LIST.slice(0, 20) : DUMMY_CONTACTS_LIST;
			this.setState({
				contactsList: updatedContactsList,
			});
		};

		private onSearchTermUpdatedHandler = (term: string) => {
			// TODO: just a dummy condition here; update with real logic
			const hasSearchResults = term.length > 2 && term.length < 8;
			// TODO @serkan @jake use of slice is generally confusing, prefer filter
			const filteredContactsList = DUMMY_CONTACTS_LIST.slice(21, 45);
			this.setState({
				chatListData: hasSearchResults ? FILTERED_CHAT_MESSAGES : SAMPLE_CHAT_MESSAGES,
				contactsList: hasSearchResults ? filteredContactsList : DUMMY_CONTACTS_LIST,
			});
		};

		private refreshChatListDataHandler = () => {
			// TODO: update here chat list data on pull to refresh
			this.setState({
				refreshingChatListData: true,
			});
			setTimeout(() => {
				this.setState({
					refreshingChatListData: false,
					hasMoreChatListEntries: true,
					chatListData: SAMPLE_CHAT_MESSAGES,
				});
			}, 1500);
		};

		private loadMoreChatEntriesHandler = () => {
			// TODO: update here chat list data, load more handler
			if (this.state.chatListData.length < TOTAL_NUMBER_OF_CHAT_ENTRIES) {
				if (!this.isLoadingNewChatEntries) {
					this.isLoadingNewChatEntries = true;
					setTimeout(() => {
						this.isLoadingNewChatEntries = false;
						this.setState({
							chatListData: [...this.state.chatListData, ...SAMPLE_CHAT_MESSAGES],
						});
					}, 1000); // just simulate network calls delay
				}
			} else {
				this.setState({hasMoreChatListEntries: false});
			}
		};
	};
};
