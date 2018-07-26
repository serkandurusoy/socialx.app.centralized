import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	background: {
		backgroundColor: Colors.white,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
		borderBottomColor: Colors.iron2,
	},
	backgroundSelected: {
		backgroundColor: Colors.white,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
		borderBottomColor: Colors.pink,
	},
	containerPadding: {
		paddingHorizontal: Sizes.smartHorizontalScale(39),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		paddingVertical: Sizes.smartVerticalScale(15),
		textAlign: 'center',
	},
	textSelected: {
		color: Colors.pink,
	},
	textUnselected: {
		color: Colors.background,
	},
};

export default StyleSheet.create(style);
