import {NavigationActions, NavigationScreenProp, StackActions} from 'react-navigation';

export const resetNavigationToRoute = (routeName: string, navigation: NavigationScreenProp<any>) => {
	const navAction = NavigationActions.navigate({routeName});
	const restAction = StackActions.reset({index: 0, actions: [navAction], key: null});
	navigation.dispatch(restAction);
};
