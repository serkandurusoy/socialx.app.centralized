import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const USER_AVATAR_SIZE = Sizes.smartHorizontalScale(40);

const style: any = {
	container: {
		flex: 1,
		width: '100%',
	},
	scrollView: {
		backgroundColor: Colors.white,
		// backgroundColor: 'yellow',
	},
	contentContainer: {
		// backgroundColor: 'lime',
	},
	shareMessageContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: Sizes.smartVerticalScale(9),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		borderBottomColor: Colors.geyser,
		borderBottomWidth: Sizes.smartHorizontalScale(0.5),
	},
	avatarImage: {
		width: USER_AVATAR_SIZE,
		height: USER_AVATAR_SIZE,
		borderRadius: USER_AVATAR_SIZE / 2,
		marginRight: Sizes.smartHorizontalScale(13),
	},
	photoContainer: {
		paddingVertical: Sizes.smartVerticalScale(11),
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
};

export default StyleSheet.create(style);
