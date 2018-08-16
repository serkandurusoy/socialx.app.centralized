import {StyleSheet} from 'react-native';
import {Colors, Sizes} from 'theme';

export const USER_MEDIA_THUMB_SIZE = Sizes.getThumbSize();
const ICON_SIZE = Sizes.smartHorizontalScale(25);

const style: any = {
	container: {
		backgroundColor: Colors.white,
		flex: 1,
	},
	titleBarRightButton: {
		marginRight: Sizes.smartHorizontalScale(13),
	},
	titleBarLeftButton: {
		marginLeft: Sizes.smartHorizontalScale(10),
	},
	icon: {
		width: ICON_SIZE,
		height: ICON_SIZE,
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
