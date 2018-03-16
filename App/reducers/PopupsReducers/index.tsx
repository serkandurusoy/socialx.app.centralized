import {createAction, getType} from 'typesafe-actions';
import {$call} from 'utility-types';
import {HIDE_ACTIVITY_INDICATOR, SHOW_ACTIVITY_INDICATOR} from '../../constants';

export const actions = {
	showActivityIndicator: createAction(
		SHOW_ACTIVITY_INDICATOR,
		(payload: {activityIndicatorTitle: string | null; activityIndicatorMessage: string | null}) => ({
			type: SHOW_ACTIVITY_INDICATOR,
			payload,
		}),
	),
	hideActivityIndicator: createAction(HIDE_ACTIVITY_INDICATOR),
};

const returnsOfActions = Object.values(actions).map($call);
type PopupActions = typeof returnsOfActions[number];

const initialState = {
	showActivityIndicator: false,
	activityIndicatorTitle: null,
	activityIndicatorMessage: null,
};

export const PopupsReducers = (state = initialState, action: PopupActions) => {
	switch (action.type) {
		case getType(actions.showActivityIndicator):
			return {
				...state,
				showActivityIndicator: true,
				...action.payload,
			};
		case getType(actions.hideActivityIndicator):
			return {
				...state,
				showActivityIndicator: false,
			};
		default:
			return state;
	}
};
