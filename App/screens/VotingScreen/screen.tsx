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

import {SearchFilterButton} from 'components';
import AdvertisementTab from './advertisement';
import FeatureRequestsTab from './featureRequests';
import GovernanceTab from './GovernanceTab';
import style from './style';

enum VotingTabs {
	Governance = 'Governance',
	Advertisement = 'Advertisement',
	FeatureRequests = 'Feature Requests',
}

const tabsRouteConfig: any = {};
tabsRouteConfig[VotingTabs.Governance] = GovernanceTab;
tabsRouteConfig[VotingTabs.Advertisement] = AdvertisementTab;
tabsRouteConfig[VotingTabs.FeatureRequests] = FeatureRequestsTab;

const VotingScreens = TabNavigator(tabsRouteConfig, {
	animationEnabled: true,
	swipeEnabled: true,
	lazy: true,
	navigationOptions: {
		tabBarVisible: false,
		header: null,
	},
});

interface IVotingScreenComponentProps {
	navigation: NavigationScreenProp<any>;
}

interface IVotingScreenComponentState {
	selectedTab: VotingTabs;
}

export class VotingScreenComponent extends React.Component<IVotingScreenComponentProps, IVotingScreenComponentState> {
	public state = {
		selectedTab: VotingTabs.Governance,
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
							text={VotingTabs.Governance}
							selected={this.state.selectedTab === VotingTabs.Governance}
							onPress={() => this.changeTabTo(VotingTabs.Governance)}
							containerStyle={style.tabButton}
						/>
						<SearchFilterButton
							text={VotingTabs.Advertisement}
							selected={this.state.selectedTab === VotingTabs.Advertisement}
							onPress={() => this.changeTabTo(VotingTabs.Advertisement)}
							containerStyle={style.tabButton}
						/>
						<SearchFilterButton
							text={VotingTabs.FeatureRequests}
							selected={this.state.selectedTab === VotingTabs.FeatureRequests}
							onPress={() => this.changeTabTo(VotingTabs.FeatureRequests)}
							containerStyle={style.tabButton}
						/>
					</ScrollView>
				</View>
				<VotingScreens
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
		this.changeTabTo(action.routeName as VotingTabs);
	}

	private changeTabTo = (newTab: VotingTabs, skipNavigation = false) => {
		this.setState({
			selectedTab: newTab,
		});
		if (!skipNavigation && this.tabNavigator) {
			this.tabNavigator.dispatch(NavigationActions.navigate({routeName: newTab}));
		}
	}
}
