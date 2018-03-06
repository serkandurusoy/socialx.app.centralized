import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(103);

const style: any = {
	container: {
		// backgroundColor: 'yellow',
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	boxContainer: {
		// backgroundColor: 'red',
		alignItems: 'center',
		width: '100%',
		maxWidth: 500,
		top: -AVATAR_SIZE / 4,
	},
	whiteBox: {
		backgroundColor: Colors.white,
		alignItems: 'center',
		borderRadius: Sizes.smartHorizontalScale(8),
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
	fullName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		paddingTop: Sizes.smartVerticalScale(72),
		paddingBottom: Sizes.smartVerticalScale(24),
	},
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		borderWidth: Sizes.smartHorizontalScale(3),
		borderColor: Colors.white,
		top: AVATAR_SIZE / 2,
		zIndex: 1,
	},
	avatarContainer: {},
	photosContainer: {
		backgroundColor: 'lime',
		width: '100%',
		height: Sizes.smartVerticalScale(90),
		paddingVertical: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(style);
