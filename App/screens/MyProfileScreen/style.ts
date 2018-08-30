import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const ICON_SIZE = Sizes.smartHorizontalScale(25);

const style: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.pink,
	},
	scrollContainer: {
		width: '100%',
		backgroundColor: Colors.white,
	},
	gridContainer: {
		width: '100%',
		minHeight: 1,
	},
	titleBarRightButton: {
		marginRight: Sizes.smartHorizontalScale(13),
	},
	whiteBottomView: {
		position: 'absolute',
		backgroundColor: Colors.white,
		width: '100%',
		bottom: 0,
	},
	titleBarLeftButton: {
		marginLeft: Sizes.smartHorizontalScale(10),
	},
	icon: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	},
};

export default StyleSheet.create(style);
