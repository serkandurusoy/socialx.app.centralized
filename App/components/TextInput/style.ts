import {Colors, Fonts, Sizes} from '../../theme/';

import {Platform, StyleSheet} from 'react-native';

export const ICON_HEIGHT = Sizes.smartHorizontalScale(30);
const INPUT_FONT_SIZE = Sizes.smartHorizontalScale(14);

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
		borderWidth: Sizes.smartHorizontalScale(2),
		height: '100%',
	},
	textInput: {
		...Fonts.centuryGothic,
		fontSize: INPUT_FONT_SIZE,
		paddingVertical: Platform.OS === 'android' ? Sizes.smartHorizontalScale(10) : Sizes.smartHorizontalScale(16),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		color: Colors.darkGray,
		flex: 1,
		maxHeight: '100%',
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: Sizes.smartHorizontalScale(40),
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
