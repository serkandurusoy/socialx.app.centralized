import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const style: any = {
	spinnerContainer: {
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(20),
		alignItems: 'center',
	},
	animatedView: {
		flex: 1,
	},
};

export default StyleSheet.create(style);
