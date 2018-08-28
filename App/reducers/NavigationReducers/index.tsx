import {NavigationAction, NavigationState} from 'react-navigation';
import AppNavigation from '../../navigation/AppNavigation';

export type NavigationState = NavigationState;

// TODO: not sure if we use this reducer? or we should just take it out?
export const NavigationReducer = (state: NavigationState, action: NavigationAction) => {
	const newState = AppNavigation.router.getStateForAction(action, state);
	return newState || state;
};
