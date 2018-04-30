import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		backgroundColor: 'lime',
		width: '100%',
		height: Sizes.smartVerticalScale(150),
	},
	videoObject: {
		width: '100%',
		height: '100%',
	},
	controlsView: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	playIcon: {
		fontSize: Sizes.smartHorizontalScale(50),
		lineHeight: Sizes.smartHorizontalScale(50),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		color: Colors.white,
	},
	muteButton: {
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
	muteIcon: {
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(29),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		color: Colors.white,
	},
};

export default StyleSheet.create(style);
