import {StyleSheet} from 'react-native';
import {Colors, colorWithAlpha, Fonts, Sizes} from 'theme';

const style: any = {
	safeView: {
		backgroundColor: Colors.white,
		flex: 1,
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	photosContainer: {
		width: '100%',
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
		height: Sizes.smartVerticalScale(90),
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
