import Amplify from 'aws-amplify';
import {Client, Configuration} from 'bugsnag-react-native';
import moment from 'moment';
import {Platform} from 'react-native';
import {LocaleConfig} from 'react-native-calendars';
import DeviceInfo from 'react-native-device-info';

import {awsconfig} from 'configuration';
import {OS_TYPES} from 'consts';
import {languageInit} from 'utilities';

export default async () => {
	removeConsoleLogs();

	// amplify configurations
	Amplify.configure(awsconfig);

	calendarLocaleConfig();

	momentLocaleConfig();

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

const calendarLocaleConfig = () => {
	LocaleConfig.locales[''].dayNamesShort = LocaleConfig.locales[''].dayNamesShort.map((value: string) =>
		value.toUpperCase(),
	);
};

const momentLocaleConfig = () => {
	moment.updateLocale('en', {
		relativeTime: {
			future: 'in %s',
			past: '%s',
			s: '%ds',
			ss: '%ds',
			m: '%dm',
			mm: '%dm',
			h: '%dh',
			hh: '%dh',
			d: '%dd',
			dd: '%dd',
			M: '%dmonth',
			MM: '%dmonths',
			y: '%dyear',
			yy: '%dy',
		},
	});
}

const removeConsoleLogs = () => {
	if (!__DEV__) {
		// tslint:disable-next-line
		console.log = () => {
		};
	}
};

const computeAppVersion = () => {
	const packageVersion = DeviceInfo.getVersion();
	const computedVersion = parseInt(packageVersion.replace(/\D/g, ''), 10);
	return Platform.OS === OS_TYPES.Android ? computedVersion * 10 + 2 : computedVersion * 10 + 1;
};

let BugSnag: Client | null = null;
if (!__DEV__) {
	const bugSnagConf = new Configuration();
	bugSnagConf.appVersion = computeAppVersion().toString();
	bugSnagConf.autoCaptureSessions = false;
	BugSnag = new Client(bugSnagConf);
	BugSnag.startSession();
}

// only use this helper method because in dev. mode BugSnag is not initialized to avoid unnecessary reports
export const snagReport = (message: string) => {
	if (BugSnag) {
		BugSnag.notify(new Error(message));
	}
};
