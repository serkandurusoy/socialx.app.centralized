import React from 'react';
import {ScrollView} from 'react-native';

import {SearchResultEntry} from 'components';
import {SearchResultData} from 'types';
import style from './style';

interface ISearchResultsListProps {
	searching: boolean;
	searchResults: SearchResultData[];
	addFriendHandler: (value: string) => Promise<any>;
	onSearchResultSelect: (result: SearchResultData) => void;
}

export const SearchResultsList: React.SFC<ISearchResultsListProps> = (props) => (
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
);
