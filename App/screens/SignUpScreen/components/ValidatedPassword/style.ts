import {StyleSheet} from 'react-native';
import {Colors, colorWithAlpha, Fonts, Sizes} from 'theme/';

const style: any = {
	errorContainer: {
		backgroundColor: colorWithAlpha(Colors.red, 0.2),
		borderColor: Colors.red,
		borderWidth: Sizes.smartHorizontalScale(1),
		borderRadius: Sizes.smartHorizontalScale(5),
		marginHorizontal: '5%',
		marginVertical: Sizes.smartVerticalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		paddingVertical: Sizes.smartVerticalScale(5),
		width: '90%',
	},
	errorText: {
		...Fonts.centuryGothic,
		color: Colors.shuttleGray,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(18),
	},
	boldText: {
		...Fonts.centuryGothicBold,
	},
};

export default StyleSheet.create(style);
