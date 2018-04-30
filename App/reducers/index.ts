/// <reference types="@types/webpack-env" />
import {combineReducers} from 'redux';
import {AppUIReducers} from './AppUIReducers';
import configureStore from './CreateStore';
import {NavigationReducer, NavigationState} from './NavigationReducers';
import {PopupsReducers} from './PopupsReducers';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
	nav: NavigationReducer,
	popups: PopupsReducers,
	appUI: AppUIReducers,
});

export interface State {
	nav: NavigationState;
}

export default () => {
	// tslint:disable-next-line:prefer-const
	let reduxStage = configureStore(reducers);

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('./').reducers;
			reduxStage.store.replaceReducer(nextRootReducer);
		});
	}

	return reduxStage;
};
