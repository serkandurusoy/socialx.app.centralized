import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

export const DAY_CHART_ITEM_WIDTH = Math.round(Sizes.smartHorizontalScale(30));

const style: any = {
	scrollView: {
		flex: 1,
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(8),
		backgroundColor: Colors.white,
	},
	scrollContent: {
		minHeight: '100%',
	},
	titleText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.postFullName,
	},
	barChartContainer: {
		flexDirection: 'row',
	},
	buttonPaddingContainer: {
		width: '100%',
		paddingVertical: Sizes.smartVerticalScale(20),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
	viewSwitchButtonsContainer: {
		flexDirection: 'row',
		paddingTop: Sizes.smartVerticalScale(25),
		paddingBottom: Sizes.smartVerticalScale(17),
	},
	totalAmountRow: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	totalAmountValue: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(27),
		color: Colors.postFullName,
	},
	totalAmountLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(22),
		color: Colors.postText,
		paddingLeft: Sizes.smartHorizontalScale(8),
	},
	animatedView: {
		flex: 1,
		width: '200%',
		flexDirection: 'row',
	},
	fullWidth: {
		width: '50%',
		flex: 1,
		minHeight: Sizes.smartVerticalScale(75),
		maxHeight: Sizes.smartVerticalScale(150),
	},
	animatedViewport: {
		flex: 1,
		overflow: 'hidden',
		zIndex: 1,
	},
	dayChartItem: {
		width: DAY_CHART_ITEM_WIDTH,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	barChartColumnContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	barChartColumn: {
		width: Sizes.smartHorizontalScale(8),
	},
	barChartLabelContainer: {
		marginTop: Sizes.smartHorizontalScale(9),
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	barCharItemLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.postText,
	},
	barCharItemLabelUpperScript: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(8),
		color: Colors.postText,
	},
	monthChartItem: {
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
};

export default StyleSheet.create(style);
