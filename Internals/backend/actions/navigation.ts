import {NavigationActions, NavigationScreenProp, StackActions} from 'react-navigation';
import {FEED_TAB_NAVIGATION_CHANGED, INavigationAction} from 'types';

export const resetNavigationToRoute = (routeName: string, navigation: NavigationScreenProp<any>) => {
	const navAction = NavigationActions.navigate({routeName});
	const restAction = StackActions.reset({index: 0, actions: [navAction], key: null});
	navigation.dispatch(restAction);
};

export const feedTabNavigationChanged = (routeName: string): INavigationAction => ({
	type: FEED_TAB_NAVIGATION_CHANGED,
	payload: {routeName},
});
