import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

export const USER_MEDIA_THUMB_SIZE = Sizes.getThumbSize();

const style: any = {
	container: {
		backgroundColor: Colors.white,
		flex: 1,
	},
	titleBarRightButton: {
		marginRight: Sizes.smartHorizontalScale(13),
	},
	titleBarLeftButton: {
		marginLeft: Sizes.smartHorizontalScale(13),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(25),
		color: Colors.white,
	},
	gridMediaThumb: {
		width: USER_MEDIA_THUMB_SIZE,
		height: USER_MEDIA_THUMB_SIZE,
		borderBottomWidth: 2,
		borderColor: Colors.white,
	},
	centerGridItem: {
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderColor: Colors.white,
	},
};

export default StyleSheet.create(style);
