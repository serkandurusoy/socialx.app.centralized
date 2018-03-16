import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';
import MessagingComponent from './screen';
import {SearchFilterValues} from '../SearchScreen';

const USER_MESSAGE = [
	{
		avatarURL: 'https://placeimg.com/120/120/people',
		userName: 'Tom Thompson',
		message: 'What are tou doing?',
		time: new Date(),
	}, {
		avatarURL: 'https://placeimg.com/120/120/people',
		userName: 'Gridan Gabriel',
		message: 'No no no no?',
		time: new Date(),
	}, {
		avatarURL: 'https://placeimg.com/120/120/people',
		userName: 'Ionut Movila',
		message: 'Da da dadadada?',
		time: new Date(),
	}, {
		avatarURL: 'https://placeimg.com/120/120/people',
		userName: 'Marius Marius',
		message: 'What are tou doing?',
		time: new Date(),
	}, {
		avatarURL: 'https://placeimg.com/120/120/people',
		userName: 'Crestin Crestin',
		message: 'What are tou doing?',
		time: new Date(),
	}, {
		avatarURL: 'https://placeimg.com/120/120/people',
		message: 'Ionut Movila',
		lastMessage: 'What are tou doing?',
		time: new Date(),
	}, {
		avatarURL: 'https://placeimg.com/120/120/people',
		userName: 'Ionut Movila',
		message: 'What are tou doing?',
		time: new Date(),
	},
];


interface ISearchScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface ISearchScreenState {
	searchTerm: string;
	selectedFilter: SearchFilterValues;
}

export default class MessagingScreen extends Component<ISearchScreenProps, ISearchScreenState> {
	private static navigationOptions = (props: ISearchScreenProps) => ({
		title: 'MESSAGING',
	})

	public state = {
		searchTerm: '',
		searchResults: [],
		selectedFilter: SearchFilterValues.People,
	};
	private updateSelectedFilter = (value: SearchFilterValues) => {
		this.setState({
			selectedFilter: value,
			searchResults: this.getSearchResults(this.state.searchTerm, value),
		});
	}

	public render() {
		return (
			<MessagingComponent
				messageList={USER_MESSAGE}
				modeState={'chat'}
				selectedFilter={this.state.selectedFilter}
				setNewFilter={this.updateSelectedFilter}
			/>
		);
	}
}
