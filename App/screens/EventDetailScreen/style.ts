import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const SECTION_ICON_MARGIN_RIGHT = Sizes.smartHorizontalScale(35);

const style: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.alabaster,
	},
	titleColorContainer: {
		paddingBottom: Sizes.smartVerticalScale(30),
	},
	titleContainer: {
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(30),
	},
	title: {
		...Fonts.centuryGothic,
		color: Colors.white,
		fontSize: Sizes.smartHorizontalScale(25),
		lineHeight: Sizes.smartHorizontalScale(42),
		letterSpacing: Sizes.smartHorizontalScale(0.14),
		textAlign: 'center',
	},
	eventTitleActions: {
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	topButton: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.white,
		padding: Sizes.smartHorizontalScale(5),
	},
	sectionContainer: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingTop: Sizes.smartVerticalScale(13),
		paddingBottom: Sizes.smartVerticalScale(6),
		backgroundColor: Colors.white,
		marginBottom: Sizes.smartVerticalScale(20),
	},
	sidePushContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: Sizes.smartVerticalScale(7),
	},
	sectionIcon: {
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.postText,
		width: SECTION_ICON_MARGIN_RIGHT,
	},
	sectionIconAsset: {
		width: SECTION_ICON_MARGIN_RIGHT,
	},
	sectionItemLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postText,
		paddingRight: Sizes.smartHorizontalScale(30),
	},
	sectionItemText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.postFullName,
		flex: 1,
		textAlign: 'right',
	},
	descriptionContainer: {
		backgroundColor: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(20),
	},
	descriptionText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.postFullName,
		paddingTop: Sizes.smartVerticalScale(16),
	},
};

export default StyleSheet.create(style);
