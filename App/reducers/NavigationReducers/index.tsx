import {FeedTabs} from 'components';
import {NavigationAction, NavigationState} from 'react-navigation';
import {FEED_TAB_NAVIGATION_CHANGED, INavigationAction, INavigationState, START_APP} from 'types';
import AppNavigation from '../../navigation/AppNavigation';

export type NavigationState = NavigationState;

// TODO: not sure if we use this reducer? or we should just take it out?
export const NavigationReducer = (state: NavigationState, action: NavigationAction) => {
	const newState = AppNavigation.router.getStateForAction(action, state);
	return newState || state;
};

const initialState: INavigationState = {
	feedTabActive: FeedTabs.Friends,
};

export const CustomNavReducer = (state = initialState, action: INavigationAction) => {
	switch (action.type) {
		case START_APP:
			return {
				...initialState,
			};
		case FEED_TAB_NAVIGATION_CHANGED:
			return {
				...state,
				feedTabActive: action.payload.routeName,
			};
	}
	return state;
};
