import {StyleSheet} from 'react-native';
import {Colors, Sizes} from 'theme';

const style: any = {
	container: {
		flexDirection: 'row',
		marginHorizontal: Sizes.smartHorizontalScale(15),
		paddingTop: Sizes.smartVerticalScale(5),
		marginVertical: Sizes.smartVerticalScale(5),
		justifyContent: 'space-between',
		borderTopColor: Colors.geyser,
		borderTopWidth: Sizes.smartHorizontalScale(0.5),
	},
	rightContainer: {
		flexDirection: 'row',
	},
};

export default StyleSheet.create(style);
