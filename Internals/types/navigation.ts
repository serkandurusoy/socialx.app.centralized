export interface INavigationState {
	feedTabActive: string;
}

export interface INavigationAction {
	type: string;
	payload?: {
		routeName: string;
	};
}

export const FEED_TAB_NAVIGATION_CHANGED = 'feed_tab_navigation_changed';
