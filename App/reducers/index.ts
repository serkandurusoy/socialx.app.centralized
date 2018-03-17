/// <reference types="@types/webpack-env" />
import {combineReducers} from 'redux';
import root from '../Sagas';
import configureStore from './CreateStore';
import {NavigationReducer, NavigationState} from './NavigationReducers';
import {PopupsReducers} from './PopupsReducers';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
	nav: NavigationReducer,
	popups: PopupsReducers,
});

export interface State {
	nav: NavigationState;
}

export default () => {
	// tslint:disable-next-line:prefer-const
	let {store, sagasManager, sagaMiddleware} = configureStore(reducers, root);

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('./').reducers;
			store.replaceReducer(nextRootReducer);

			const newYieldedSagas = require('../Sagas').default;
			sagasManager.cancel();
			sagasManager.done.then(() => {
				sagasManager = sagaMiddleware.run(newYieldedSagas);
			});
		});
	}

	return store;
};
