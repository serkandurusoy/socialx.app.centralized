import React from 'react';
import {Text, View} from 'react-native';
import Spinner from 'react-native-spinkit';
import Icon from 'react-native-vector-icons/Ionicons';

import {SpinnerTypes} from 'hoc';
import {Colors, Sizes} from 'theme';
import {SearchResultData} from 'types';
import {SearchFilter, SearchFilterValues} from '../SearchFilter';
import {SearchResultsList} from '../SearchResultsList';
import style from './style';

interface ISearchResultsProps {
	selectedFilter: SearchFilterValues;
	setNewFilter: (value: SearchFilterValues) => void;
	searching: boolean;
	searchResults: SearchResultData[];
	addFriendHandler: (value: string) => Promise<any>;
	onSearchResultSelect: (result: SearchResultData) => void;
	onLoadMore: () => void;
	hasMore: boolean;
}

const SearchingLoader: React.SFC = () => (
	<View style={[style.loadingContainer, style.messageContainer]}>
		<View style={style.leftLoading}>
			<Icon name={'md-search'} style={style.searchIcon} />
			<Text style={style.shortMessage}>{'Loading search results..'}</Text>
		</View>
		<Spinner
			isVisible={true}
			size={Sizes.smartHorizontalScale(25)}
			type={SpinnerTypes.NineCubeGrid}
			color={Colors.pink}
		/>
	</View>
);

const SearchNoResults: React.SFC = () => (
	<View style={style.messageContainer}>
		<Text style={style.shortMessage}>{'No Results Found!'}</Text>
	</View>
);

export const SearchResults: React.SFC<ISearchResultsProps> = ({
	selectedFilter,
	setNewFilter,
	searching,
	searchResults,
	addFriendHandler,
	onSearchResultSelect,
	onLoadMore,
	hasMore,
}) => (
	<View style={style.container}>
		<SearchFilter selectedFilter={selectedFilter} setNewFilter={setNewFilter} />
		{searching && <SearchingLoader />}
		{!searching && searchResults.length === 0 && <SearchNoResults />}
		{!searching &&
			searchResults.length > 0 && (
				<SearchResultsList
					searchResults={searchResults}
					addFriendHandler={addFriendHandler}
					onSearchResultSelect={onSearchResultSelect}
					onLoadMore={onLoadMore}
					hasMore={hasMore}
				/>
			)}
	</View>
);
