import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const ICON_DEFAULT_SIZE = Sizes.smartHorizontalScale(28);

const style: any = {
	container: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(5),
		marginHorizontal: Sizes.smartHorizontalScale(5),
		paddingVertical: Sizes.smartVerticalScale(5),
		alignItems: 'center',
	},
	label: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postButtonColor,
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	iconStyle: {
		width: ICON_DEFAULT_SIZE,
		height: ICON_DEFAULT_SIZE,
	},
};

export default StyleSheet.create(style);
