import {applyMiddleware, compose, createStore, Reducer} from 'redux';

import axios from 'axios';
import axiosMiddle from 'redux-axios-middleware';
import sagaMiddlewareFactory, {SagaIterator} from 'redux-saga';

export default (rootReducer: Reducer<any>, rootSaga: () => SagaIterator) => {
	const middleware = [];
	const enhancers = [];

	const sagaMiddleware = sagaMiddlewareFactory();

	const axiosClient = axios.create({responseType: 'json'});
	const axiosMiddleware = axiosMiddle(axiosClient);

	middleware.push(sagaMiddleware);
	middleware.push(axiosMiddleware);

	enhancers.push(applyMiddleware(...middleware));

	const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(rootReducer, composeEnhancers(...enhancers));

	// kick off root saga
	const sagasManager = sagaMiddleware.run(rootSaga);

	return {
		store,
		sagasManager,
		sagaMiddleware,
	};
};
