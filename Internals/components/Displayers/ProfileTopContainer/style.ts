import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

export const TOP_PADDING = Sizes.smartVerticalScale(19);
const FRIEND_CONTAINER_V_PADDING = Sizes.smartVerticalScale(10);
// just a rough estimate below, should suffice
export const FRIEND_CONTAINER_HEIGHT = FRIEND_CONTAINER_V_PADDING * 2 + Sizes.smartVerticalScale(40);

const style: any = {
	topContainer: {
		paddingTop: TOP_PADDING,
	},
	addFriendContainer: {
		alignItems: 'center',
		paddingVertical: FRIEND_CONTAINER_V_PADDING,
	},
	noPhotosContainer: {
		paddingTop: Sizes.smartVerticalScale(30),
		alignItems: 'center',
	},
	noPhotosText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(20),
		textAlign: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
};

export default StyleSheet.create(style);
