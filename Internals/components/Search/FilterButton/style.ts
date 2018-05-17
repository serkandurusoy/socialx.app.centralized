import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	background: {
		backgroundColor: Colors.white,
	},
	backgroundSelected: {
		backgroundColor: Colors.searchFilterButtonSelectedBg,
	},
	containerPadding: {
		paddingHorizontal: Sizes.smartHorizontalScale(39),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		paddingVertical: Sizes.smartVerticalScale(15),
	},
	textSelected: {
		color: Colors.postHour,
	},
	textUnselected: {
		color: Colors.searchFilterButtonUnselectedText,
	},
};

export default StyleSheet.create(style);
