import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';
import MessagingComponent from './screen';

export enum MessagingFilterValues {
	Chat = 'chat',
	Contacts = 'contacts',
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
	selectedFilter: MessagingFilterValues;
	chatListData: IChatListEntry[];
	refreshing: boolean;
	hasMore: boolean;
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
		selectedFilter: MessagingFilterValues.Chat,
		refreshing: false,
		hasMore: true,
	};

	private isLoading = false;

	public render() {
		return (
			<MessagingComponent
				chatListData={this.state.chatListData}
				selectedFilter={this.state.selectedFilter}
				setNewFilter={this.updateSelectedFilter}
				refreshing={this.state.refreshing}
				refreshData={this.refreshDataHandler}
				loadMoreChatEntries={this.loadMoreChatEntriesHanlder}
				hasMore={this.state.hasMore}
				searchTermUpdated={this.searchTermUpdatedHandler}
			/>
		);
	}

	private updateSelectedFilter = (value: MessagingFilterValues) => {
		this.setState({
			selectedFilter: value,
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

	private loadMoreChatEntriesHanlder = () => {
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
}
