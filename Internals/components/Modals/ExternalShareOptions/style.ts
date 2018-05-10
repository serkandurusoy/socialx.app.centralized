import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		flex: 1,
		margin: 0,
		bottom: 0,
		alignItems: 'center',
	},
	boxContainer: {
		justifyContent: 'space-around',
		width: '90%',
		maxWidth: 450,
		position: 'absolute',
		paddingHorizontal: Sizes.smartHorizontalScale(12),
		bottom: Sizes.smartVerticalScale(20),
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartVerticalScale(8),
	},
	blurView: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	buttonLayout: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		maxWidth: '50%',
	},
	buttonIcon: {
		fontSize: Sizes.smartHorizontalScale(40),
		color: Colors.tundora,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	buttonLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postText,
		paddingBottom: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(style);
