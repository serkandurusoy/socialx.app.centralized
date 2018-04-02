import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: Sizes.smartHorizontalScale(25),
		flex: 1,
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
