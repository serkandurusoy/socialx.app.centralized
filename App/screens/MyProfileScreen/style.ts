import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const style: any = {
	container: {
		backgroundColor: Colors.white,
	},
	scrollContainer: {
		width: '100%',
		backgroundColor: Colors.white,
	},
	topContainer: {
		paddingTop: Sizes.smartVerticalScale(19),
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
};

export default StyleSheet.create(style);
