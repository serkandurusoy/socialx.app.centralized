import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	scrollView: {
		flex: 1,
		backgroundColor: Colors.alabaster,
	},
	paddingContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(25),
		width: '100%',
		backgroundColor: Colors.white,
	},
	topContainer: {
		paddingBottom: Sizes.smartVerticalScale(20),
	},
	titleElement: {
		borderBottomWidth: 0,
	},
	titleInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.postFullName,
	},
	titleLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postText,
	},
	startEndDateContainer: {
		flexDirection: 'row',
		width: '100%',
		backgroundColor: Colors.white,
	},
	startDateButton: {
		flex: 1,
		paddingLeft: Sizes.smartHorizontalScale(25),
	},
	leftBorder: {
		borderLeftWidth: Sizes.smartHorizontalScale(1),
		borderLeftColor: Colors.dustWhite,
	},
};

export default StyleSheet.create(style);
