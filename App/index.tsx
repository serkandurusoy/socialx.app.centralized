import '../shim.js';

import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Platform, StatusBar} from 'react-native';
import Orientation from 'react-native-orientation';

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

// TODO: find a proper suitable initilizers invoker that is high level and equivalent of this
import Init from './initializers';
Init();

const reduxStage = createStore();

export default class App extends Component<{}, {}> {
	public componentDidMount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			StatusBar.setBackgroundColor(Colors.pink);
		}
		Animatable.initializeRegistryWithDefinitions(getAvailableAnimations());
		Orientation.lockToPortrait();
	}

	public render() {
		const store = reduxStage.store;
		const persistor = reduxStage.persistor;
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
