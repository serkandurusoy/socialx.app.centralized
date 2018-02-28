import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		flex: 1,
		paddingHorizontal: Sizes.smartHorizontalScale(28),
		paddingTop: Sizes.smartVerticalScale(100),
		alignItems: 'center',
		backgroundColor: Colors.pink,
	},
	unlockImage: {
		width: Sizes.smartHorizontalScale(124),
		height: Sizes.smartHorizontalScale(124),
		marginBottom: Sizes.smartVerticalScale(32),
	},
	uploadKeyText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(22),
		lineHeight: Sizes.smartHorizontalScale(36),
		color: Colors.white,
	},
	uploadDescriptionText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.white,
		paddingTop: Sizes.smartVerticalScale(40),
		textAlign: 'center',
	},
	chooseKeyButton: {
		position: 'absolute',
		bottom: Sizes.smartVerticalScale(48),
	},
};

export default StyleSheet.create(style);
