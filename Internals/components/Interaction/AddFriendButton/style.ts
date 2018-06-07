import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	isFiendIcon: {
		width: Sizes.smartHorizontalScale(23),
		height: Sizes.smartHorizontalScale(23),
	},
	friendRequestSentIcon: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.cadetBlue,
	},
};

export default StyleSheet.create(style);
