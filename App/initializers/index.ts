import {languageInit} from 'utilities/amplify';

export default () => {
	// init I18n language set
	removeConsoleLogs();
	languageInit();
};

const removeConsoleLogs = () => {
	if (!__DEV__) {
		// tslint:disable-next-line
		console.log = () => {};
	}
};
