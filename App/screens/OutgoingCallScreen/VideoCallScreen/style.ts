import {StyleSheet} from 'react-native';
import {Colors, colorWithAlpha, Fonts, Sizes} from 'theme/';

const BUTTON_SIZE = Sizes.smartHorizontalScale(52);

const style: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.midnight,
	},
	safeView: {
		flex: 1,
	},
	safeAreaContent: {
		paddingHorizontal: Sizes.smartHorizontalScale(30),
		flex: 1,
		alignItems: 'center',
	},
	topContainer: {
		alignItems: 'center',
		flex: 1,
		width: '100%',
	},
	rejectButton: {
		width: BUTTON_SIZE,
		height: BUTTON_SIZE,
		borderRadius: BUTTON_SIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.monza,
		transform: [{rotate: '135deg'}],
	},
	rejectIcon: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.white,
		lineHeight: BUTTON_SIZE,
	},
	callButtonsContainer: {
		width: '100%',
		alignItems: 'flex-end',
		marginBottom: Sizes.smartVerticalScale(60),
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	callButton: {
		padding: Sizes.smartHorizontalScale(7),
	},
};

export default StyleSheet.create(style);
