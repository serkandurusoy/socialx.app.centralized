import { IPopupAction } from '../../actions';
import { HIDE_ACTIVITY_INDICATOR, SHOW_ACTIVITY_INDICATOR } from '../../constants';

export interface IStateProps {
	showActivityIndicator: boolean;
	activityIndicatorTitle?: string;
	activityIndicatorMessage?: string;
}

const initialState: IStateProps = {
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
