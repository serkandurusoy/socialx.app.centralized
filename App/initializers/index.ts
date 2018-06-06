import {languageInit} from 'utilities';

import Amplify from 'aws-amplify';
import {awsconfig} from 'configuration';

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
