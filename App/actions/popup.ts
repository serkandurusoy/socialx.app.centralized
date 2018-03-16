import {HIDE_ACTIVITY_INDICATOR, SHOW_ACTIVITY_INDICATOR} from '../constants';

export interface IPopupAction {
	type: string;
	payload?: {
		activityIndicatorTitle?: string;
		activityIndicatorMessage?: string;
	};
}

export const showActivityIndicator = (
	activityIndicatorTitle?: string,
	activityIndicatorMessage?: string,
): IPopupAction => ({
	type: SHOW_ACTIVITY_INDICATOR,
	payload: {
		activityIndicatorTitle,
		activityIndicatorMessage,
	},
});

export const hideActivityIndicator = (): IPopupAction => ({
	type: HIDE_ACTIVITY_INDICATOR,
});
