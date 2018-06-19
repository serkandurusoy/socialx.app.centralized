import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';

import {SpinnerTypes} from 'hoc';
import {Colors, Sizes} from 'theme';
import {SearchResultData} from 'types';
import {SearchResultsList} from '../SearchResultsList';
import style from './style';

interface ITrendingSearchesProps {
	searching: boolean;
	searchResults: SearchResultData[];
	addFriendHandler: (value: string) => Promise<any>;
	onSearchResultSelect: (result: SearchResultData) => void;
}

const TrendingLoader: React.SFC = () => (
	<View style={style.loadingContainer}>
		<Spinner
			isVisible={true}
			size={Sizes.smartHorizontalScale(45)}
			type={SpinnerTypes.NineCubeGrid}
			color={Colors.pink}
		/>
	</View>
);

export const TrendingSearches: React.SFC<ITrendingSearchesProps> = (props) => (
	<View style={style.container}>
		{props.searching && <TrendingLoader />}
		{!props.searching && props.searchResults.length > 0 && <SearchResultsList {...props} />}
	</View>
);
