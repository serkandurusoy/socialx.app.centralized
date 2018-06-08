import {StyleSheet} from 'react-native';
import {Colors, colorWithAlpha, Fonts, Sizes} from 'theme/';

const BUTTON_SIZE = Sizes.smartHorizontalScale(50);
const AVATAR_SIZE = Sizes.smartHorizontalScale(135);

const PULSE_MAX_SIZE = Sizes.smartHorizontalScale(250);

const style: any = {
	backgroundView: {
		height: '100%',
		width: '100%',
		opacity: 0.7,
		position: 'absolute',
	},
	safeView: {
		flex: 1,
	},
	safeAreaContent: {
		paddingHorizontal: Sizes.smartHorizontalScale(30),
		flex: 1,
		justifyContent: 'space-between',
	},
	topContainer: {
		alignItems: 'center',
		flex: 1,
		width: '100%',
	},
	fullName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(30),
		letterSpacing: Sizes.smartHorizontalScale(1.5),
		color: Colors.white,
		paddingTop: Sizes.smartVerticalScale(40),
		textAlign: 'center',
	},
	callText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		letterSpacing: Sizes.smartHorizontalScale(0.4),
		color: Colors.white,
		paddingTop: Sizes.smartVerticalScale(27),
		textAlign: 'center',
	},
	bottomButtons: {
		width: '100%',
		marginBottom: Sizes.smartVerticalScale(40),
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	roundButton: {
		width: BUTTON_SIZE,
		height: BUTTON_SIZE,
		borderRadius: BUTTON_SIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	answerButton: {
		backgroundColor: Colors.sushi,
	},
	rejectButton: {
		backgroundColor: Colors.monza,
	},
	answerIcon: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.white,
	},
	rejectIcon: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.white,
		transform: [{rotate: '135deg'}],
	},
	avatarPhoto: {
		position: 'absolute',
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	avatarContainer: {
		marginTop: Sizes.smartVerticalScale(40),
		width: PULSE_MAX_SIZE,
		height: PULSE_MAX_SIZE,
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarPulsing: {
		backgroundColor: colorWithAlpha(Colors.white, 0.4),
	},
};

export default StyleSheet.create(style);
