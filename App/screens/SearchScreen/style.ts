import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, Sizes} from '../../theme/';

const START_SEARCH_ICON_SIZE = Sizes.smartHorizontalScale(33);

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	emptyContainer: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	startSearchIcon: {
		width: START_SEARCH_ICON_SIZE,
		height: START_SEARCH_ICON_SIZE,
	},
	startSearchText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.silverSand,
		paddingTop: Sizes.smartVerticalScale(15),
	},
	noResultsContainer: {
		flex: 1,
		width: '100%',
	},
	noResultsCenterAlign: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	resultsContainer: {
		flex: 1,
		width: '100%',
	},
	filterButtonsContainer: {
		flexDirection: 'row',
		width: '100%',
		borderBottomWidth: Sizes.smartHorizontalScale(1),
		borderBottomColor: Colors.iron2,
	},
	createGroupContainer: {
		width: '100%',
		alignItems: 'center',
		paddingTop: Sizes.smartVerticalScale(123),
	},
	createGroupIcon: {
		width: Sizes.smartHorizontalScale(40),
		height: Sizes.smartHorizontalScale(33),
	},
	createGroupText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.postHour,
		paddingTop: Sizes.smartVerticalScale(15),
	},
};

export default StyleSheet.create(style);
