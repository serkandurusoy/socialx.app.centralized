import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';

// refactoring
import RootContainer, {AppsyncClient, Rehydrated} from './containers/RootContainer';
import createStore from './reducers';
import {Colors} from './theme';

const store = createStore();

export default class App extends Component<{}, {}> {

	public componentDidMount(): void {
		StatusBar.setBackgroundColor(Colors.pink);
		SplashScreen.hide();
	}

	public render() {
		return (
			<ApolloProvider client={AppsyncClient}>
				<Rehydrated>
					<Provider store={store}>
						<RootContainer/>
					</Provider>
				</Rehydrated>
			</ApolloProvider>
		);
	}
}
