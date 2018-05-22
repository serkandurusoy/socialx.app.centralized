import {StyleSheet} from 'react-native';
import {Colors, Sizes} from 'theme';

const style: any = {
	headerContainer: {
		paddingBottom: Sizes.smartVerticalScale(7),
		paddingTop: Sizes.smartVerticalScale(3),
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(8),
		alignItems: 'center',
	},
	searchIcon: {
		fontSize: Sizes.smartHorizontalScale(25),
		color: Colors.white,
	},
};

export default StyleSheet.create(style);
