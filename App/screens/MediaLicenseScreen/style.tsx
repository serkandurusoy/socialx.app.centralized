import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const SCREEN_HORIZONTAL_PADDING = Sizes.smartHorizontalScale(20);

const style: any = {
	scrollView: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	paddingContainer: {
		paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
		borderBottomColor: Colors.dustWhite,
	},
	mediaTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.postFullName,
		width: '100%',
		textAlign: 'center',
		paddingTop: Sizes.smartVerticalScale(15),
		paddingBottom: Sizes.smartVerticalScale(20),
	},
	mediaPreviewImage: {
		width: '100%',
		height: Sizes.smartVerticalScale(200),
		marginBottom: Sizes.smartVerticalScale(11),
		backgroundColor: Colors.dustWhite,
	},
	actionButtonsContainer: {
		paddingBottom: Sizes.smartVerticalScale(10),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	actionButton: {
		flexDirection: 'row',
		padding: Sizes.smartHorizontalScale(5),
	},
	actionButtonText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.postFullName,
		paddingLeft: Sizes.smartHorizontalScale(10),
	},
	descriptionContainer: {
		paddingVertical: Sizes.smartVerticalScale(6),
	},
	mediaDescriptionText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(15),
		color: Colors.postFullName,
		paddingVertical: Sizes.smartVerticalScale(4),
	},
	mediaDescriptionValue: {
		color: Colors.postHour,
	},
	listContainer: {
		paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
		borderBottomWidth: Sizes.smartHorizontalScale(2),
		borderBottomColor: Colors.postText,
	},
	listHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: Sizes.smartVerticalScale(9),
	},
	listHeaderText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(12),
		color: Colors.postText,
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	listSectionHeaderGradient: {
		width: '100%',
		borderRadius: Sizes.smartHorizontalScale(6),
	},
	listSectionHeaderText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.white,
		paddingVertical: Sizes.smartVerticalScale(12),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	listItemContainer: {
		flexDirection: 'row',
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	listItemBorder: {
		borderBottomWidth: Sizes.smartHorizontalScale(1),
		borderBottomColor: Colors.dustWhite,
	},
	listItemCheckbox: {
		left: 0,
	},
	mediaSize: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.white,
		textAlign: 'center',
		paddingVertical: Sizes.smartVerticalScale(3),
	},
	mediaSizeBackground: {
		backgroundColor: Colors.postFullName,
		marginLeft: Sizes.smartHorizontalScale(10),
		width: Sizes.smartHorizontalScale(40),
		textAlign: 'center',
		borderRadius: Sizes.smartHorizontalScale(32),
	},
	mediaExtension: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.postFullName,
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	mediaResolution: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.postText,
	},
	mediaPrice: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.postFullName,
		flex: 1,
		textAlign: 'right',
		paddingRight: Sizes.smartHorizontalScale(36),
	},
	downloadContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(8),
		paddingTop: Sizes.smartVerticalScale(29),
		paddingBottom: Sizes.smartVerticalScale(10),
	},
	faqContainer: {
		alignItems: 'center',
		paddingBottom: Sizes.smartVerticalScale(16),
	},
	faqText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postHour,
		padding: Sizes.smartHorizontalScale(5),
	},
};

export default StyleSheet.create(style);
