import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(40);

const style: any = {
	container: {
		width: '100%',
		flexDirection: 'row',
		alignSelf: 'flex-start',
		paddingLeft: Sizes.smartHorizontalScale(12),
		paddingRight: Sizes.smartHorizontalScale(26),
		paddingVertical: Sizes.smartVerticalScale(15),
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		marginRight: Sizes.smartHorizontalScale(30),
	},
	time: {
		width: Sizes.smartHorizontalScale(55),
		fontSize: Sizes.smartHorizontalScale(10),
		color: Colors.postHour,
	},
	verticalContainer: {
		flex: 1,
	},
	fullName: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
	},
	message: {
		...Fonts.centuryGothic,
		color: Colors.postText,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
		paddingTop: Sizes.smartVerticalScale(3),
	},
};

export default StyleSheet.create(style);
