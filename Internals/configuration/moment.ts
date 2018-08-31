// MIGRATION: how does this even work????
import moment from 'moment';

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
