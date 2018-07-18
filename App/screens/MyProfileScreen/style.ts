import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

export const USER_MEDIA_THUMB_SIZE = Sizes.getThumbSize();
export const HEADER_TOP_PADDING = Sizes.smartVerticalScale(19);

const style: any = {
	container: {
		backgroundColor: Colors.white,
		flex: 1,
	},
	scrollContainer: {
		width: '100%',
		backgroundColor: Colors.white,
	},
	topContainer: {
		paddingTop: HEADER_TOP_PADDING,
	},
	aboutMeContainer: {
		width: '100%',
		borderTopColor: Colors.dustWhite,
		borderTopWidth: Sizes.smartVerticalScale(1),
		paddingTop: Sizes.smartVerticalScale(20),
		paddingLeft: Sizes.smartHorizontalScale(17),
		paddingRight: Sizes.smartHorizontalScale(28),
	},
	aboutMeTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		paddingBottom: Sizes.smartVerticalScale(23),
	},
	aboutMeText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(23),
		color: Colors.postText,
	},
	recentPostsTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		paddingTop: Sizes.smartVerticalScale(23),
		paddingBottom: Sizes.smartVerticalScale(27),
		paddingLeft: Sizes.smartHorizontalScale(17),
	},
	wallPostContainer: {
		paddingBottom: Sizes.smartVerticalScale(25),
	},
	gridPhotosContainer: {
		width: '100%',
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
	titleBarRightButton: {
		marginRight: Sizes.smartHorizontalScale(10),
	},
	gridMediaThumb: {
		width: USER_MEDIA_THUMB_SIZE,
		height: USER_MEDIA_THUMB_SIZE,
	},
};

export default StyleSheet.create(style);
