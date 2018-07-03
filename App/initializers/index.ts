import Amplify from 'aws-amplify';
import { Client, Configuration } from 'bugsnag-react-native';

import {awsconfig} from 'configuration';
import {languageInit} from 'utilities';

export default async () => {
	removeConsoleLogs();

	// amplify configurations
	Amplify.configure(awsconfig);

	// init I18n language set
	await languageInit();
};

const removeConsoleLogs = () => {
	if (!__DEV__) {
		// tslint:disable-next-line
		console.log = () => {};
	}
};

const bugSnagConf = new Configuration();
export const BugSnag = new Client(bugSnagConf);
