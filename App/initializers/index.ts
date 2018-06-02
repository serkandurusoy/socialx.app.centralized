import {languageInit} from 'utilities/amplify';

export default async () => {
	// init I18n language set
	removeConsoleLogs();
	await languageInit();
};

const removeConsoleLogs = () => {
	if (!__DEV__) {
		// tslint:disable-next-line
		console.log = () => {};
	}
};
