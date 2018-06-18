import {SearchFilterButton, SearchResultEntry} from 'components';
import React, {Component} from 'react';
import {Keyboard, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {IAppUIStateProps, SearchResultData} from 'types';
import {SearchFilterValues} from './index';
import style from './style';

interface ISearchScreenComponentProps extends IAppUIStateProps {
	searchTerm: string;
	searchResults: SearchResultData[];
	selectedFilter: SearchFilterValues;
	setNewFilter: (value: SearchFilterValues) => void;
	addFriendHandler: (value: string) => void;
	createGroupHandler: () => void;
	onSearchResultSelect: (result: SearchResultData) => void;
}

interface ISearchScreenComponentState {
	paddingBottom: number;
}

class SearchScreenComponent extends Component<ISearchScreenComponentProps, ISearchScreenComponentState> {
	public state = {
		paddingBottom: 0,
	};

	private keyboardDidShowListener: any;
	private keyboardDidHideListener: any;

	public componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

	public componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	public render() {
		return <View style={[style.container, {marginBottom: this.state.paddingBottom}]}>{this.conditionalRender()}</View>;
	}

	private keyboardDidShow = (event: any) => {
		this.setState({
			paddingBottom: event.endCoordinates.height - this.props.tabBarBottomHeight,
		});
	};

	private keyboardDidHide = () => {
		this.setState({
			paddingBottom: 0,
		});
	};

	private conditionalRender = () => {
		let ret = null;
		if (this.props.searchTerm === '') {
			ret = this.renderEmptyState();
		} else {
			if (this.props.searchResults.length === 0) {
				ret = this.renderNoResults();
			} else {
				ret = this.renderSearchResults();
			}
		}
		return ret;
	};

	private renderEmptyState = () => {
		return (
			<View style={style.emptyContainer}>
				<Text style={style.startSearchText}>{'Render default top results'}</Text>
			</View>
		);
	};

	private renderNoResults = () => {
		return <View style={style.noResultsContainer}>{this.renderPeopleNoResults()}</View>;
	};

	private renderPeopleNoResults = () => {
		if (this.props.selectedFilter === SearchFilterValues.People) {
			return (
				<View style={style.noResultsCenterAlign}>
					<Text>{'No results found!'}</Text>
				</View>
			);
		}
		return null;
	};

	private renderSearchResults = () => {
		return <View style={style.resultsContainer}>{this.renderPeopleResults()}</View>;
	};

	private renderPeopleResults = () =>
		this.props.searchResults.map((searchResult, i) => (
			<SearchResultEntry
				key={i}
				{...searchResult}
				addFriendHandler={() => this.props.addFriendHandler(searchResult.id)}
				onEntrySelect={() => this.props.onSearchResultSelect(searchResult)}
			/>
		));

	private renderFilterButtons = () => {
		return (
			<View style={style.filterButtonsContainer}>
				<SearchFilterButton
					text={'Top'}
					selected={this.props.selectedFilter === SearchFilterValues.Top}
					onPress={() => this.props.setNewFilter(SearchFilterValues.Top)}
				/>
				<SearchFilterButton
					text={'People'}
					selected={this.props.selectedFilter === SearchFilterValues.People}
					onPress={() => this.props.setNewFilter(SearchFilterValues.People)}
				/>
				<SearchFilterButton
					text={'Tags'}
					selected={this.props.selectedFilter === SearchFilterValues.Tags}
					onPress={() => this.props.setNewFilter(SearchFilterValues.Tags)}
				/>
				<SearchFilterButton
					text={'Places'}
					selected={this.props.selectedFilter === SearchFilterValues.Places}
					onPress={() => this.props.setNewFilter(SearchFilterValues.Places)}
				/>
			</View>
		);
	};
}

const mapStateToProps: any = (state: any): IAppUIStateProps => ({
	...state.appUI,
});

export default connect<any>(mapStateToProps)(SearchScreenComponent);
