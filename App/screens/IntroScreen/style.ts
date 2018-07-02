import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const CIRCLE_BUTTON_SIZE = Sizes.smartHorizontalScale(40);

const style: any = {
	buttonCircle: {
		width: CIRCLE_BUTTON_SIZE,
		height: CIRCLE_BUTTON_SIZE,
		borderRadius: CIRCLE_BUTTON_SIZE / 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white,
	},
	pinkIcon: {
		color: Colors.pink,
		fontSize: Sizes.smartHorizontalScale(30),
		lineHeight: Sizes.smartHorizontalScale(30),
	},
	doneIcon: {
		color: Colors.white,
		fontSize: 24,
	},
	skipButton: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(18),
		color: Colors.white,
	},
};

export default StyleSheet.create(style);
