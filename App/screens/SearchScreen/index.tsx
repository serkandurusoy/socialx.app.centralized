import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';
import {SearchHeader} from '../../components/SearchHeader';
import SearchScreenComponent from './screen';

export enum SearchFilterValues {
	People = 'people',
	Groups = 'groups',
}

export enum SearchResultKind {
	Friend = 'friend',
	NotFriend = 'notFriend',
	Group = 'group',
}

const SEARCH_RESULTS_PEOPLE: SearchResultPeople[] = [
	{
		id: '0',
		kind: SearchResultKind.Friend,
		fullName: 'Ionut Movila',
		username: 'ionut.movila',
		avatarURL: 'https://placeimg.com/100/100/people',
	},
	{
		id: '1',
		kind: SearchResultKind.NotFriend,
		fullName: 'Teresa Lamb',
		username: 'terlamb',
		avatarURL: 'https://placeimg.com/101/101/people',
	},
	{
		id: '2',
		kind: SearchResultKind.Friend,
		fullName: 'Terosa McCarthy',
		username: 'terosaMcCarthy',
		avatarURL: 'https://placeimg.com/102/102/people',
	},
];

const SEARCH_RESULTS_GROUPS: SearchResultGroups[] = [
	{
		id: '3',
		kind: SearchResultKind.Group,
		fullName: 'Group name',
		username: 'afsfnaklsj.dfsaiog',
		avatarURL: 'https://placeimg.com/100/100/tech',
	},
	{
		id: '4',
		kind: SearchResultKind.Group,
		fullName: 'Timisoara JS meetup',
		username: 'timjs.meet',
		avatarURL: 'https://placeimg.com/101/101/tech',
	},
	{
		id: '5',
		kind: SearchResultKind.Group,
		fullName: 'AMG owners',
		username: 'amg.owners',
		avatarURL: 'https://placeimg.com/102/102/tech',
	},
];

export interface SearchResultPeople {
	id: string;
	kind: SearchResultKind;
	fullName: string;
	username: string;
	avatarURL?: string;
}

export interface SearchResultGroups {
	id: string;
	kind: SearchResultKind;
	fullName: string;
	username: string;
	avatarURL?: string;
}

interface ISearchScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface ISearchScreenState {
	searchTerm: string;
	searchResults: SearchResultPeople[] | SearchResultGroups[];
	selectedFilter: SearchFilterValues;
}

export default class SearchScreen extends Component<ISearchScreenProps, ISearchScreenState> {
	private static navigationOptions = (props: ISearchScreenProps) => ({
		header: () => {
			const params = props.navigation.state.params || {};
			return <SearchHeader searchInputUpdated={params.searchInputUpdatedHandler} />;
		},
	})

	public state = {
		searchTerm: '',
		searchResults: [],
		selectedFilter: SearchFilterValues.People,
	};

	public componentWillMount() {
		this.props.navigation.setParams({searchInputUpdatedHandler: this.updateSearchTerm});
	}

	public render() {
		return (
			<SearchScreenComponent
				addFriendHandler={this.addFriendHandler}
				searchTerm={this.state.searchTerm}
				searchResults={this.state.searchResults}
				selectedFilter={this.state.selectedFilter}
				setNewFilter={this.updateSelectedFilter}
				createGroupHandler={this.handleCreateNewGroup}
			/>
		);
	}

	private updateSearchTerm = (term: string) => {
		this.setState({
			searchTerm: term,
			searchResults: this.getSearchResults(term),
		});
	}

	private updateSelectedFilter = (value: SearchFilterValues) => {
		this.setState({
			selectedFilter: value,
			searchResults: this.getSearchResults(this.state.searchTerm, value),
		});
	}

	private getSearchResults = (term: string, filterValue: SearchFilterValues = this.state.selectedFilter) => {
		let ret: SearchResultPeople[] | SearchResultGroups[] = [];
		if (term.length > 3 && term.length < 8) {
			ret = filterValue === SearchFilterValues.People ? SEARCH_RESULTS_PEOPLE : SEARCH_RESULTS_GROUPS;
		}
		return ret;
	}

	private addFriendHandler = (friendId: string) => {
		alert('Add friend with ID ' + friendId);
	}

	private handleCreateNewGroup = () => {
		alert('handleCreateNewGroup');
	}
}
