import {
	HIDE_MODAL_CONFIRMATION,
	IModalConfirmationAction,
	IModalConfirmationProps,
	SHOW_MODAL_CONFIRMATION,
} from 'types';

export const showModalConfirmation = (confirmationOptions: IModalConfirmationProps): IModalConfirmationAction => ({
	type: SHOW_MODAL_CONFIRMATION,
	payload: confirmationOptions,
});

export const hideModalConfirmation = (): IModalConfirmationAction => ({
	type: HIDE_MODAL_CONFIRMATION,
});
