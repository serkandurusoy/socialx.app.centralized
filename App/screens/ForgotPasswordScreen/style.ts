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
	errorText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.monza,
		paddingVertical: Sizes.smartVerticalScale(3),
		// alignSelf: 'flex-start',
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
};

export default StyleSheet.create(style);
