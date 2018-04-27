import React, {Component} from 'react';
import {Image, ImagePropertiesSourceOptions, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {Icons} from 'theme/';
import {IProfileAnalyticsItem} from './AnalyticItem';
import ProfileAnalyticsScreenComponent from './screen';

const PROFILE_ANALYTICS_DATA: IProfileAnalyticsItem[] = [
	{
		title: 'Total profile views',
		icon: Icons.analyticsTotalProfileViews,
		value: 3478,
	},
	{
		title: 'Total rewards earnings',
		icon: Icons.analyticsTotalRewardEarnings,
		value: 8239,
		unit: 'SOCX',
		moreDetails: {
			label: 'See Reward Details',
			destinationScreen: 'RewardsScreen',
		},
	},
	{
		title: 'Friends Count',
		icon: Icons.analyticsFriendsCount,
		value: 153,
	},
	{
		title: 'Photos',
		icon: Icons.analyticsPhotos,
		value: 298,
	},
	{
		title: 'Videos',
		icon: Icons.analyticsVideos,
		value: 13,
	},
	{
		title: 'Comments',
		icon: Icons.analyticsComments,
		value: 564,
	},
];

export interface IProfileAnalyticsScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class ProfileAnalyticsScreen extends Component<IProfileAnalyticsScreenProps, any> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'PROFILE ANALYTICS',
		headerRight: <View />,
	};

	public render() {
		return (
			<ProfileAnalyticsScreenComponent analyticsData={PROFILE_ANALYTICS_DATA} navigation={this.props.navigation} />
		);
	}
}
