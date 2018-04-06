import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../theme';

const style: any = {
	background: {
		backgroundColor: Colors.transparent,
	},
	backgroundSelected: {
		backgroundColor: Colors.pink,
		borderRadius: Sizes.smartHorizontalScale(32),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		paddingHorizontal: Sizes.smartHorizontalScale(30),
		paddingVertical: Sizes.smartVerticalScale(8),
	},
	textSelected: {
		color: Colors.white,
	},
	textUnselected: {
		color: Colors.postFullName,
		opacity: 0.5,
	},
};

export default StyleSheet.create(style);
