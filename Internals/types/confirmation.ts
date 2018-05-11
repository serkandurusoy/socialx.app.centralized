export const SHOW_MODAL_CONFIRMATION = 'show_modal_confirmation';
export const HIDE_MODAL_CONFIRMATION = 'hide_modal_confirmation';

export interface IModalConfirmationProps {
	title?: string;
	message?: string;
	confirmButton?: string;
	cancelButton?: string;
	confirmHandler?: () => void;
	declineHandler?: () => void;
}

export interface IModalConfirmationStateProps extends IModalConfirmationProps {
	confirmActive: boolean;
}

export interface IModalConfirmationAction {
	type: string;
	payload?: IModalConfirmationProps;
}
