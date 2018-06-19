import React from 'react';
import {Dimensions, View} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {connect} from 'react-redux';

import {IAppUIStateProps, SearchResultData} from 'types';
import {SearchResults, TrendingSearches} from './Components';
import {SearchFilterValues} from './index';
import style from './style';

interface ISearchScreenComponentProps extends IAppUIStateProps {
	searchTerm: string;
	searchResults: SearchResultData[];
	selectedFilter: SearchFilterValues;
	setNewFilter: (value: SearchFilterValues) => void;
	createGroupHandler: () => void;
	addFriendHandler: (value: string) => Promise<any>;
	onSearchResultSelect: (result: SearchResultData) => void;
	trendingVisible: boolean;
	searching: boolean;
}

const getContainerStyles = (trendingVisible: boolean) => {
	const containerStyles: any[] = [style.container];
	if (!trendingVisible) {
		const screenWidth = Dimensions.get('window').width;
		containerStyles.push({transform: [{translateX: -screenWidth}]});
	}
	return containerStyles;
};

const SearchScreenComponent: React.SFC<ISearchScreenComponentProps> = (props) => (
	<View style={{flex: 1}}>
		<View style={getContainerStyles(props.trendingVisible)}>
			<TrendingSearches />
			<SearchResults
				searchResults={props.searchResults}
				selectedFilter={props.selectedFilter}
				setNewFilter={props.setNewFilter}
				searching={props.searching}
				addFriendHandler={props.addFriendHandler}
				onSearchResultSelect={props.onSearchResultSelect}
			/>
		</View>
		<KeyboardSpacer style={{width: '100%'}} topSpacing={-props.tabBarBottomHeight} />
	</View>
);

const mapStateToProps: any = (state: any): IAppUIStateProps => ({
	...state.appUI,
});

export default connect<any>(mapStateToProps)(SearchScreenComponent);
