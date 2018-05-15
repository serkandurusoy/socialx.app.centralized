export interface IAppUIStateProps {
	tabBarBottomHeight: number;
	newNotifications: number;
}

export interface IAppUIAction {
	type: string;
	payload?: Partial<IAppUIStateProps>;
}

export const UPDATE_TAB_BAR_BOTTOM_HEIGHT = 'update_tab_bar_bottom_height';
export const START_APP = '@@INIT';
export const UPDATE_NEW_NOTIFICATIONS = 'update_new_notifications';
