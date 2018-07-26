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
	gridMediaThumb: {
		width: USER_MEDIA_THUMB_SIZE,
		height: USER_MEDIA_THUMB_SIZE,
	},
};

export default StyleSheet.create(style);
