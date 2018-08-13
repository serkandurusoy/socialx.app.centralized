import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const USER_AVATAR_SIZE = Sizes.smartHorizontalScale(40);
export const SHARE_SECTION_HEIGHT = Sizes.smartVerticalScale(80);
export const SHARE_SECTION_BORDER_WIDTH = Sizes.smartHorizontalScale(8);

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	contentContainer: {
		backgroundColor: Colors.white,
	},
	shareMessageContainer: {
		width: '100%',
		height: SHARE_SECTION_HEIGHT,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		borderBottomColor: Colors.geyser,
		borderBottomWidth: SHARE_SECTION_BORDER_WIDTH,
	},
	avatarImage: {
		width: USER_AVATAR_SIZE,
		height: USER_AVATAR_SIZE,
		borderRadius: USER_AVATAR_SIZE / 2,
	},
	shareTextContainer: {
		width: '100%',
	},
	shareTextPlaceholder: {
		...Fonts.centuryGothic,
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.cadetBlue,
		paddingHorizontal: Sizes.smartHorizontalScale(13),
	},
	wallPostContainer: {
		paddingTop: Sizes.smartVerticalScale(25),
		borderBottomColor: Colors.geyser,
		borderBottomWidth: Sizes.smartHorizontalScale(8),
	},
	noPostsContainer: {
		paddingTop: Sizes.smartVerticalScale(30),
		alignItems: 'center',
	},
	noPostsText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(20),
		textAlign: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
	bottomLoadingContainer: {
		paddingVertical: Sizes.smartVerticalScale(20),
	},
};

export default StyleSheet.create(style);
