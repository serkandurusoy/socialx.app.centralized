import {applyMiddleware, compose, createStore, Reducer} from 'redux';

import axios from 'axios';
import axiosMiddle from 'redux-axios-middleware';
import thunk from 'redux-thunk';

export default (rootReducer: Reducer<any>) => {
	const axiosClient = axios.create({responseType: 'json'});
	const axiosMiddleware = axiosMiddle(axiosClient);

	const middleware = [thunk, axiosMiddleware];
	const enhancers = [applyMiddleware(...middleware)];

	const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(rootReducer, composeEnhancers(...enhancers));

	return store;
};
