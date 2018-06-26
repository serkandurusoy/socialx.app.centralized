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
	},
	buttonNext: {
		backgroundColor: Colors.amethyst,
	},
	buttonDone: {
		backgroundColor: Colors.blueGem,
	},
	whiteIcon: {
		color: Colors.white,
		fontSize: 24,
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
