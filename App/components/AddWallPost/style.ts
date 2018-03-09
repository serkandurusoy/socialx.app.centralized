import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(40);

const style: any = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	boxContainer: {
		backgroundColor: Colors.white,
		alignItems: 'center',
		borderRadius: Sizes.smartHorizontalScale(8),
		width: '100%',
		maxWidth: 500,
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	topContainer: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		paddingBottom: Sizes.smartVerticalScale(10),
	},
	fullName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		paddingLeft: Sizes.smartHorizontalScale(10),
	},
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		borderWidth: Sizes.smartHorizontalScale(1),
		borderColor: Colors.pink,
	},
	inputContainer: {
		maxHeight: Sizes.smartVerticalScale(130),
	},
	photosContainer: {
		width: '100%',
		height: Sizes.smartVerticalScale(90),
		paddingBottom: Sizes.smartVerticalScale(10),
	},
	addMediaButton: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		paddingVertical: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
	},
	photoIcon: {
		width: Sizes.smartHorizontalScale(22),
		height: Sizes.smartHorizontalScale(22),
		marginRight: Sizes.smartHorizontalScale(8),
	},
	addMediaText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postText,
	},
	mediaObject: {
		width: 100,
		height: '100%',
		marginLeft: Sizes.smartHorizontalScale(10),
	},
};

export default StyleSheet.create(style);
