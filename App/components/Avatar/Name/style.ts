import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../theme';

const style: any = {
	fullName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		paddingTop: Sizes.smartVerticalScale(10),
		paddingBottom: Sizes.smartVerticalScale(4),
		textAlign: 'center',
	},
	username: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
		textAlign: 'center',
	},
};

export default StyleSheet.create(style);
