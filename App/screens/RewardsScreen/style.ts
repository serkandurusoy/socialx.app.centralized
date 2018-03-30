import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(8),
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
};

export default StyleSheet.create(style);
