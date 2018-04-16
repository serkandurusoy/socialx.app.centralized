import React, {Component} from 'react';
import {Image, Keyboard, Platform, Text, TouchableOpacity, View} from 'react-native';
import {SearchFilterButton, SearchResultEntry} from '../../components';
import {OS_TYPES} from '../../constants';
import {IWithResizeOnKeyboardShowProps, withResizeOnKeyboardShow} from '../../hoc/ResizeOnKeyboardShow';
import {Icons, Metrics} from '../../theme/';
import {SearchFilterValues, SearchResultGroups, SearchResultPeople} from './index';
import style from './style';

interface ISearchScreenComponentProps extends IWithResizeOnKeyboardShowProps {
	searchTerm: string;
	searchResults: SearchResultPeople[] | SearchResultGroups[];
	selectedFilter: SearchFilterValues;
	setNewFilter: (value: SearchFilterValues) => void;
	addFriendHandler: (value: string) => void;
	createGroupHandler: () => void;
}

class SearchScreenComponent extends Component<ISearchScreenComponentProps> {
	public render() {
		const containerStyles = [style.container];
		if (Platform.OS === OS_TYPES.iOS) {
			const marginBottom = this.props.marginBottom > 0 ? this.props.marginBottom - Metrics.tabBarBottomHeight : 0;
			containerStyles.push({marginBottom});
		}
		return <View style={containerStyles}>{this.conditionalRender()}</View>;
	}

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
	}

	private renderEmptyState = () => {
		return (
			<View style={style.emptyContainer}>
				<Image source={Icons.searchTabStartSearch} resizeMode={'contain'} style={style.startSearchIcon} />
				<Text style={style.startSearchText}>{'Start searching now'}</Text>
			</View>
		);
	}

	private renderNoResults = () => {
		return (
			<View style={style.noResultsContainer}>
				{this.renderFilterButtons()}
				{this.renderPeopleNoResults()}
				{this.renderCreateNewGroup()}
			</View>
		);
	}

	private renderPeopleNoResults = () => {
		if (this.props.selectedFilter === SearchFilterValues.People) {
			return (
				<View style={style.noResultsCenterAlign}>
					<Text>{'No results found!'}</Text>
				</View>
			);
		}
		return null;
	}

	private renderSearchResults = () => {
		return (
			<View style={style.resultsContainer}>
				{this.renderFilterButtons()}
				{this.renderPeopleResults()}
				{this.renderCreateNewGroup()}
			</View>
		);
	}

	private renderPeopleResults = () => {
		const ret = [];
		for (let i = 0; i < this.props.searchResults.length; i++) {
			const searchResult = this.props.searchResults[i];
			ret.push(
				<SearchResultEntry
					key={i}
					{...searchResult}
					addFriendHandler={() => this.props.addFriendHandler(searchResult.id)}
				/>,
			);
		}
		return ret;
	}

	private renderFilterButtons = () => {
		return (
			<View style={style.filterButtonsContainer}>
				<SearchFilterButton
					text={'People'}
					selected={this.props.selectedFilter === SearchFilterValues.People}
					onPress={() => this.props.setNewFilter(SearchFilterValues.People)}
				/>
				{/*<SearchFilterButton*/}
				{/*text={'Groups'}*/}
				{/*selected={this.props.selectedFilter === SearchFilterValues.Groups}*/}
				{/*onPress={() => this.props.setNewFilter(SearchFilterValues.Groups)}*/}
				{/*/>*/}
			</View>
		);
	}

	private renderCreateNewGroup = () => {
		if (this.props.selectedFilter === SearchFilterValues.Groups) {
			return (
				<View style={style.createGroupContainer}>
					<Image source={Icons.searchTabCreateGroup} resizeMode={'contain'} style={style.createGroupIcon} />
					<TouchableOpacity onPress={this.props.createGroupHandler}>
						<Text style={style.createGroupText}>{'Create a group'}</Text>
					</TouchableOpacity>
				</View>
			);
		}
		return null;
	}
}

export default withResizeOnKeyboardShow(SearchScreenComponent);
