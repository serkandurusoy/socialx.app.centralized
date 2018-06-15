import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
	},
	scrollView: {
		backgroundColor: Colors.white,
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
