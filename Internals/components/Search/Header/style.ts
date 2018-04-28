import {Platform, StyleSheet} from 'react-native';
import {Sizes} from 'theme';

const style: any = {
	headerContainer: {
		paddingBottom: Sizes.smartVerticalScale(7),
		paddingTop: Sizes.smartVerticalScale(3),
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(8),
	},
};

export default StyleSheet.create(style);
