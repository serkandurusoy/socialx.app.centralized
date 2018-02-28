import {StackNavigator, TabNavigator} from 'react-navigation';
import LaunchScreen from '../screens/LaunchScreen';

import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UploadKeyScreen from '../screens/UploadKeyScreen';
import UserFeedScreen from '../screens/UserFeedScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import {ApplicationStyles, Colors} from '../theme';
import styles from './styles/NavigationStyles';

const MainScreenTabNavigation = TabNavigator(
	{
		UserFeedTab: {screen: UserFeedScreen},
		UserProfileTab: {screen: UserProfileScreen},
	},
	{
		tabBarPosition: 'bottom',
		animationEnabled: false,
		navigationOptions: {
			headerTitleStyle: ApplicationStyles.screenHeader,
			headerLeft: null,
		},
		lazy: true,
		swipeEnabled: false,
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
