/// <reference types="@types/webpack-env" />
import configureStore from './configureStore';
import rootReducer from './rootReducer';

// TODO: @serkan ask @jake why redux is scattered around, reducers/actions/types/initialState should live together
export default () => {
	const { store, persistor } = configureStore(rootReducer);

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('./').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return { store, persistor };
};
