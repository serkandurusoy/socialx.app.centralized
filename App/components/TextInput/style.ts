import {Colors, Fonts, Sizes} from '../../theme/';

import {Platform, StyleSheet} from 'react-native';

export const ICON_HEIGHT = Sizes.smartHorizontalScale(22);
const INPUT_FONT_SIZE = Sizes.smartHorizontalScale(14);
const PADDING_TEXT_DIFF = (ICON_HEIGHT - INPUT_FONT_SIZE) / 2;

const style: any = {
	container: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
	},
	inputContainer: {
		flexDirection: 'row',
		flex: 1,
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartHorizontalScale(6),
		borderColor: Colors.pink,
		borderWidth: Sizes.smartHorizontalScale(2),
	},
	textInput: {
		...Fonts.centuryGothic,
		fontSize: INPUT_FONT_SIZE,
		paddingVertical: Platform.OS === 'android' ? 0 : Sizes.smartHorizontalScale(10) + PADDING_TEXT_DIFF,
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		color: Colors.darkGray,
		flex: 1,
	},
	icon: {
		paddingVertical: Sizes.smartHorizontalScale(10),
		paddingLeft: Sizes.smartHorizontalScale(16),
	},
	disabledInput: {
		opacity: 0.5,
	},
	cancelButton: {
		paddingVertical: Sizes.smartHorizontalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
	cancelButtonText: {
		...Fonts.centuryGothic,
		fontSize: INPUT_FONT_SIZE,
	},
};

export default StyleSheet.create(style);
