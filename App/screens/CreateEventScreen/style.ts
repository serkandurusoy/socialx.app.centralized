import {StyleSheet} from 'react-native';
import {Colors, colorWithAlpha, Fonts, Sizes} from '../../theme/';

const COLOR_BUTTON_SIZE = Sizes.smartHorizontalScale(28);
const COLOR_BUTTON_MARGIN = Sizes.smartHorizontalScale(5);
const HORIZONTAL_PADDING = Sizes.smartHorizontalScale(25);

export const COLOR_BUTTON_HEIGHT = COLOR_BUTTON_SIZE + 2 * COLOR_BUTTON_MARGIN;

const style: any = {
	scrollView: {
		width: '100%',
		flex: 1,
		backgroundColor: Colors.alabaster,
	},
	paddingContainer: {
		paddingHorizontal: HORIZONTAL_PADDING,
		width: '100%',
		backgroundColor: Colors.white,
	},
	topContainer: {
		paddingBottom: Sizes.smartVerticalScale(20),
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	saeElement: {
		borderBottomWidth: 0,
	},
	hoshiElement: {
		marginVertical: Sizes.smartVerticalScale(5),
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
	toggleInputStyle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(22),
		color: Colors.postFullName,
	},
	startEndDateContainer: {
		flexDirection: 'row',
		width: '100%',
		backgroundColor: Colors.white,
	},
	toggleContainer: {
		paddingHorizontal: HORIZONTAL_PADDING,
		paddingVertical: Sizes.smartVerticalScale(5),
		width: '100%',
	},
	startDateButton: {
		flex: 1,
		paddingLeft: HORIZONTAL_PADDING,
	},
	leftBorder: {
		borderLeftWidth: Sizes.smartHorizontalScale(1),
		borderLeftColor: Colors.dustWhite,
	},
	colorRoundButton: {
		width: COLOR_BUTTON_SIZE,
		height: COLOR_BUTTON_SIZE,
		borderRadius: COLOR_BUTTON_SIZE / 2,
		margin: COLOR_BUTTON_MARGIN,
	},
	colorDropDown: {
		borderWidth: Sizes.smartHorizontalScale(1),
		borderRadius: Sizes.smartHorizontalScale(5),
		backgroundColor: colorWithAlpha(Colors.tundora, 0.5),
	},
};

export default StyleSheet.create(style);
