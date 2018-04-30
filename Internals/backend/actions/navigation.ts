import {NavigationActions, NavigationScreenProp} from 'react-navigation';

export const resetNavigationToRoute = (routeName: string, navigation: NavigationScreenProp<any>) => {
	const navAction = NavigationActions.navigate({routeName});
	const restAction = NavigationActions.reset({index: 0, actions: [navAction], key: null});
	navigation.dispatch(restAction);
};
