import '../shim.js';

import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Platform, StatusBar} from 'react-native';
import Orientation from 'react-native-orientation';

import * as Animatable from 'react-native-animatable';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// refactoring
import { Animations } from 'configuration/animations';
import {OS_TYPES} from 'consts';
import {Colors} from 'theme';

import {AppsyncClient, Rehydrated} from 'backend/appsync';
import RootContainer from './containers/RootContainer';

import createStore from './reducers/createStore';

// TODO: find a proper suitable initializers invoker that is high level and equivalent of this
import Init from './initializers';
// TODO: @serkan ask @jake why here, why not in the component?
// TODO: besides this won't always work because languageInit is async so it should be "await"ed in componentDidMount
Init();

const { store, persistor } = createStore();

export default class App extends Component<{}, {}> {
	public componentDidMount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			StatusBar.setBackgroundColor(Colors.pink);
		}
		Animatable.initializeRegistryWithDefinitions(Animations);
		Orientation.lockToPortrait();
	}

	public render() {
		return (
			<ApolloProvider client={AppsyncClient}>
				{/* // TODO: @serkan ask @jake why not use PersistGate? */}
				{/* // TODO: and looks like aws-appsync-react is an "exotic" module, not officially installed from npm */}
				<Rehydrated>
					<Provider store={store}>
						<RootContainer />
					</Provider>
				</Rehydrated>
			</ApolloProvider>
		);
	}
}
