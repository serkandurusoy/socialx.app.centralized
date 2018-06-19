import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const START_SEARCH_ICON_SIZE = Sizes.smartHorizontalScale(33);

const style: any = {
	emptyContainer: {
		flex: 1,
		width: '50%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	startSearchText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.silverSand,
		paddingTop: Sizes.smartVerticalScale(15),
	},
	startSearchIcon: {
		width: START_SEARCH_ICON_SIZE,
		height: START_SEARCH_ICON_SIZE,
	},
};

export default StyleSheet.create(style);
