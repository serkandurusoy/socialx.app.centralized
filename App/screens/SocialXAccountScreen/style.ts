import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(26),
	},
	buttonContainer: {
		paddingBottom: Sizes.smartVerticalScale(28),
	},
	accountTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(60),
		color: Colors.postFullName,
		paddingTop: Sizes.smartVerticalScale(32),
		paddingBottom: Sizes.smartVerticalScale(17),
	},
};

export default StyleSheet.create(style);
