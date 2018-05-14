import {IAppUIAction, IAppUIStateProps, START_APP, UPDATE_NEW_NOTIFICATIONS, UPDATE_TAB_BAR_BOTTOM_HEIGHT} from 'types';

const initialState: IAppUIStateProps = {
	tabBarBottomHeight: 0,
	newNotifications: 0,
};

export const AppUIReducers = (state = initialState, action: IAppUIAction) => {
	switch (action.type) {
		case START_APP:
			return {
				...initialState,
			};
		case UPDATE_TAB_BAR_BOTTOM_HEIGHT:
			return {
				...state,
				...action.payload,
			};
		case UPDATE_NEW_NOTIFICATIONS:
			return {
				...state,
				...action.payload,
			};
	}
	return state;
};
