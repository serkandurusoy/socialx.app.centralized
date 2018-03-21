import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(25),
		marginHorizontal: Sizes.smartHorizontalScale(25),
		height: Sizes.smartVerticalScale(60),
		width: Sizes.smartHorizontalScale(40),
	},
	label: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(10),
	},
	iconStyle: {
		width: Sizes.smartHorizontalScale(32),
		height: Sizes.smartHorizontalScale(32),
	},
};

export default StyleSheet.create(style);
