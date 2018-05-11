import {
	HIDE_MODAL_CONFIRMATION,
	IModalConfirmationAction,
	IModalConfirmationStateProps,
	SHOW_MODAL_CONFIRMATION,
	START_APP,
} from 'types';

const initialState: IModalConfirmationStateProps = {
	confirmActive: false,
	title: '',
	message: '',
	confirmButton: 'Yes!',
	cancelButton: 'No',
	confirmHandler: undefined,
	declineHandler: undefined,
};

export const ConfirmationReducers = (state = initialState, action: IModalConfirmationAction) => {
	switch (action.type) {
		case START_APP:
			return {
				...initialState,
			};
		case SHOW_MODAL_CONFIRMATION:
			return {
				...state,
				...initialState,
				confirmActive: true,
				...action.payload,
			};
		case HIDE_MODAL_CONFIRMATION:
			return {
				...state,
				confirmActive: false,
			};
	}
	return state;
};
