import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Platform, StatusBar} from 'react-native';
import {Provider} from 'react-redux';

// refactoring
import {OS_TYPES} from './constants';
import RootContainer, {AppsyncClient, Rehydrated} from './containers/RootContainer';
import createStore from './reducers';
import {Colors} from './theme';

const store = createStore();

export default class App extends Component<{}, {}> {
	public componentDidMount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			StatusBar.setBackgroundColor(Colors.pink);
		}
	}

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
