import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const SIDE_PADDING = 16;

const style: any = {
	container: {
		width: '100%',
		backgroundColor: Colors.white,
	},
	topContainer: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(SIDE_PADDING),
		paddingBottom: Sizes.smartHorizontalScale(14),
	},
	smallAvatarImage: {
		// flex: 1,
		width: Sizes.smartHorizontalScale(40),
		height: Sizes.smartHorizontalScale(40),
		borderRadius: Sizes.smartHorizontalScale(40) / 2,
	},
	topRightContainer: {
		flex: 11,
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		justifyContent: 'center',
	},
	fullName: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.postFullName,
	},
	grayText: {
		color: Colors.postText,
	},
	timestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(3),
	},
	postTextPadding: {
		marginHorizontal: Sizes.smartHorizontalScale(SIDE_PADDING),
		paddingBottom: Sizes.smartHorizontalScale(6),
	},
	postText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postFullName,
	},
	showMoreText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postHour,
		paddingLeft: Sizes.smartHorizontalScale(5),
	},
	postMediaContainer: {
		width: '100%',
		height: Sizes.smartVerticalScale(254),
	},
	halfMediaContainerHorizontal: {
		width: '50%',
		height: '100%',
	},
	halfMediaContainerVertical: {
		width: '100%',
		height: '50%',
	},
	halfMediaObject: {
		width: '100%',
		height: '100%',
	},
	locationPin: {
		height: Sizes.smartHorizontalScale(14),
	},
	hashtag: {
		color: 'rgba(98, 162, 225, 0.8)',
		textDecorationLine: 'underline',
	},
	tag: {
		color: 'black',
		fontWeight: 'bold',
	},
	url: {
		color: Colors.postHour,
		textDecorationLine: 'underline',
	},
	recentLikesContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(SIDE_PADDING),
		flexDirection: 'row',
		marginTop: -Sizes.smartVerticalScale(5),
		marginBottom: Sizes.smartVerticalScale(5),
	},
	likedText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
	},
	likeTextBold: {
		...Fonts.centuryGothicBold,
	},
	numCommentsContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(SIDE_PADDING),
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	viewAllCommentsText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.grayText,
	},
	bestCommentsContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(SIDE_PADDING),
	},
	commentContainer: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postText,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	commentUserName: {
		...Fonts.centuryGothicBold,
		marginRight: Sizes.smartHorizontalScale(10),
	},
	commentInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(SIDE_PADDING),
		marginTop: Sizes.smartVerticalScale(5),
	},
	commentInputView: {
		borderRadius: Sizes.smartHorizontalScale(6),
		borderColor: Colors.grayText,
	},
	commentInputAvatar: {
		width: Sizes.smartHorizontalScale(25),
		height: Sizes.smartHorizontalScale(25),
		borderRadius: Sizes.smartHorizontalScale(40) / 2,
		marginRight: Sizes.smartHorizontalScale(8),
	},
	postedTimeContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(SIDE_PADDING),
		marginVertical: Sizes.smartVerticalScale(10),
	},
	postedTime: {
		fontSize: Sizes.smartHorizontalScale(10),
		color: Colors.grayText,
	},
};

export default StyleSheet.create(style);
