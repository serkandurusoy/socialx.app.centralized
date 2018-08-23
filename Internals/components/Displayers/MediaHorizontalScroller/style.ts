import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	scrollContent: {
		minWidth: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	mediaObject: {
		height: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(3),
	},
};

export default StyleSheet.create(style);
