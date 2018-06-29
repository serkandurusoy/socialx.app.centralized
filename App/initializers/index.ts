import {languageInit} from 'utilities';

import Amplify from 'aws-amplify';
import {awsconfig} from 'configuration';

import { Client } from 'bugsnag-react-native';
const bugsnag = new Client();

export default async () => {
	removeConsoleLogs();

	// amplify configurations
	Amplify.configure(awsconfig);

	// init I18n language set
	await languageInit();
};

// const overwriteConsoleLog = () => {
// 	const log = console.log;
// 	console.log = (...args) => {
// 		if (__DEV__) {
// 			log(args);
// 		} else {
// 			bugsnag.notify(new Error(args));
// 		}
// 	}
// }

const removeConsoleLogs = () => {
	if (!__DEV__) {
		// tslint:disable-next-line
		console.log = () => {};
	}
};
