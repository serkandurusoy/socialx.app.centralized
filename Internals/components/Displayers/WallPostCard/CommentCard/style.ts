import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(40);
const REPLY_AVATAR_SIZE = Sizes.smartHorizontalScale(30);
export const DROPDOWN_ITEM_HEIGHT = Sizes.smartHorizontalScale(35);

const style: any = {
	container: {
		width: '100%',
		flexDirection: 'row',
		paddingVertical: Sizes.smartVerticalScale(5),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		justifyContent: 'flex-start',
	},
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	rightContainer: {
		flex: 0,
		flexShrink: 1,
		paddingLeft: Sizes.smartHorizontalScale(10),
	},
	commentBackground: {
		borderRadius: Sizes.smartHorizontalScale(20),
		backgroundColor: Colors.gallery,
		paddingHorizontal: Sizes.smartHorizontalScale(12),
		paddingTop: Sizes.smartHorizontalScale(8),
	},
	likesContainer: {
		position: 'absolute',
		zIndex: 1,
		elevation: 3,
	},
	likesBorder: {
		flexDirection: 'row',
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartHorizontalScale(15),
		borderColor: Colors.dustWhite,
		borderWidth: 1,
		paddingLeft: Sizes.smartHorizontalScale(4),
		paddingRight: Sizes.smartHorizontalScale(2),
		paddingVertical: Sizes.smartVerticalScale(2),
		alignItems: 'center',
	},
	numberOfLikes: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		paddingLeft: Sizes.smartHorizontalScale(2),
	},
	userFullName: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		lineHeight: Sizes.smartHorizontalScale(20),
		alignSelf: 'flex-start',
		marginBottom: Sizes.smartVerticalScale(2),
	},
	commentText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		lineHeight: Sizes.smartHorizontalScale(20),
		paddingBottom: Sizes.smartHorizontalScale(8),
	},
	actionsContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	actionButtonText: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
		lineHeight: Sizes.smartHorizontalScale(24),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	timestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
		lineHeight: Sizes.smartHorizontalScale(24),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	replyEntry: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		overflow: 'hidden',
		paddingVertical: Sizes.smartHorizontalScale(5),
	},
	replyUserContainer: {
		flexDirection: 'row',
		maxWidth: '50%',
		alignItems: 'center',
	},
	replyAvatar: {
		width: REPLY_AVATAR_SIZE,
		height: REPLY_AVATAR_SIZE,
		borderRadius: REPLY_AVATAR_SIZE / 2,
		marginRight: Sizes.smartHorizontalScale(10),
	},
	replyText: {
		flex: 1,
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		lineHeight: Sizes.smartHorizontalScale(20),
		paddingLeft: Sizes.smartHorizontalScale(8),
	},
	replyUserFullName: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		lineHeight: Sizes.smartHorizontalScale(20),
		flex: 1,
	},
	viewMoreReplies: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		paddingVertical: Sizes.smartHorizontalScale(5),
	},
	dropDownStyle: {
		borderWidth: Sizes.smartHorizontalScale(1),
		borderRadius: Sizes.smartHorizontalScale(5),
		backgroundColor: Colors.iron,
	},
	commentOption: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postFullName,
		lineHeight: DROPDOWN_ITEM_HEIGHT,
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
	iconContainer: {
		backgroundColor: Colors.pink,
		borderRadius: Sizes.smartHorizontalScale(50),
		paddingVertical: Sizes.smartHorizontalScale(1),
		paddingHorizontal: Sizes.smartHorizontalScale(4),
	},
};

export default StyleSheet.create(style);
