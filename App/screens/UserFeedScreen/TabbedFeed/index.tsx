import React from 'react';
import {InteractionManager, ScrollView, View} from 'react-native';
import {
	NavigationAction,
	NavigationActions,
	NavigationContainer,
	NavigationNavigateAction,
	NavigationScreenProp,
	NavigationState,
	TabNavigator,
} from 'react-navigation';

import {ScreenHeaderButton, SearchFeedHeader, SearchFilterButton} from 'components';
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

export interface ITabbedScreenProps {
	screenProps: {
		topLevelNav: NavigationScreenProp<any>;
		searchTerm: string;
	};
}

interface ITabbedFeedProps {
	navigation: NavigationScreenProp<any>;
}

interface ITabbedFeedState {
	selectedTab: FeedTabs;
	searchTerm: string;
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
			headerLeft: <ScreenHeaderButton iconName={'md-flame'} onPress={() => alert('Hot Posts.. Comming soon..')} />,
			headerTitle: () => {
				const params = props.navigation.state.params || {};
				return (
					<SearchFeedHeader
						onPress={() => alert('Search for #\'s or @\'s or even a relavent keyword.. Comming soon..')}
						searchInputUpdated={params.searchInputUpdatedHandler}
					/>
				);
			},
		};
	}

	public state = {
		selectedTab: FeedTabs.Friends,
		searchTerm: '',
	};

	private tabNavigator: NavigationContainer | null = null;

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({searchInputUpdatedHandler: this.updateSearchTerm});
		});
	}

	public render() {
		const screenProps = {
			topLevelNav: this.props.navigation,
			searchTerm: this.state.searchTerm,
		};
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
					screenProps={screenProps}
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

	private updateSearchTerm = async (term: string) => {
		this.setState({
			searchTerm: term,
		});
	}
}
