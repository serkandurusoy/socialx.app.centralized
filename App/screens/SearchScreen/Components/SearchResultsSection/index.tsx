import React from 'react';
import {Text, View} from 'react-native';

import styles from './style';

interface ISearchResultsSectionProps {
	items: object[];
	title: string;
}

export const SearchResultsSection: React.SFC<ISearchResultsSectionProps> = ({title, items}) => {
	if (items && items.length > 0) {
		const rows = items.map((item: any) => {
			return (
				<View>
					<Text>{item.name}</Text>
				</View>
			);
		});

		return (
			<View>
				<Text>{title}</Text>
				{rows}
			</View>
		);
	}
};
