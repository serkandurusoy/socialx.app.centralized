import '../shim.js';

import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Platform, StatusBar} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// refactoring
import {getAvailableAnimations} from 'configuration/animations';
import {OS_TYPES} from 'consts';
import {Colors} from 'theme';

import {AppsyncClient, Rehydrated} from 'backend/appsync';
import RootContainer from './containers/RootContainer';

import createStore from './reducers';

const reduxStage = createStore();

export default class App extends Component<{}, {}> {
	public componentDidMount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			StatusBar.setBackgroundColor(Colors.pink);
		}
		Animatable.initializeRegistryWithDefinitions(getAvailableAnimations());
	}

	public render() {
		const store = reduxStage.store;
		const persistor = reduxStage.persistor;
		return (
			<ApolloProvider client={AppsyncClient}>
				<Rehydrated>
					<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
							<RootContainer />
						</PersistGate>
					</Provider>
				</Rehydrated>
			</ApolloProvider>
		);
	}
}
