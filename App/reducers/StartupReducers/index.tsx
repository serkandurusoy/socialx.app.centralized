import {createAction} from 'typesafe-actions';

// TODO: @serkan ask @jake what's up with naming here, this is not a reducer?
const actions = {
	startup: createAction('startup'),
};

export const StartupActions = actions;
