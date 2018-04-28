import {StyleSheet} from 'react-native';
import {Colors, Sizes} from 'theme';

const ICON_PADDING = Sizes.smartVerticalScale(12);

const style: any = {
	container: {
		flexDirection: 'row',
		width: '100%',
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
