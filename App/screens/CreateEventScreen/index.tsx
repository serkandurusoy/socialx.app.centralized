import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import CreateEventScreenComponent from './screen';

export interface ICreateEventScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class CreateEventScreen extends Component<ICreateEventScreenProps, any> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'ADD EVENT',
	};

	public componentDidMount() {
		// TODO: in the end delete this!
		SplashScreen.close({
			animationType: SplashScreen.animationType.fade,
			duration: 1000,
			delay: 100,
		});
	}

	public render() {
		return <CreateEventScreenComponent initialDate={new Date()} />;
	}
}
