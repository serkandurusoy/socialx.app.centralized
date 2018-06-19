import React from 'react';
import {View} from 'react-native';

import {SearchFilterButton} from 'components';
import {SearchFilterValues} from '../../index';
import style from './style';

interface ISearchFilterProps {
	selectedFilter: SearchFilterValues;
	setNewFilter: (value: SearchFilterValues) => void;
}

export const SearchFilter: React.SFC<ISearchFilterProps> = (props) => (
	<View style={style.filterButtonsContainer}>
		<SearchFilterButton
			text={'Top'}
			selected={props.selectedFilter === SearchFilterValues.Top}
			onPress={() => props.setNewFilter(SearchFilterValues.Top)}
			containerStyle={style.searchButton}
		/>
		<SearchFilterButton
			text={'People'}
			selected={props.selectedFilter === SearchFilterValues.People}
			onPress={() => props.setNewFilter(SearchFilterValues.People)}
			containerStyle={style.searchButton}
		/>
		<SearchFilterButton
			text={'Tags'}
			selected={props.selectedFilter === SearchFilterValues.Tags}
			onPress={() => props.setNewFilter(SearchFilterValues.Tags)}
			containerStyle={style.searchButton}
		/>
		<SearchFilterButton
			text={'Places'}
			selected={props.selectedFilter === SearchFilterValues.Places}
			onPress={() => props.setNewFilter(SearchFilterValues.Places)}
			containerStyle={style.searchButton}
		/>
	</View>
);
