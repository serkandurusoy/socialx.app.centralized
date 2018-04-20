import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../theme';

const INPUT_FONT_SIZE = Sizes.smartHorizontalScale(16);
const INPUT_VERTICAL_PADDING = Sizes.smartHorizontalScale(10);
const INPUT_CONTAINER_VERTICAL_PADDING = Sizes.smartVerticalScale(5);
const TOTAL_INPUT_HEIGHT = 2 * INPUT_VERTICAL_PADDING + INPUT_FONT_SIZE + 2 * INPUT_CONTAINER_VERTICAL_PADDING;

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
		fontSize: INPUT_FONT_SIZE,
		color: Colors.postFullName,
		backgroundColor: Colors.dustWhite,
		borderRadius: Sizes.smartHorizontalScale(15),
		borderColor: Colors.silverSand,
		borderWidth: 1,
		paddingRight: Sizes.smartHorizontalScale(50),
		paddingLeft: Sizes.smartHorizontalScale(10),
		paddingVertical: INPUT_VERTICAL_PADDING,
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
