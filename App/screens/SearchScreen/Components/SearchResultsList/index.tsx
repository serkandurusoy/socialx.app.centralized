import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';

import {SearchResultEntry} from 'components';
import {SearchResultData} from 'types';
import style from './style';

interface IPaginatedList {
	hasMore: boolean;
}

interface ISearchResultsListProps extends IPaginatedList {
	searchResults: SearchResultData[];
	addFriendHandler: (value: string) => Promise<any>;
	onSearchResultSelect: (result: SearchResultData) => void;
	onLoadMore: () => void;
}

const LoadingFooter: React.SFC<IPaginatedList> = ({hasMore}) => {
	if (hasMore) {
		return (
			<View style={style.bottomLoadingContainer}>
				<ActivityIndicator size={'large'} />
			</View>
		);
	}
	return null;
};

const renderListItem = (
	searchResult: SearchResultData,
	addFriendHandler: (value: string) => Promise<any>,
	onSearchResultSelect: (result: SearchResultData) => void,
) => (
	<SearchResultEntry
		key={searchResult.id}
		{...searchResult}
		addFriendHandler={() => addFriendHandler(searchResult.id)}
		onEntrySelect={() => onSearchResultSelect(searchResult)}
	/>
);

// const keyExtractor = (item: SearchResultData, index: number) => item.id; // TODO: enable later!
const keyExtractor = (item: SearchResultData, index: number) => index.toString();

export const SearchResultsList: React.SFC<ISearchResultsListProps> = ({
	searchResults,
	addFriendHandler,
	onSearchResultSelect,
	onLoadMore,
	hasMore,
}) => (
	<FlatList
		data={searchResults}
		renderItem={({item}) => renderListItem(item, addFriendHandler, onSearchResultSelect)}
		style={style.resultsContainer}
		keyboardShouldPersistTaps={'handled'}
		keyExtractor={keyExtractor}
		onEndReachedThreshold={0.5}
		alwaysBounceVertical={false}
		onEndReached={onLoadMore}
		ListFooterComponent={<LoadingFooter hasMore={hasMore} />}
	/>
);
