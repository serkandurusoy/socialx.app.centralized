import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

export const CONTAINER_HEIGHT = Sizes.smartHorizontalScale(60);

const style: any = {
	container: {
		height: CONTAINER_HEIGHT,
		paddingVertical: Sizes.smartVerticalScale(10),
		justifyContent: 'space-between',
	},
	fullName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
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
