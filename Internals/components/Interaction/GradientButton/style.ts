import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		borderRadius: Sizes.smartVerticalScale(50) / 2,
	},
	disabledButton: {
		opacity: 0.5,
	},
	innerButtonContainer: {
		backgroundColor: Colors.transparent,
	},
};

export default StyleSheet.create(style);
