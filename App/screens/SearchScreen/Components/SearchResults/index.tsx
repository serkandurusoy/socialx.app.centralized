import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import {SearchResultEntry} from 'components';
import {SearchResultData} from 'types';
import {SearchFilterValues} from '../../index';
import {SearchFilter} from '../SearchFilter';
import style from './style';

interface ISearchResultsProps {
	selectedFilter: SearchFilterValues;
	setNewFilter: (value: SearchFilterValues) => void;
	searchResults: SearchResultData[];
	searching: boolean;
	addFriendHandler: (value: string) => Promise<any>;
	onSearchResultSelect: (result: SearchResultData) => void;
}

export const SearchResults: React.SFC<ISearchResultsProps> = (props) => (
	<View style={style.container}>
		<SearchFilter selectedFilter={props.selectedFilter} setNewFilter={props.setNewFilter} />
		{props.searching && <Text style={style.shortMessage}>{'Loading search results'}</Text>}
		{!props.searching &&
			props.searchResults.length === 0 && <Text style={style.shortMessage}>{'No Results Found!'}</Text>}
		{!props.searching &&
			props.searchResults.length > 0 && (
				<ScrollView style={style.resultsContainer} keyboardShouldPersistTaps={'handled'}>
					{props.searchResults.map((searchResult, i) => (
						<SearchResultEntry
							key={i}
							{...searchResult}
							addFriendHandler={() => props.addFriendHandler(searchResult.id)}
							onEntrySelect={() => props.onSearchResultSelect(searchResult)}
						/>
					))}
				</ScrollView>
			)}
	</View>
);
