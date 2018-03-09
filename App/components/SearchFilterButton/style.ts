import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	background: {
		backgroundColor: Colors.white,
		// backgroundColor: 'lime',
	},
	backgroundSelected: {
		backgroundColor: Colors.searchFilterButtonSelectedBg,
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		paddingHorizontal: Sizes.smartHorizontalScale(39),
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
