import {
	HIDE_MODAL_CONFIRMATION,
	IModalConfirmationAction,
	IModalConfirmationStateProps,
	SHOW_MODAL_CONFIRMATION,
} from 'types';

const initialState: IModalConfirmationStateProps = {
	confirmActive: false,
};

export const ConfirmationReducers = (state = initialState, action: IModalConfirmationAction) => {
	switch (action.type) {
		case SHOW_MODAL_CONFIRMATION:
			return {
				...state,
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
