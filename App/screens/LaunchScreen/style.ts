import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		flex: 1,
		alignItems: 'center',
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	topPaddingContainer: {
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(61),
		paddingBottom: Sizes.smartVerticalScale(108),
		paddingHorizontal: Sizes.smartHorizontalScale(33),
	},
	socialxGradient: {
		height: Sizes.smartVerticalScale(37),
		width: Sizes.smartHorizontalScale(166),
	},
	getRewardedGradient: {
		height: Sizes.smartVerticalScale(166),
		width: Sizes.smartHorizontalScale(320),
	},
	description: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.grayText,
		paddingTop: Sizes.smartVerticalScale(30),
		paddingBottom: Sizes.smartVerticalScale(30),
	},
	bottomPaddingContainer: {
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(27),
	},
	signUpTopPadding: {
		paddingTop: Sizes.smartVerticalScale(19),
	},
};

export default StyleSheet.create(style);
