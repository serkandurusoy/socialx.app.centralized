import {Colors, Fonts, Sizes} from '../../theme/';

import {Platform, StyleSheet} from 'react-native';

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
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		color: Colors.darkGray,
		flex: 1,
		maxHeight: '100%',
	},
	textInputNormal: {
		paddingVertical: Platform.OS === 'android' ? Sizes.smartHorizontalScale(10) : Sizes.smartHorizontalScale(16),
	},
	textInputSmall: {
		paddingVertical: 0,
		height: Sizes.smartHorizontalScale(29),
	},
	textInputLarge: {
		paddingVertical: 0,
		height: Sizes.smartHorizontalScale(60),
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconContainerNormal: {
		width: Sizes.smartHorizontalScale(40),
	},
	iconContainerSmall: {
		width: Sizes.smartHorizontalScale(20),
	},
	iconContainerLarge: {
		width: Sizes.smartHorizontalScale(50),
	},
	disabledInput: {
		opacity: 0.5,
	},
	cancelButton: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
	cancelButtonText: {
		...Fonts.centuryGothic,
		fontSize: INPUT_FONT_SIZE,
	},
};

export default StyleSheet.create(style);
