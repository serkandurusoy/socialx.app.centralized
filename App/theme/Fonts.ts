import {Platform} from 'react-native';

const FontsStyles = {
	centuryGothic: {
		fontFamily: Platform.OS === 'android' ? 'century_gothic' : 'CenturyGothic',
		fontWeight: 'normal',
		fontStyle: 'normal',
	},
	centuryGothicBold: {
		fontFamily: Platform.OS === 'android' ? 'century_gothic_bold' : 'CenturyGothic-Bold',
		fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
		fontStyle: 'normal',
	},
	centuryGothicItalic: {
		fontFamily: Platform.OS === 'android' ? 'century_gothic_italic' : 'CenturyGothic-Italic',
		fontWeight: 'normal',
		fontStyle: Platform.OS === 'android' ? 'normal' : 'italic',
	},
	centuryGothicBoldItalic: {
		fontFamily: Platform.OS === 'android' ? 'century_gothic_bold_italic' : 'CenturyGothic-BoldItalic',
		fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
		fontStyle: Platform.OS === 'android' ? 'normal' : 'italic',
	},
};

export default FontsStyles;
