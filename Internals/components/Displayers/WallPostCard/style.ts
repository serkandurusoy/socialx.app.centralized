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
		...Fonts.centuryGothic,
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
	postTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postFullName,
		paddingHorizontal: Sizes.smartHorizontalScale(SIDE_PADDING),
		paddingBottom: Sizes.smartHorizontalScale(6),
	},
	postTextContainer: {
		flexDirection: 'row',
		paddingBottom: Sizes.smartHorizontalScale(4),
		paddingHorizontal: Sizes.smartHorizontalScale(SIDE_PADDING),
	},
	postText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.postText,
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
	showMoreText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postHour,
		paddingLeft: Sizes.smartHorizontalScale(5),
	},
};

export default StyleSheet.create(style);
