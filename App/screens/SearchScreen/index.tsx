import debounce from 'lodash/debounce';
import React, {Component} from 'react';
import {InteractionManager, Keyboard} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import {addFriendHoc, searchUsersHoc} from 'backend/graphql';
import {ipfsConfig as base} from 'configuration';
import {AvatarImagePlaceholder} from 'consts';
import {SearchResultData, SearchResultKind, SearchResultPeople} from 'types';
import {SearchHeader} from './Components';
import SearchScreenComponent from './screen';

const SEARCH_DEBOUNCE_TIME_MS = 300;

export enum SearchFilterValues {
	Top = 'top',
	People = 'people',
	Tags = 'tags',
	Places = 'places',
}

interface ISearchScreenProps {
	navigation: NavigationScreenProp<any>;
	search: any;
	addFriend: any;
}

interface ISearchScreenState {
	searchTerm: string;
	searchResults: SearchResultData[];
	selectedFilter: SearchFilterValues;
	trendingVisible: boolean;
	searching: boolean;
	loadingTrends: boolean;
	trendingResults: SearchResultData[];
}

class SearchScreen extends Component<ISearchScreenProps, ISearchScreenState> {
	private static navigationOptions = (props: ISearchScreenProps) => ({
		header: () => {
			const params = props.navigation.state.params || {};
			// TODO: any other options here not to use 'navigation.state.params'?
			return (
				<SearchHeader
					backVisible={params.backVisible}
					searchInputUpdated={params.searchInputUpdatedHandler}
					onBack={params.backHandler}
					onFocusUpdated={params.onSearchFocusUpdatedHandler}
					searchValue={params.searchValue}
				/>
			);
		},
	});

	public state = {
		searchTerm: '',
		searchResults: [],
		selectedFilter: SearchFilterValues.Top,
		trendingVisible: true,
		searching: false,
		loadingTrends: false,
		trendingResults: [],
	};

	private debounceSearch = debounce(async (term: string) => {
		this.setState({
			searchResults: await this.doSearch(term),
		});
	}, SEARCH_DEBOUNCE_TIME_MS);

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({
				backVisible: false,
				searchInputUpdatedHandler: this.updateSearchTerm,
				backHandler: this.setTrendingVisible,
				onSearchFocusUpdatedHandler: this.onSearchFocusUpdatedHandler,
				searchValue: '',
			});
			this.loadTrendingSearchResults();
		});
	}

	public render() {
		return (
			<SearchScreenComponent
				addFriendHandler={this.addFriendHandler}
				searchResults={this.state.searchResults}
				selectedFilter={this.state.selectedFilter}
				setNewFilter={this.updateSelectedFilter}
				onSearchResultSelect={this.onSearchResultSelectHandler}
				trendingVisible={this.state.trendingVisible}
				searching={this.state.searching}
				loadingTrends={this.state.loadingTrends}
				trendingResults={this.state.trendingResults}
			/>
		);
	}

	// todo @serkan @jake let's discuss this
	private doSearch = async (query: string) => {
		const {search} = this.props;
		const results: SearchResultPeople[] = [];
		if (query.length < 2) {
			return results;
		}
		try {
			this.setState({
				searching: true,
			});

			let resp = await search({variables: {query}});
			resp = resp.data.searchUsers;

			this.setState({
				searching: false,
			});

			if (resp.length === 0) {
				return results;
			}
			return resp.map(({connection, user: current}) => ({
				id: current.userId,
				kind: connection,
				fullName: current.name,
				username: current.username,
				avatarURL: current.avatar ? base.ipfs_URL + current.avatar.hash : AvatarImagePlaceholder,
			}));
		} catch (ex) {
			console.log('Search error', ex);
			this.setState({
				searching: false,
			});
			return results;
		}
	};

	private updateSearchTerm = async (term: string) => {
		this.setState({
			searchTerm: term,
		});
		this.props.navigation.setParams({
			searchValue: term,
		});
		this.debounceSearch(term);
	};

	private updateSelectedFilter = async (value: SearchFilterValues) => {
		this.setState({
			selectedFilter: value,
			searchResults: await this.doSearch(this.state.searchTerm),
		});
	};

	private addFriendHandler = async (friendId: string) => {
		const {addFriend} = this.props;

		await addFriend({
			variables: {
				user: friendId,
			},
		});
	};

	private onSearchResultSelectHandler = (result: SearchResultData) => {
		if (
			result.kind === SearchResultKind.Friend ||
			result.kind === SearchResultKind.NotFriend ||
			result.kind === SearchResultKind.FriendRequestSent
		) {
			this.props.navigation.navigate('UserProfileScreen', {userId: result.id});
		}
	};

	private setTrendingVisible = () => {
		this.toggleBackVisibleAndResetSearch(false);
		this.setState({
			trendingVisible: true,
			searchResults: [],
		});
		Keyboard.dismiss();
	};

	private toggleBackVisibleAndResetSearch = (visible: boolean) => {
		this.props.navigation.setParams({
			backVisible: visible,
			searchValue: '',
		});
	};

	private onSearchFocusUpdatedHandler = (value: boolean) => {
		if (value && this.state.trendingVisible) {
			this.loadTopSearchResults();
			this.toggleBackVisibleAndResetSearch(true);
		}
	};

	private loadTopSearchResults = async () => {
		this.setState({
			searching: true,
			searchResults: [],
			trendingVisible: false,
		});
		// TODO: @Jake: update query here
		const searchResults = await this.doSearch('ma');
		this.setState({
			searching: false,
			searchResults,
		});
	};

	private loadTrendingSearchResults = async () => {
		this.setState({
			loadingTrends: true,
		});
		// TODO: @Jake: update query here
		const trendingResults = await this.doSearch('ma');
		this.setState({
			loadingTrends: false,
			trendingResults,
		});
	};
}

const searchUsersWrapper = searchUsersHoc(SearchScreen);
const addFriendWrapper = addFriendHoc(searchUsersWrapper);

export default addFriendWrapper;
