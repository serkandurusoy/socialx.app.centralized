import React from 'react';
import {Animated, Easing, View} from 'react-native';
import {
	createBottomTabNavigator,
	createMaterialTopTabNavigator,
	createStackNavigator,
	NavigationSceneRendererProps,
	TransitionConfig,
} from 'react-navigation';

import {FeedTabBar, HeaderLogo, ScreenHeaderButton, TabBarBottom} from 'components';
import {SearchHeader} from '../screens/SearchScreen/Components';
import {TrendingScreen} from '../screens/SearchScreen/TrendingScreen';

import {ApplicationStyles, Colors, Fonts, Icons} from 'theme';
import {getText} from 'utilities';
import ChatThreadScreen from '../screens/ChatThreadScreen';
import CommentsScreen from '../screens/CommentsScreen/data.hoc';
import CreateEventScreen from '../screens/CreateEventScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import GroupScreen from '../screens/GroupFeedScreen';
import IncomingCallScreen from '../screens/IncomingCallScreen';
import IntroScreen from '../screens/IntroScreen';
import LaunchScreen from '../screens/LaunchScreen';
import LoginScreen from '../screens/LoginScreen';
import MaintenanceScreen from '../screens/Maintenance';
import MediaLicenceFAQScreen from '../screens/MediaLicenceFAQScreen';
import MediaLicenceScreen from '../screens/MediaLicenceScreen';
import MediaViewerScreen from '../screens/MediaViewerScreen';
import MessagingScreen from '../screens/MessagingScreen';
import MyEventsScreen from '../screens/MyEventsScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import {NewWallPostScreen} from '../screens/NewWallPostScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import OutgoingCallScreen from '../screens/OutgoingCallScreen';
import PhotoScreen from '../screens/PhotoScreen';
import ProfileAnalyticsScreen from '../screens/ProfileAnalyticsScreen';
import ReferralScreen from '../screens/ReferralScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import {RewardsScreen} from '../screens/RewardsScreen';
import SaveKeyScreen from '../screens/SaveKeyScreen';
import SearchScreen from '../screens/SearchScreen';
import {PeopleTab} from '../screens/SearchScreen/PeopleTab';
import {PlacesTab} from '../screens/SearchScreen/PlacesTab';
import {TagsTab} from '../screens/SearchScreen/TagsTab';
import {TopTab} from '../screens/SearchScreen/TopTab';
import SendCoinsScreen from '../screens/SendCoinsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SocialXAccountScreen from '../screens/SocialXAccountScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen';
import UploadKeyScreen from '../screens/UploadKeyScreen';
import FriendsFeed from '../screens/UserFeedScreen/friendsUserFeed';
import GlobalFeed from '../screens/UserFeedScreen/globalUserFeed';
import HotPostsFeedScreen from '../screens/UserFeedScreen/hotPostsFeed';
import UserProfileScreen from '../screens/UserProfileScreen';
import VotingScreen from '../screens/VotingScreen';
import WalletActivityScreen from '../screens/WalletActivityScreen';

import styles from './styles/NavigationStyles';

const navOptionsDefault = {
	headerStyle: styles.header,
	headerTintColor: Colors.white, // color for screen title and back button
	headerTitleStyle: ApplicationStyles.screenHeader,
	headerBackTitle: null,
	gesturesEnabled: false,
	getText, // TODO: this is a bad hack, we should reconsider the architecture!
};

const navOptionsNoHeader = {
	header: null,
};

const slideFromLeftTransition = (): TransitionConfig => ({
	transitionSpec: {
		duration: 700,
		easing: Easing.out(Easing.poly(4)),
		timing: Animated.timing,
	},
	screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
		const {layout, position, scene} = sceneProps;

		const thisSceneIndex = scene.index;
		const width = layout.initWidth;

		const translateX = position.interpolate({
			inputRange: [thisSceneIndex - 1, thisSceneIndex],
			outputRange: [-width, 0],
		});

		return {transform: [{translateX}]};
	},
});

const fadeIn = (): TransitionConfig => ({
	screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
		const {position, scene} = sceneProps;

		const sceneIndex = scene.index;

		const opacity = position.interpolate({
			inputRange: [sceneIndex - 1, sceneIndex],
			outputRange: [0, 1],
		});

		return {opacity};
	},
});

