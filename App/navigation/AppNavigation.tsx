import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import LaunchScreen from '../screens/LaunchScreen';

import {TabBarBottom} from '../components/Displayers';
import ChatThreadScreen from '../screens/ChatThreadScreen';
import CommentsScreen from '../screens/CommentsScreen';
import RepliesScreen from '../screens/CommentsScreen/RepliesScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import GroupScreen from '../screens/GroupFeedScreen';
import LoginScreen from '../screens/LoginScreen';
import MediaViewerScreen from '../screens/MediaViewerScreen';
import MessagingScreen from '../screens/MessagingScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import {NewWallPostScreen} from '../screens/NewWallPostScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PhotoScreen from '../screens/PhotoScreen';
import {RewardsScreen} from '../screens/RewardsScreen';
import SaveKeyScreen from '../screens/SaveKeyScreen';
import SearchScreen from '../screens/SearchScreen';
import SendCoinsScreen from '../screens/SendCoinsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SocialXAccountScreen from '../screens/SocialXAccountScreen';
import UploadKeyScreen from '../screens/UploadKeyScreen';
import UserFeedScreen from '../screens/UserFeedScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import WalletActivityScreen from '../screens/WalletActivityScreen';
import {ApplicationStyles, Colors} from '../theme';
import styles from './styles/NavigationStyles';

const navOptionsDefault = {
	headerStyle: styles.header,
	headerTintColor: Colors.white, // color for screen title and back button
	headerTitleStyle: ApplicationStyles.screenHeader,
	headerBackTitle: null,
	gesturesEnabled: false,
};

const getSingleScreenStack = (routeName: string, screen: any) => {
	const routeConfigMap: any = {};
	routeConfigMap[routeName] = {screen};
	return StackNavigator(routeConfigMap, {
		navigationOptions: navOptionsDefault,
	});
};

const MyProfileStackNavigator = StackNavigator(
	{
		MyProfileScreen: {screen: MyProfileScreen},
		SettingsScreen: {screen: SettingsScreen},
		WalletActivityScreen: {screen: WalletActivityScreen},
		SocialXAccountScreen: {screen: SocialXAccountScreen},
	},
	{
		navigationOptions: navOptionsDefault,
	},
);

const CommentsStackNavigator = StackNavigator(
	{
		CommentsScreen: {screen: CommentsScreen},
		RepliesScreen: {screen: RepliesScreen},
	},
	{
		headerMode: 'screen',
		navigationOptions: navOptionsDefault,
	},
);

const MainScreenTabNavigation = TabNavigator(
	{
		UserFeedTab: getSingleScreenStack('UserFeedScreen', UserFeedScreen),
		SearchTab: getSingleScreenStack('SearchScreen', SearchScreen),
		NotificationsTab: getSingleScreenStack('NotificationsScreen', NotificationsScreen),
		MyProfileTab: {screen: MyProfileStackNavigator},
	},
	{
		tabBarPosition: 'bottom',
		animationEnabled: true,
		navigationOptions: {
			header: null,
		},
		lazy: true,
		swipeEnabled: false,
		tabBarComponent: (props: any) => <TabBarBottom navigation={props.navigation} />,
	},
);

const MainScreenWithModal = StackNavigator(
	{
		MainScreenTabNavigation: {screen: MainScreenTabNavigation},
		NewWallPostScreen: getSingleScreenStack('NewWallPostScreen', NewWallPostScreen),
		PhotoScreen: getSingleScreenStack('PhotoScreen', PhotoScreen),
		MediaViewerScreen: getSingleScreenStack('MediaViewerScreen', MediaViewerScreen),
		CommentsStack: {screen: CommentsStackNavigator},
	},
	{
		mode: 'modal',
		headerMode: 'none',
	},
);

const PreAuthNavigator = StackNavigator(
	{
		LaunchScreen: {screen: LaunchScreen},
		LoginScreen: {screen: LoginScreen},
		SignUpScreen: {screen: SignUpScreen},
		ForgotPasswordScreen: {screen: ForgotPasswordScreen},
		UploadKeyScreen: {screen: UploadKeyScreen},
		SaveKeyScreen: {screen: SaveKeyScreen},
	},
	{
		headerMode: 'screen',
		navigationOptions: navOptionsDefault,
	},
);

// Manifest of possible screens
const PrimaryNav = StackNavigator(
	{
		PreAuthScreen: {screen: PreAuthNavigator},
		MainScreen: {screen: MainScreenWithModal},
		MessagingScreen: {screen: MessagingScreen}, // TODO: later to be moved
		GroupScreen: {screen: GroupScreen}, // TODO: later to be moved
		UserProfileScreen: {screen: UserProfileScreen}, // TODO: later to be moved!
		SendCoinsScreen: {screen: SendCoinsScreen}, // TODO: later to be moved!
		ChatThreadScreen: {screen: ChatThreadScreen}, // TODO: later to be moved!
		RewardsScreen: {screen: RewardsScreen}, // TODO: later to be moved!
	},
	{
		headerMode: 'none',
		initialRouteName: 'PreAuthScreen',
	},
);

export default PrimaryNav;
