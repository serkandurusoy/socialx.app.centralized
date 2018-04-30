import {IAppUIAction, IAppUIStateProps, UPDATE_TAB_BAR_BOTTOM_HEIGHT} from 'types';

const initialState: IAppUIStateProps = {
	tabBarBottomHeight: 0,
};

export const AppUIReducers = (state = initialState, action: IAppUIAction) => {
	switch (action.type) {
		case UPDATE_TAB_BAR_BOTTOM_HEIGHT:
			return {
				...state,
				...action.payload,
			};
	}
	return state;
};
