import { HIDE_ACTIVITY_INDICATOR, IPopupAction, SHOW_ACTIVITY_INDICATOR } from '../types';

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
