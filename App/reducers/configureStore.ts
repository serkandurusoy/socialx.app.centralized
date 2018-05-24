import {applyMiddleware, compose, createStore, Reducer} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import axios from 'axios';
import axiosMiddle from 'redux-axios-middleware';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
};

export default (rootReducer: Reducer<any>) => {
	const axiosClient = axios.create({responseType: 'json'});
	const axiosMiddleware = axiosMiddle(axiosClient);

	const middleware = [thunk, axiosMiddleware];
	const enhancers = [applyMiddleware(...middleware)];

	const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const persistedReducer = persistReducer(persistConfig, rootReducer);
	const store = createStore(persistedReducer, composeEnhancers(...enhancers));

	const persistor = persistStore(store);

	return {store, persistor};
};
