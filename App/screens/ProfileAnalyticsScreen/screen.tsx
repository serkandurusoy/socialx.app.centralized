import React, {Component} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {AnalyticItem, IProfileAnalyticsItem} from './AnalyticItem';
import style from './style';

export interface IProfileAnalyticsScreenComponentProps {
	analyticsData: IProfileAnalyticsItem[];
	navigation: NavigationScreenProp<any>;
}

export default class ProfileAnalyticsScreenComponent extends Component<IProfileAnalyticsScreenComponentProps, any> {
	public render() {
		return (
			<ScrollView style={style.container} alwaysBounceVertical={false}>
				{this.props.analyticsData.map((analyticItem: IProfileAnalyticsItem, index: number) => (
					<AnalyticItem {...analyticItem} navigation={this.props.navigation} key={index} />
				))}
			</ScrollView>
		);
	}
}