const getSingleScreenStack = (routeName: string, screen: any, stackConfig: any = {}) => {
	const routeConfigMap: any = {};
	routeConfigMap[routeName] = {screen};
	return createStackNavigator(routeConfigMap, {
		navigationOptions: navOptionsDefault,
		...stackConfig,
	});
};

const getMainStackWithModalsForScreen = (routeName: string, screen: any) => {
	const modalsConfigMap: any = {
		NewWallPostScreen: getSingleScreenStack('NewWallPostScreen', NewWallPostScreen),
		PhotoScreen: getSingleScreenStack('PhotoScreen', PhotoScreen),
		MediaViewerScreen: getSingleScreenStack('MediaViewerScreen', MediaViewerScreen),
		CommentsStack: {screen: CommentsStackNavigator},
		UserProfileScreen: getSingleScreenStack('UserProfileScreen', UserProfileScreen),
		MediaLicenceStack: {screen: MediaLicenceStackNavigator},
		VotingScreen: getSingleScreenStack('VotingScreen', VotingScreen),
		IncomingCallScreen: {screen: IncomingCallScreen},
		OutgoingCallScreen: {screen: OutgoingCallScreen},
	};
	const screenConfigMap: any = {};
	screenConfigMap[routeName] = screen;
	const updatedRouteConfig = {
		...screenConfigMap,
		...modalsConfigMap,
	};
	return createStackNavigator(updatedRouteConfig, {
		mode: 'modal',
		headerMode: 'none',
		navigationOptions: {
			gesturesEnabled: true,
		},
	});
};

const MediaLicenceStackNavigator = createStackNavigator(
	{
		MediaLicenceScreen: {screen: MediaLicenceScreen},
		MediaLicenceFAQScreen: {screen: MediaLicenceFAQScreen},
	},
	{
		navigationOptions: navOptionsDefault,
	},
);

const EventsStackNavigator = createStackNavigator(
	{
		MyEventsScreen: {screen: MyEventsScreen},
		CreateEventScreen: {screen: CreateEventScreen},
		EventDetailScreen: {screen: EventDetailScreen},
	},
	{
		navigationOptions: navOptionsDefault,
	},
);

const MyProfileStackNavigator = createStackNavigator(
	{
		MyProfileScreen: {screen: MyProfileScreen},
		SettingsScreen: {screen: SettingsScreen},
		WalletActivityScreen: {screen: WalletActivityScreen},
		SocialXAccountScreen: {screen: SocialXAccountScreen},
		ProfileAnalyticsScreen: {screen: ProfileAnalyticsScreen},
		RewardsScreen: {screen: RewardsScreen},
		ReferralScreen: {screen: ReferralScreen},
	},
	{
		navigationOptions: {
			...navOptionsDefault,
			gesturesEnabled: true,
		},
	},
);

const CommentsStackNavigator = createStackNavigator(
	{
		CommentsScreen: {screen: CommentsScreen},
	},
	{
		headerMode: 'screen',
		navigationOptions: navOptionsDefault,
	},
);

const TabbedFeedNavigator = createMaterialTopTabNavigator(
	{
		Friends: FriendsFeed,
		Global: GlobalFeed,
	},
	{
		animationEnabled: true,
		swipeEnabled: true,
		// lazy: true, // this is missing with createMaterialTopTabNavigator
		// tabBarComponent: (props: any) => <FeedTabBar navigation={props.navigation} />,
		tabBarOptions: {
			activeTintColor: Colors.pink,
			inactiveTintColor: Colors.background,
			indicatorStyle: {
				height: 1,
				backgroundColor: Colors.pink,
			},
			pressOpacity: 1,
			upperCaseLabel: false,
			labelStyle: {
				fontSize: 14,
				// ...Fonts.centuryGothic,
			},
			style: {
				backgroundColor: Colors.white,
			},
		},
	},
);

const UserFeedStackNavigator = createStackNavigator(
	{
		TabbedFeedScreen: {
			screen: TabbedFeedNavigator,
			navigationOptions: () => ({
				headerLeft: (
					<ScreenHeaderButton
						iconName='md-flame'
						// onPress={() => navigation.navigate('HotPostsFeedScreenStack')}
						onPress={() => alert('Hot Posts.. Coming soon..')}
					/>
				),
				// headerRight: (
				// 	<ScreenHeaderButton
				// 		onPress={() => navigation.navigate('MessagingScreen')}
				// 		iconSource={Icons.messagingIcon}
				// 	/>
				// ),
				headerRight: <View />,
				headerTitle: <HeaderLogo />,
			}),
		},
		MessagingScreen: {screen: MessagingScreen},
		ChatThreadScreen: {screen: ChatThreadScreen},
	},
	{
		navigationOptions: {
			...navOptionsDefault,
			gesturesEnabled: true,
		},
	},
);

