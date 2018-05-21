import React from 'react';
import {ScrollView, View} from 'react-native';
import {
	NavigationAction,
	NavigationActions,
	NavigationContainer,
	NavigationNavigateAction,
	NavigationScreenProp,
	NavigationState,
	TabNavigator,
} from 'react-navigation';

import {ScreenHeaderButton, SearchFilterButton} from 'components';
import {Icons} from 'theme';
import FriendsFeed from '../friendsUserFeed';
import GlobalFeed from '../globalUserFeed';
import style from './style';

enum FeedTabs {
	Friends = 'Friends',
	Global = 'Global',
}

const tabsRouteConfig: any = {};
tabsRouteConfig[FeedTabs.Friends] = FriendsFeed;
tabsRouteConfig[FeedTabs.Global] = GlobalFeed;

const FeedTabScreens = TabNavigator(tabsRouteConfig, {
	animationEnabled: true,
	swipeEnabled: true,
	lazy: true,
	navigationOptions: {
		tabBarVisible: false,
		header: null,
	},
});

interface ITabbedFeedProps {
	navigation: NavigationScreenProp<any>;
}

interface ITabbedFeedState {
	selectedTab: FeedTabs;
}

export default class TabbedFeed extends React.Component<ITabbedFeedProps, ITabbedFeedState> {
	private static navigationOptions = (props: any) => {
		return {
			title: 'FEED',
			// headerRight: (
			// 	<ScreenHeaderButton
			// 		onPress={() => props.navigation.navigate('MessagingScreen')}
			// 		iconSource={Icons.messagingIcon}
			// 	/>
			// ),
			headerRight: <View />,
			headerLeft: (
				<ScreenHeaderButton
					iconName={'md-flame'}
					// onPress={() => props.navigation.navigate('HotPostsFeedScreenStack')}
				/>
			),
		};
	}

	public state = {
		selectedTab: FeedTabs.Friends,
	};

	private tabNavigator: NavigationContainer | null = null;

	public render() {
		return (
			<View style={style.container}>
				<View>
					<ScrollView
						style={style.topBar}
						contentContainerStyle={style.topBarContent}
						horizontal={true}
						bounces={false}
						showsHorizontalScrollIndicator={false}
					>
						<SearchFilterButton
							text={FeedTabs.Friends}
							selected={this.state.selectedTab === FeedTabs.Friends}
							onPress={() => this.changeTabTo(FeedTabs.Friends)}
							containerStyle={style.tabButton}
						/>
						<SearchFilterButton
							text={FeedTabs.Global}
							selected={this.state.selectedTab === FeedTabs.Global}
							onPress={() => this.changeTabTo(FeedTabs.Global)}
							containerStyle={style.tabButton}
						/>
					</ScrollView>
				</View>
				<FeedTabScreens
					screenProps={{topLevelNav: this.props.navigation}}
					ref={(nav: any) => (this.tabNavigator = nav)}
					onNavigationStateChange={this.handleNavigationChange}
				/>
			</View>
		);
	}

	private handleNavigationChange = (
		prevState: NavigationState,
		newState: NavigationState,
		action: NavigationAction,
	) => {
		action = action as NavigationNavigateAction;
		this.changeTabTo(action.routeName as FeedTabs);
	}

	private changeTabTo = (newTab: FeedTabs, skipNavigation = false) => {
		this.setState({
			selectedTab: newTab,
		});
		if (!skipNavigation && this.tabNavigator) {
			this.tabNavigator.dispatch(NavigationActions.navigate({routeName: newTab}));
		}
	}
}
