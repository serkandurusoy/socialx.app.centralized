import React, {SFC} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {AnalyticItem, IProfileAnalyticsItem} from './AnalyticItem';
import style from './style';

export interface IProfileAnalyticsScreenComponentProps {
	analyticsData: IProfileAnalyticsItem[];
	navigation: NavigationScreenProp<any>;
}

const ProfileAnalyticsScreenComponent: SFC<IProfileAnalyticsScreenComponentProps> = (
	props: IProfileAnalyticsScreenComponentProps,
) => (
	<ScrollView style={style.container} alwaysBounceVertical={false}>
		{props.analyticsData.map((analyticItem: IProfileAnalyticsItem, index: number) => (
			<AnalyticItem {...analyticItem} navigation={props.navigation} key={index} />
		))}
	</ScrollView>
);

export default ProfileAnalyticsScreenComponent;
