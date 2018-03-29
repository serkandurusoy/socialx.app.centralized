import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	topText: {
		...Fonts.centuryGothic,
		textAlign: 'left',
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.postFullName,
		paddingLeft: Sizes.smartHorizontalScale(10),
	},
	barChartContainer: {
		flexDirection: 'row',
	},
};

export default StyleSheet.create(style);
