import React from 'react';
import {Dimensions, View} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {connect} from 'react-redux';

import {IAppUIStateProps, SearchResultData} from 'types';
import {SearchFilterValues, SearchResults, TrendingSearches} from './Components';
import style from './style';

interface ISearchScreenComponentProps extends IAppUIStateProps {
	addFriendHandler: (value: string) => Promise<any>;
	searchResults: SearchResultData[];
	selectedFilter: SearchFilterValues;
	setNewFilter: (value: SearchFilterValues) => void;
	onSearchResultSelect: (result: SearchResultData) => void;
	trendingVisible: boolean;
	searching: boolean;
	trendingResults: SearchResultData[];
	loadingTrends: boolean;
	onLoadMoreResults: () => void;
	hasMoreResults: boolean;
	onLoadMoreTrends: () => void;
	hasMoreTrends: boolean;
}

const SearchScreenComponent: React.SFC<ISearchScreenComponentProps> = ({
	addFriendHandler,
	searchResults,
	selectedFilter,
	setNewFilter,
	onSearchResultSelect,
	trendingVisible,
	searching,
	trendingResults,
	loadingTrends,
	tabBarBottomHeight,
	onLoadMoreResults,
	hasMoreResults,
	onLoadMoreTrends,
	hasMoreTrends,
}) => (
	<View style={{flex: 1}}>
		<View
			style={[style.container, !trendingVisible ? {transform: [{translateX: -Dimensions.get('window').width}]} : {}]}
		>
			<TrendingSearches
				searchResults={trendingResults}
				searching={loadingTrends}
				addFriendHandler={addFriendHandler}
				onSearchResultSelect={onSearchResultSelect}
				hasMore={hasMoreTrends}
				onLoadMore={onLoadMoreTrends}
			/>
			<SearchResults
				searchResults={searchResults}
				selectedFilter={selectedFilter}
				setNewFilter={setNewFilter}
				searching={searching}
				addFriendHandler={addFriendHandler}
				onSearchResultSelect={onSearchResultSelect}
				hasMore={hasMoreResults}
				onLoadMore={onLoadMoreResults}
			/>
		</View>
		<KeyboardSpacer style={{width: '100%'}} topSpacing={-tabBarBottomHeight} />
	</View>
);

const mapStateToProps: any = (state: any): IAppUIStateProps => ({
	...state.appUI,
});

export default connect<any>(mapStateToProps)(SearchScreenComponent);
