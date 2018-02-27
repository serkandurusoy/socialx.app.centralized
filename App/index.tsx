import React, {Component} from 'react';
import {Provider} from 'react-redux';

import RootContainer from './containers/RootContainer';
import createStore from './reducers';

const store = createStore();

export default class App extends Component<{}, {}> {
	public render() {
		return (
			<Provider store={store}>
				<RootContainer />
			</Provider>
		);
	}
}
