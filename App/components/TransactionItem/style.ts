import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: Sizes.smartHorizontalScale(2),
		borderBottomColor: Colors.grayNurse05,
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	horizontalContainer: {
		flexDirection: 'row',
	},
	coinIcon: {
		width: Sizes.smartHorizontalScale(50),
		height: Sizes.smartHorizontalScale(50),
	},
};

export default StyleSheet.create(style);
