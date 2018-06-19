import React from 'react';
import {Image, Text, View} from 'react-native';

import {Icons} from 'theme';
import style from './style';

export const TrendingSearches: React.SFC<any> = (props) => (
	// TODO: this should show trending searches when opened
	<View style={style.emptyContainer}>
		<Image source={Icons.searchTabStartSearch} resizeMode={'contain'} style={style.startSearchIcon} />
		<Text style={style.startSearchText}>{'Start searching now'}</Text>
	</View>
);
