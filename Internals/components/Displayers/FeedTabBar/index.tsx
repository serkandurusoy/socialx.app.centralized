import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';

import {feedTabNavigationChanged} from 'backend/actions';
import {SearchFilterButton} from 'components';
import {INavigationState} from 'types';
import style from './style';

export enum FeedTabs {
	Friends = 'Friends',
	Global = 'Global',
}

interface ITabbedFeedProps extends INavigationState {
	navigation: NavigationScreenProp<any>;
	feedTabNavigationAction: (value: string) => void;
}

const FeedTabBarComp: React.SFC<ITabbedFeedProps> = ({feedTabActive, feedTabNavigationAction, navigation}) => (
	<View style={style.container}>
		<SearchFilterButton
			text={FeedTabs.Friends}
			selected={feedTabActive === FeedTabs.Friends}
			onPress={() => navigation.navigate(FeedTabs.Friends)}
			containerStyle={style.tabButton}
		/>
		<SearchFilterButton
			text={FeedTabs.Global}
			selected={feedTabActive === FeedTabs.Global}
			onPress={() => navigation.navigate(FeedTabs.Global)}
			containerStyle={style.tabButton}
		/>
	</View>
);

const mapStateToProps: any = ({customNav}): INavigationState => ({
	...customNav,
});

const mapDispatchToProps = (dispatch: any) => ({
	feedTabNavigationAction: (routeName: string) => dispatch(feedTabNavigationChanged(routeName)),
});

export const FeedTabBar = connect(
	mapStateToProps,
	mapDispatchToProps,
)(FeedTabBarComp);
