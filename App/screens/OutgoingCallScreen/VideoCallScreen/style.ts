import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

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
		alignItems: 'flex-end',
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
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	callButton: {
		padding: Sizes.smartHorizontalScale(7),
	},
	localCameraView: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	callText: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.white,
		paddingTop: Sizes.smartVerticalScale(10),
		paddingBottom: Sizes.smartVerticalScale(16),
		textAlign: 'center',
	},
	cameraToggleContainer: {
		paddingTop: Sizes.smartVerticalScale(30),
	},
};

export default StyleSheet.create(style);
