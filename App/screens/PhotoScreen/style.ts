import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const USER_AVATAR_SIZE = Sizes.smartHorizontalScale(40);

const style: any = {
	container: {
		flex: 1,
		width: '100%',
	},
	scrollView: {
		backgroundColor: Colors.white,
	},
	shareMessageContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingVertical: Sizes.smartVerticalScale(9),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		borderBottomColor: Colors.geyser,
		borderBottomWidth: Sizes.smartHorizontalScale(0.5),
	},
	captionContainer: {
		minHeight: USER_AVATAR_SIZE,
		maxHeight: Sizes.smartVerticalScale(80),
		flex: 1,
		justifyContent: 'center',
	},
	captionTextInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.postFullName,
	},
	avatarImage: {
		width: USER_AVATAR_SIZE,
		height: USER_AVATAR_SIZE,
		borderRadius: USER_AVATAR_SIZE / 2,
		marginRight: Sizes.smartHorizontalScale(13),
	},
	photoContainer: {
		paddingTop: Sizes.smartVerticalScale(11),
		paddingHorizontal: Sizes.smartHorizontalScale(52),
	},
	photo: {
		width: '100%',
		height: Sizes.smartHorizontalScale(130),
	},
	paddingContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(24),
	},
	smallText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postText,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	multilineTextInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(22),
		color: Colors.postFullName,
	},
	withMaxHeight: {
		maxHeight: Sizes.smartVerticalScale(80),
	},
	checkboxButtonContainer: {
		marginTop: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(style);
