import {IAppUIAction, UPDATE_NEW_NOTIFICATIONS, UPDATE_TAB_BAR_BOTTOM_HEIGHT} from 'types';

export const updateTabBarBottomHeight = (tabBarBottomHeight: number): IAppUIAction => ({
	type: UPDATE_TAB_BAR_BOTTOM_HEIGHT,
	payload: {tabBarBottomHeight},
});

// TODO: @Jake: use this to set number of new notifications, used in bottom menu badge
export const updateNewNotifications = (newNotifications: number): IAppUIAction => ({
	type: UPDATE_NEW_NOTIFICATIONS,
	payload: {newNotifications},
});
