import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Platform, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Provider} from 'react-redux';

// refactoring
import {getAvailableAnimations} from 'configurations/animations';
import {OS_TYPES} from 'consts';
import SplashScreen from 'react-native-smart-splash-screen';
import {Colors} from 'theme';
import RootContainer, {AppsyncClient, Rehydrated} from './containers/RootContainer';
import createStore from './reducers';

const store = createStore();

export default class App extends Component<{}, {}> {
	public componentDidMount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			StatusBar.setBackgroundColor(Colors.pink);
		}
		Animatable.initializeRegistryWithDefinitions(getAvailableAnimations());
		// enable this only when adding sample screens to root navigator!
		// SplashScreen.close({
		// 	animationType: SplashScreen.animationType.fade,
		// 	duration: 1000,
		// 	delay: 100,
		// });
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
