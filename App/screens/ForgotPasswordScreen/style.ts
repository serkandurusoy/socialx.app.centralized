import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(26),
		alignItems: 'center',
	},
	descriptionText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		paddingTop: Sizes.smartVerticalScale(60),
		textAlign: 'center',
	},
	usernameInputContainer: {
		paddingVertical: Sizes.smartVerticalScale(20),
	},
};

export default StyleSheet.create(style);
