import React from 'react';
import {ScrollView} from 'react-native';

import {SearchResultEntry} from 'components';
import {SearchResultData} from 'types';
import style from './style';

interface ISearchResultsListProps {
	searchResults: SearchResultData[];
	addFriendHandler: (value: string) => Promise<any>;
	onSearchResultSelect: (result: SearchResultData) => void;
}

export const SearchResultsList: React.SFC<ISearchResultsListProps> = ({
	searchResults,
	addFriendHandler,
	onSearchResultSelect,
}) => (
	<ScrollView style={style.resultsContainer} keyboardShouldPersistTaps={'handled'}>
		{searchResults.map((searchResult, i) => (
			<SearchResultEntry
				key={searchResult.id}
				{...searchResult}
				addFriendHandler={() => addFriendHandler(searchResult.id)}
				onEntrySelect={() => onSearchResultSelect(searchResult)}
			/>
		))}
	</ScrollView>
);
