import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.white,
	},
	Icon: {
		width: '100%',
		height: '40%',
	},
	text: {
		fontSize: Sizes.smartHorizontalScale(30),
		textAlign: 'center',
	},
});
