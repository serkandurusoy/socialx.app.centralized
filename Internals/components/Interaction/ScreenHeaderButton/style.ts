import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const HEADER_BUTTON_SIZE = Sizes.smartHorizontalScale(25);

const style: any = {
	iconContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(8),
		marginHorizontal: Sizes.smartHorizontalScale(15),
	},
	headerButtonIcon: {
		width: HEADER_BUTTON_SIZE,
		height: HEADER_BUTTON_SIZE,
	},
};

export default StyleSheet.create(style);
