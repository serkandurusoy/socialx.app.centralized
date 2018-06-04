import {languageInit} from 'utilities/amplify';

export default () => {
	removeConsoleLogs();
	// init I18n language set
	languageInit();
};

const removeConsoleLogs = () => {
	if (!__DEV__) {
		// tslint:disable-next-line
		console.log = () => {
		};
	}
};
