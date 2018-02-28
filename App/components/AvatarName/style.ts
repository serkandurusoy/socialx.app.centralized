import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const style: any = {
	fullName: {
		...Fonts.centuryGothic,
		color: Colors.userAvatarFullName,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		paddingTop: Sizes.smartVerticalScale(10),
		paddingBottom: Sizes.smartVerticalScale(4),
	},
	username: {
		...Fonts.centuryGothic,
		color: Colors.postText,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
	},
};

export default StyleSheet.create(style);
