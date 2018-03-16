import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const style: any = {
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: Sizes.smartHorizontalScale(15),
		paddingRight: Sizes.smartHorizontalScale(12),
		paddingVertical: Sizes.smartVerticalScale(15),
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	avatarImage: {
		width: Sizes.smartHorizontalScale(40),
		height: Sizes.smartHorizontalScale(40),
		borderRadius: Sizes.smartHorizontalScale(40) / 2,
		marginRight: Sizes.smartHorizontalScale(25),
	},
	avatarNameContainer: {
		flex: 1,
	},
	time: {
		alignSelf: 'flex-start',
		marginTop: Sizes.smartHorizontalScale(5),
		marginRight: Sizes.smartHorizontalScale(15),
		width: Sizes.smartHorizontalScale(45),
		fontSize: Sizes.smartHorizontalScale(10),
		color: Colors.postHour,
	},
	username: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	message: {
		...Fonts.centuryGothic,
		color: Colors.postText,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(23),
		paddingTop: Sizes.smartVerticalScale(3),
	},
};

export default StyleSheet.create(style);
