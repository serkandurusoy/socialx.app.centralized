export interface IAppUIStateProps {
	tabBarBottomHeight: number;
}

export interface ITabBarBottomHeight {
	tabBarBottomHeight: number;
}

export interface IAppUIAction {
	type: string;
	payload?: ITabBarBottomHeight;
}

export const UPDATE_TAB_BAR_BOTTOM_HEIGHT = 'update_tab_bar_bottom_height';
