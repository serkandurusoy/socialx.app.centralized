import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales[''].dayNamesShort = LocaleConfig.locales[''].dayNamesShort.map((value: string) =>
	value.toUpperCase(),
);
