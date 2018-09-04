// MIGRATION: can be imported from '@aws-amplify/core' but consult Serkan, we actually don't need a library because
// we are doing very minimal i18n, so we can use basic json mapping or even store the dictionary in redux!

import {I18n} from 'aws-amplify';
import React from 'react';
import {AsyncStorage} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {compose, hoistStatics, withProps} from 'recompose';

import dictionary_en from './dictionary_en';
import dictionary_es from './dictionary_es';

export const LANGUAGE_EN = 'en';
export const LANGUAGE_ES = 'es';

// const SUPPORTED_LANGUAGES = [LANGUAGE_EN, LANGUAGE_ES];
const SUPPORTED_LANGUAGES = [LANGUAGE_EN]; // until we finished with translations only enable english

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

export interface IWithTranslationProps {
	getText: (value: string, ...args: any[]) => string;
}

export const withTranslations = compose(
	hoistStatics(
		withProps(() => ({
			getText: (value: string, ...args: any[]) => getText(value, ...args),
		})),
	),
);

export const withTranslationsSimple = compose(
	withProps(() => ({
		getText: (value: string, ...args: any[]) => getText(value, ...args),
	})),
);

interface ITranslatedProps {
	getText: (value: string, ...args: any[]) => string;
}

export const WithTranslations: React.SFC<{children(props: ITranslatedProps): JSX.Element}> = ({children}) =>
	children({
		getText: (value: string, ...args: any[]) => getText(value, ...args),
	});
