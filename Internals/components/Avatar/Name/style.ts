import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

export const CONTAINER_HEIGHT_FULL = Sizes.smartHorizontalScale(60);
export const CONTAINER_HEIGHT_NAME_ONLY = Sizes.smartHorizontalScale(40);

const style: any = {
	container: {
		height: CONTAINER_HEIGHT_FULL,
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
