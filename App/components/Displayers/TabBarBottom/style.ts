import {StyleSheet} from 'react-native';
import {Colors, Metrics, Sizes} from '../../../theme';

const ICON_PADDING = Sizes.smartVerticalScale(7);

const style: any = {
	container: {
		flexDirection: 'row',
		width: '100%',
		height: Metrics.tabBarBottomHeight,
		backgroundColor: Colors.tabBarBottomBg,
	},
	menuItemContainer: {
		width: '20%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		padding: ICON_PADDING,
	},
	imageSelected: {
		position: 'absolute',
		top: ICON_PADDING,
		left: ICON_PADDING,
	},
};

export default StyleSheet.create(style);
