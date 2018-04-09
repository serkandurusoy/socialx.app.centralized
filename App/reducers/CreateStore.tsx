import {applyMiddleware, compose, createStore, Reducer} from 'redux';

import axios from 'axios';
import axiosMiddle from 'redux-axios-middleware';
import ReduxThunk from 'redux-thunk';

export default (rootReducer: Reducer<any>) => {
	const middleware = [];
	const enhancers = [];

	const thunk = ReduxThunk;

	const axiosClient = axios.create({responseType: 'json'});
	const axiosMiddleware = axiosMiddle(axiosClient);

	middleware.push(thunk);
	middleware.push(axiosMiddleware);

	enhancers.push(applyMiddleware(...middleware));

	const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(rootReducer, composeEnhancers(...enhancers));

	return store;
};
