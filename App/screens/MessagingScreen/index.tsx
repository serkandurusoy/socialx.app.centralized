import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';
import {DUMMY_CONTACTS_LIST} from '../../../storybook/stories/ContactsList.stories';
import {IContactListItem} from '../../components/ContactsList';
import {MessagingFilterValues} from '../../components/MessagingFilterSection';
import MessagingComponent from './screen';

export enum MessagingTabValues {
	Chat = 'Chat',
	Contacts = 'Contacts',
}

export interface IChatListEntry {
	avatarURL: string;
	fullName: string;
	message: string;
	time: Date;
}

interface IMessagingScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface IMessagingScreenState {
	searchTerm: string;
	selectedTab: MessagingTabValues;
	chatListData: IChatListEntry[];
	refreshing: boolean;
	hasMore: boolean;
	contactsList: IContactListItem[];
}

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

export default class MessagingScreen extends Component<IMessagingScreenProps, IMessagingScreenState> {
	private static navigationOptions = {
		title: 'MESSAGING',
	};

	public state = {
		chatListData: [],
		searchTerm: '',
		selectedTab: MessagingTabValues.Chat,
		refreshing: false,
		hasMore: true,
		contactsList: DUMMY_CONTACTS_LIST,
	};

	private isLoading = false;

	public render() {
		return (
			<MessagingComponent
				chatListData={this.state.chatListData}
				selectedTab={this.state.selectedTab}
				setNewTab={this.updateSelectedTab}
				refreshing={this.state.refreshing}
				refreshData={this.refreshDataHandler}
				loadMoreChatEntries={this.loadMoreChatEntriesHandler}
				hasMore={this.state.hasMore}
				searchTermUpdated={this.searchTermUpdatedHandler}
				filterUpdatedHandler={this.filterUpdatedHandler}
				onContactSelect={this.onContactSelectHandler}
				contactsList={this.state.contactsList}
			/>
		);
	}

	private updateSelectedTab = (value: MessagingTabValues) => {
		this.setState({
			selectedTab: value,
		});
	}

	private searchTermUpdatedHandler = (term: string) => {
		const hasSearchResults = term.length > 2 && term.length < 8; // just a dummy condition here
		this.setState({
			searchTerm: term,
			chatListData: hasSearchResults ? FILTERED_CHAT_MESSAGES : SAMPLE_CHAT_MESSAGES,
		});
	}

	private refreshDataHandler = () => {
		this.setState({
			refreshing: true,
		});
		setTimeout(() => {
			this.setState({
				refreshing: false,
				hasMore: true,
				chatListData: SAMPLE_CHAT_MESSAGES,
			});
		}, 1500);
	}

	private loadMoreChatEntriesHandler = () => {
		if (this.state.chatListData.length < TOTAL_NUMBER_OF_CHAT_ENTRIES) {
			if (!this.isLoading) {
				this.isLoading = true;
				setTimeout(() => {
					this.isLoading = false;
					this.setState({
						chatListData: this.state.chatListData.concat(SAMPLE_CHAT_MESSAGES),
					});
				}, 1000); // just simulate network calls delay
			}
		} else {
			this.setState({hasMore: false});
		}
	}

	private filterUpdatedHandler = (filterValue: MessagingFilterValues) => {
		alert(filterValue);
	}

	private onContactSelectHandler(data: IContactListItem) {
		alert('Selected contact ' + data.name);
		// TODO: here we should filter contacts and update  this.state.contactsList
	}
}
