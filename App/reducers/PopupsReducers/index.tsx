import { HIDE_ACTIVITY_INDICATOR, IPopupAction, IPopupStateProps, SHOW_ACTIVITY_INDICATOR } from '../../types/popup';

const initialState: IPopupStateProps = {
	showActivityIndicator: false,
};

export const PopupsReducers = (state = initialState, action: IPopupAction) => {
	switch (action.type) {
		case SHOW_ACTIVITY_INDICATOR:
			return {
				...state,
				showActivityIndicator: true,
				...action.payload,
			};
		case HIDE_ACTIVITY_INDICATOR:
			return {
				...state,
				showActivityIndicator: false,
			};
	}
	return state;
};
