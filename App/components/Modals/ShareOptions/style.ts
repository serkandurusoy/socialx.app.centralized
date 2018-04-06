import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../theme';

const style: any = {
	container: {
		flex: 1,
		margin: 0,
		bottom: 0,
		position: 'relative',
	},
	boxContainer: {
		justifyContent: 'space-around',
		height: Sizes.smartVerticalScale(200),
		width: Sizes.smartHorizontalScale(350),
		position: 'absolute',
		marginHorizontal: Sizes.smartHorizontalScale(12),
		bottom: Sizes.smartVerticalScale(20),
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartVerticalScale(8),
	},
	blurView: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
};

export default StyleSheet.create(style);
