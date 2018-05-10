import {StyleSheet} from 'react-native';
import {Colors, colorWithAlpha, Fonts, Sizes} from 'theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(40);

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
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
		maxHeight: Sizes.smartVerticalScale(110),
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
		maxHeight: 100,
		marginLeft: Sizes.smartHorizontalScale(10),
	},
	mediaUploadingPlaceholder: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colorWithAlpha(Colors.black, 0.6),
	},
	progressText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.white,
		paddingTop: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(style);
