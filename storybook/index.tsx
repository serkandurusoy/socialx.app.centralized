import {configure, getStorybookUI} from '@storybook/react-native';
import {Root} from 'native-base';
import React, {Component} from 'react';
import SplashScreen from 'react-native-smart-splash-screen';
import {AppRegistry, Platform} from 'react-native';

configure(() => require('./stories'));

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUIRoot = getStorybookUI({port: 7007, onDeviceUI: true});

// react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
// https://github.com/storybooks/storybook/issues/2081
// eslint-disable-next-line react/prefer-stateless-function
class StorybookUIHMRRoot extends Component {
	public componentDidMount(): void {
		SplashScreen.close({
			animationType: SplashScreen.animationType.fade,
			duration: 1000,
			delay: 100,
		});
	}

	public render() {
		return (
			<Root>
				<StorybookUIRoot/>
			</Root>
		);
	}
}

AppRegistry.registerComponent('socialx_2018', () => StorybookUIHMRRoot);
export default StorybookUIHMRRoot;
