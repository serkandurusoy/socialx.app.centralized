import React from 'react';
import {View} from 'react-native';

import {SearchFilterButton} from 'components';
import style from './style';

export enum SearchFilterValues {
	Top = 'top',
	People = 'people',
	Tags = 'tags',
	Places = 'places',
}

interface ISearchFilterProps {
	selectedFilter: SearchFilterValues;
	setNewFilter: (value: SearchFilterValues) => void;
}

const FILTER_BUTTONS = [
	{
		text: 'Top',
		value: SearchFilterValues.Top,
	},
	{
		text: 'People',
		value: SearchFilterValues.People,
	},
	{
		text: 'Tags',
		value: SearchFilterValues.Tags,
	},
	{
		text: 'Places',
		value: SearchFilterValues.Places,
	},
];

export const SearchFilter: React.SFC<ISearchFilterProps> = ({selectedFilter, setNewFilter}) => (
	<View style={style.filterButtonsContainer}>
		{FILTER_BUTTONS.map((fButton) => (
			<SearchFilterButton
				key={fButton.value}
				text={fButton.text}
				selected={selectedFilter === fButton.value}
				onPress={() => setNewFilter(fButton.value)}
				containerStyle={style.searchButton}
			/>
		))}
	</View>
);
