export interface IPopupStateProps {
	showActivityIndicator: boolean;
	activityIndicatorTitle?: string;
	activityIndicatorMessage?: string;
}

export interface IPopupAction {
	type: string;
	payload?: {
		activityIndicatorTitle?: string;
		activityIndicatorMessage?: string;
	};
}

export const SHOW_ACTIVITY_INDICATOR = 'show_activity_indicator';
export const HIDE_ACTIVITY_INDICATOR = 'hide_activity_indicator';
