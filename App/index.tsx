import '../shim.js';

import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Platform, StatusBar} from 'react-native';
import Orientation from 'react-native-orientation';

import * as Animatable from 'react-native-animatable';
import {Provider} from 'react-redux';

// refactoring
import { Animations } from 'configuration/animations';
import {OS_TYPES} from 'consts';
import {Colors} from 'theme';

import {AppsyncClient, Rehydrated} from 'backend/appsync';
import RootContainer from './containers/RootContainer';

import createStore from './reducers';

import Init from './initializers';

const store = createStore();

export default class App extends Component<{}, {}> {
	public async componentDidMount(): Promise<void> {
		if (Platform.OS === OS_TYPES.Android) {
			StatusBar.setBackgroundColor(Colors.pink);
		}
		Animatable.initializeRegistryWithDefinitions(Animations);
		Orientation.lockToPortrait();
		await Init();
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
