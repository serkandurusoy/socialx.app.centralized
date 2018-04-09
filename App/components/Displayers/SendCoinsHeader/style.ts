import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../theme';

const CURRENCY_ICON_SIZE = Sizes.smartHorizontalScale(50);

const style: any = {
	container: {
		backgroundColor: Colors.white,
		shadowColor: Colors.blackWithAlpha(0.17),
		shadowOffset: {width: 1, height: 26},
		shadowOpacity: 1,
		shadowRadius: 22,
		zIndex: 1,
		borderRadius: Sizes.smartHorizontalScale(12),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 3,
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRightColor: Colors.mercury,
		borderRightWidth: Sizes.smartHorizontalScale(1),
		flex: 1,
	},
	coinIcon: {
		width: CURRENCY_ICON_SIZE,
		height: CURRENCY_ICON_SIZE,
		marginRight: Sizes.smartHorizontalScale(10),
		marginTop: Sizes.smartVerticalScale(12),
		marginBottom: Sizes.smartVerticalScale(15),
		marginLeft: Sizes.smartVerticalScale(10),
	},
	dropDownArrow: {
		justifyContent: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(11),
	},
	coinTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(24),
		lineHeight: Sizes.smartHorizontalScale(29),
		color: Colors.postFullName,
	},
	coinDetails: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.tundora,
		opacity: 0.6,
	},
};

export default StyleSheet.create(style);
