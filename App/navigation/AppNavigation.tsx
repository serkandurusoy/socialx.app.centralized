import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import LaunchScreen from '../screens/LaunchScreen';

import {TabBarBottom} from '../components/TabBarBottom';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PhotoScreen from '../screens/PhotoScreen';
import SaveKeyScreen from '../screens/SaveKeyScreen';
import SearchScreen from '../screens/SearchScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UploadKeyScreen from '../screens/UploadKeyScreen';
import UserFeedScreen from '../screens/UserFeedScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import {ApplicationStyles, Colors} from '../theme';
import styles from './styles/NavigationStyles';

const MainScreenTabNavigation = TabNavigator(
	{
		UserFeedTab: {screen: UserFeedScreen},
		SearchTab: {screen: SearchScreen},
		PhotoTab: {screen: PhotoScreen},
		NotificationsTab: {screen: NotificationsScreen},
		UserProfileTab: {screen: UserProfileScreen},
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
		tabBarComponent: (props: any) => <TabBarBottom navigation={props.navigation}/>,
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
		MainScreen: {screen: MainScreenTabNavigation},
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
