import {Platform, StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const INPUT_MIN_HEIGHT = Sizes.smartHorizontalScale(35);
const INPUT_CONTAINER_VERTICAL_PADDING = Sizes.smartVerticalScale(5);
const TOTAL_INPUT_HEIGHT = INPUT_MIN_HEIGHT + 2 * INPUT_CONTAINER_VERTICAL_PADDING;

const style: any = {
	inputContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		paddingVertical: INPUT_CONTAINER_VERTICAL_PADDING,
		borderTopColor: Colors.silverSand,
		borderTopWidth: 1,
		maxHeight: Sizes.smartVerticalScale(110),
	},
	textInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		backgroundColor: Colors.dustWhite,
		borderRadius: Sizes.smartHorizontalScale(15),
		borderColor: Colors.silverSand,
		borderWidth: 1,
		paddingRight: Sizes.smartHorizontalScale(50),
		paddingLeft: Sizes.smartHorizontalScale(10),
		minHeight: INPUT_MIN_HEIGHT,
		paddingVertical: 0, // we need this for Android
	},
	sendButtonContainer: {
		height: TOTAL_INPUT_HEIGHT,
		position: 'absolute',
		right: Sizes.smartHorizontalScale(10),
		justifyContent: 'center',
		bottom: 0,
	},
	sendButton: {
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
};

export default StyleSheet.create(style);