const TabbedSearchNavigator = createMaterialTopTabNavigator(
	{
		Top: TopTab,
		People: PeopleTab,
		Tags: TagsTab,
		Places: PlacesTab,
	},
	{
		animationEnabled: true,
		swipeEnabled: true,
		tabBarOptions: {
			activeTintColor: Colors.pink,
			inactiveTintColor: Colors.background,
			indicatorStyle: {
				height: 1,
				backgroundColor: Colors.pink,
			},
			pressOpacity: 1,
			upperCaseLabel: false,
			labelStyle: {
				fontSize: 14,
				// ...Fonts.centuryGothic,
			},
			style: {
				backgroundColor: Colors.white,
			},
		},
	},
);

const UserSearchStackNavigator = createStackNavigator(
	{
		Trending: {
			screen: TrendingScreen,
			navigationOptions: ({navigation}) => ({
				header: () => <SearchHeader navigation={navigation} />,
			}),
		},
		TabbedSearchScreen: {
			screen: TabbedSearchNavigator,
			navigationOptions: ({navigation}) => ({
				header: () => <SearchHeader navigation={navigation} cancel={true} />,
			}),
		},
	},
	{
		navigationOptions: {
			gesturesEnabled: false,
		},
		transitionConfig: fadeIn,
	},
);

const MainScreenTabNavigation = createBottomTabNavigator(
	{
		UserFeedTab: UserFeedStackNavigator,
		// SearchTab: getSingleScreenStack('SearchScreen', SearchScreen),
		SearchTab: UserSearchStackNavigator,
		NotificationsTab: getSingleScreenStack('NotificationsScreen', NotificationsScreen),
		MyProfileTab: MyProfileStackNavigator,
	},
	{
		tabBarPosition: 'bottom',
		animationEnabled: true,
		navigationOptions: navOptionsNoHeader,
		lazy: true,
		swipeEnabled: false,
		tabBarComponent: (props: any) => <TabBarBottom navigation={props.navigation} />,
	},
);

const MainScreenWithModal = createStackNavigator(
	{
		MainScreenTabNavigationWithModal: getMainStackWithModalsForScreen(
			'MainScreenTabNavigation',
			MainScreenTabNavigation,
		),
		HotPostsStackWithModal: getMainStackWithModalsForScreen(
			'HotPostsFeedScreenStack',
			getSingleScreenStack('HotPostsFeedScreen', HotPostsFeedScreen),
		),
	},
	{
		mode: 'modal',
		headerMode: 'none',
		transitionConfig: slideFromLeftTransition,
	},
);

const PreAuthNavigator = createStackNavigator(
	{
		LaunchScreen: {screen: LaunchScreen},
		LoginScreen: {screen: LoginScreen},
		SignUpScreen: {screen: SignUpScreen},
		ForgotPasswordScreen: {screen: ForgotPasswordScreen},
		ResetPasswordScreen: {screen: ResetPasswordScreen},
		UploadKeyScreen: {screen: UploadKeyScreen},
		SaveKeyScreen: {screen: SaveKeyScreen},
		TermsAndConditionsScreen: {screen: TermsAndConditionsScreen},
	},
	{
		headerMode: 'screen',
		navigationOptions: {
			...navOptionsDefault,
			gesturesEnabled: true,
		},
	},
);

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
	{
		PreAuthScreen: {screen: PreAuthNavigator},
		IntroScreen: {screen: IntroScreen},
		MainScreen: {screen: MainScreenWithModal},
		Maintenance: {screen: MaintenanceScreen},
		GroupScreen: {screen: GroupScreen}, // TODO: later to be moved
		SendCoinsScreen: {screen: SendCoinsScreen}, // TODO: later to be moved!
		EventsStack: {screen: EventsStackNavigator}, // TODO: later to be moved!
	},
	{
		headerMode: 'none',
	},
);

export default PrimaryNav;
