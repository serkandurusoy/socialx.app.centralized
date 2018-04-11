import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../../theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(50);
const REPLY_AVATAR_SIZE = Sizes.smartHorizontalScale(30);

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
		flex: 1,
		paddingLeft: Sizes.smartHorizontalScale(10),
	},
	commentBackground: {
		borderRadius: Sizes.smartHorizontalScale(20),
		backgroundColor: Colors.gallery,
		paddingHorizontal: Sizes.smartHorizontalScale(12),
		paddingVertical: Sizes.smartHorizontalScale(8),
	},
	likesContainer: {
		width: '100%',
		zIndex: 1,
		elevation: 3,
		marginTop: Sizes.smartHorizontalScale(-5),
		alignItems: 'flex-end',
	},
	likesBorder: {
		flexDirection: 'row',
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartHorizontalScale(15),
		borderColor: Colors.dustWhite,
		borderWidth: 1,
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		marginRight: Sizes.smartHorizontalScale(5),
	},
	numberOfLikes: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postText,
		paddingLeft: Sizes.smartHorizontalScale(5),
	},
	userFullName: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		lineHeight: Sizes.smartHorizontalScale(20),
	},
	commentText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		lineHeight: Sizes.smartHorizontalScale(20),
	},
	actionsContainer: {
		flexDirection: 'row',
	},
	actionButtonText: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
		lineHeight: Sizes.smartHorizontalScale(24),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
	timestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
		lineHeight: Sizes.smartHorizontalScale(24),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
	replyEntry: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		overflow: 'hidden',
		paddingVertical: Sizes.smartHorizontalScale(5),
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
		maxWidth: '50%',
	},
	viewMoreReplies: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		paddingVertical: Sizes.smartHorizontalScale(5),
	},
};

export default StyleSheet.create(style);
