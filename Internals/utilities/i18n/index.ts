import {I18n} from 'aws-amplify';
import {AsyncStorage} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import dictionary_en from './dictionary_en';
import dictionary_es from './dictionary_es';

export const LANGUAGE_EN = 'en';
export const LANGUAGE_ES = 'es';

const SUPPORTED_LANGUAGES = [LANGUAGE_EN, LANGUAGE_ES];

const initAllSupportedLanguages = () => {
	I18n.putVocabulariesForLanguage(LANGUAGE_EN, dictionary_en);
	I18n.putVocabulariesForLanguage(LANGUAGE_ES, dictionary_es);
};

const loadSavedLanguageOrDeviceDefault = async () => {
	// 1. if there is saved language -> set it
	// 2. otherwise read device locale and if we support that language -> set it
	// 3. use english as default for any other scenario
	const savedLang = await AsyncStorage.getItem('lang');
	const deviceLocale = DeviceInfo.getDeviceLocale()
		.substr(0, 2)
		.toLowerCase();
	const localeLanguage = SUPPORTED_LANGUAGES.indexOf(deviceLocale) >= 0 ? deviceLocale : null;
	I18n.setLanguage(savedLang || localeLanguage || LANGUAGE_EN);
};

export const languageInit = () => {
	initAllSupportedLanguages();
	loadSavedLanguageOrDeviceDefault();
};

export const setLanguage = async (lang: string) => {
	await AsyncStorage.setItem('lang', lang);
	I18n.setLanguage(lang);
};

export const getText = (key: string, ...args: any[]) => {
	let ret = I18n.get(key, (dictionary_en as any)[key]);
	if (args.length > 0) {
		for (let i = 0; i < args.length; i++) {
			ret = ret.replace('${args[' + i + ']}', args[i]);
		}
	}
	return ret;
};
