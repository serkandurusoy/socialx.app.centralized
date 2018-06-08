import {StyleSheet} from 'react-native';

import {LOCAL_VIDEO_STREAM} from 'consts';
import {Colors, Fonts, Sizes} from 'theme';

const BUTTON_SIZE = Sizes.smartHorizontalScale(52);
const LOCAL_CAMERA_ASPECT_RATIO = LOCAL_VIDEO_STREAM.width / LOCAL_VIDEO_STREAM.height;
const LOCAL_CAMERA_VIEW_WIDTH = Sizes.smartHorizontalScale(90);
const LOCAL_CAMERA_VIEW_HEIGHT = Math.round(LOCAL_CAMERA_VIEW_WIDTH * LOCAL_CAMERA_ASPECT_RATIO);

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
		justifyContent: 'space-between',
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
	remoteVideoStream: {
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
	ownCameraStreamContainer: {
		width: '100%',
		paddingBottom: Sizes.smartVerticalScale(30),
	},
	ownCameraRadius: {
		borderRadius: Sizes.smartHorizontalScale(10),
		overflow: 'hidden',
		width: LOCAL_CAMERA_VIEW_WIDTH,
		height: LOCAL_CAMERA_VIEW_HEIGHT,
	},
	localCameraView: {
		width: '100%',
		height: '100%',
	},
};

export default StyleSheet.create(style);
