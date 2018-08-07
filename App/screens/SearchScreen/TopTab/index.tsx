import React from 'react';
import {Text, View} from 'react-native';

import {SearchResultsSection} from '../Components';
import styles from './style';

import {MOCK_SUGGESTED, MOCK_RECENT} from 'utilities';

interface ITopTabProps {
	items: object[];
}

export const TopTab: React.SFC<ITopTabProps> = (props) => (
	<View>
		<SearchResultsSection title="Suggested" items={MOCK_SUGGESTED} />
		<SearchResultsSection title="Recent" items={MOCK_RECENT} />
	</View>
);
