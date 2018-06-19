import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const style: any = {
	container: {
		flex: 1,
		width: '50%',
	},
	resultsContainer: {
		flex: 1,
		width: '100%',
	},
	shortMessage: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.silverSand,
		paddingVertical: Sizes.smartVerticalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
};

export default StyleSheet.create(style);
