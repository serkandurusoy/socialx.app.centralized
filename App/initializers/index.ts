import Amplify from 'aws-amplify';
import { Client, Configuration } from 'bugsnag-react-native';

import {awsconfig} from 'configuration';
import {languageInit} from 'utilities';

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

const bugSnagConf = new Configuration();
export const BugSnag = new Client(bugSnagConf);
