import {IAppUIAction, UPDATE_TAB_BAR_BOTTOM_HEIGHT} from '../types/appUI';

export const updateTabBarBottomHeight = (tabBarBottomHeight: number): IAppUIAction => ({
	type: UPDATE_TAB_BAR_BOTTOM_HEIGHT,
	payload: {tabBarBottomHeight},
});
