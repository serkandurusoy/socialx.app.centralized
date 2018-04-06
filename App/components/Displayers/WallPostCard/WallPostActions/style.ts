import {StyleSheet} from 'react-native';
import {Sizes} from '../../../../theme';

const style: any = {
	container: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		paddingVertical: Sizes.smartVerticalScale(10),
		justifyContent: 'space-between',
	},
	rightContainer: {
		flexDirection: 'row',
	},
};

export default StyleSheet.create(style);
