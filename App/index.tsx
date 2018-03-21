import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Provider} from 'react-redux';

import RootContainer, {AppsyncClient, Rehydrated} from './containers/RootContainer';
import createStore from './reducers';

const store = createStore();

export default class App extends Component<{}, {}> {
	public render() {
		return (
			<ApolloProvider client={AppsyncClient}>
				<Rehydrated>
					<Provider store={store}>
						<RootContainer />
					</Provider>
				</Rehydrated>
			</ApolloProvider>
		);
	}
}
