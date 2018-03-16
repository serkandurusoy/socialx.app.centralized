import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import LaunchScreen from '../screens/LaunchScreen';

import {TabBarBottom} from '../components/TabBarBottom';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import GroupScreen from '../screens/GroupFeedScreen';
import LoginScreen from '../screens/LoginScreen';
import MediaViewerScreen from '../screens/MediaViewerScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import {NewWallPostScreen} from '../screens/NewWallPostScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PhotoScreen from '../screens/PhotoScreen';
import SaveKeyScreen from '../screens/SaveKeyScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UploadKeyScreen from '../screens/UploadKeyScreen';
import UserFeedScreen from '../screens/UserFeedScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import WalletActivityScreen from '../screens/WalletActivityScreen';
import {ApplicationStyles, Colors} from '../theme';
import styles from './styles/NavigationStyles';

const MainScreenTabNavigation = TabNavigator(
	{
		UserFeedTab: {screen: UserFeedScreen},
		SearchTab: {screen: SearchScreen},
		PhotoTab: {screen: PhotoScreen},
		NotificationsTab: {screen: NotificationsScreen},
		MyProfileTab: {screen: MyProfileScreen},
	},
	{
		tabBarPosition: 'bottom',
		animationEnabled: true,
		navigationOptions: {
			headerTitleStyle: ApplicationStyles.screenHeader,
			headerLeft: null,
		},
		lazy: true,
		swipeEnabled: false,
		tabBarComponent: (props: any) => <TabBarBottom navigation={props.navigation} />,
	},
);

const MainScreenWithModal = StackNavigator(
	{
		MainScreenTabNavigation: {screen: MainScreenTabNavigation},
		NewWallPostScreen: {
			screen: NewWallPostScreen,
		},
	},
	{
		mode: 'modal',
		headerMode: 'none',
	},
);

// Manifest of possible screens
const PrimaryNav = StackNavigator(
	{
		LaunchScreen: {screen: LaunchScreen},
		LoginScreen: {screen: LoginScreen},
		SignUpScreen: {screen: SignUpScreen},
		ForgotPasswordScreen: {screen: ForgotPasswordScreen},
		UploadKeyScreen: {screen: UploadKeyScreen},
		SaveKeyScreen: {screen: SaveKeyScreen},
		MainScreen: {screen: MainScreenWithModal},
		GroupScreen: {screen: GroupScreen}, // TODO: later to be moved
		SettingsScreen: {screen: SettingsScreen}, // TODO: later to be moved!
		UserProfileScreen: {screen: UserProfileScreen}, // TODO: later to be moved!
		WalletActivityScreen: {screen: WalletActivityScreen}, // TODO: later to be moved!
		MediaViewerScreen: {screen: MediaViewerScreen}, // TODO: later to be moved!
	},
	{
		headerMode: 'screen',
		initialRouteName: 'LaunchScreen',
		navigationOptions: {
			headerStyle: styles.header,
			headerTintColor: Colors.white, // color for screen title and back button
			headerTitleStyle: ApplicationStyles.screenHeader,
			headerBackTitle: null,
			gesturesEnabled: false,
		},
	},
);

export default PrimaryNav;
