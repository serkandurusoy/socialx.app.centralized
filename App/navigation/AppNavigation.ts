import {StackNavigator} from 'react-navigation';
import LaunchScreen from '../screens/LaunchScreen';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import styles from './styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
	{
		LaunchScreen: {screen: LaunchScreen},
		LoginScreen: {screen: LoginScreen},
		SignUpScreen: {screen: SignUpScreen},
	},
	{
		// Default config for all screens
		// headerMode: 'none',
		initialRouteName: 'LaunchScreen',
		navigationOptions: {
			headerStyle: styles.header,
		},
	},
);

export default PrimaryNav;
