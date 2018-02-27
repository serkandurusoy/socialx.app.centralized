import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		// flex: 1,
		width: '100%',
		height: '100%',
		paddingTop: Sizes.smartVerticalScale(24),
		alignItems: 'center',
		backgroundColor: Colors.white,
	},
	keyboardView: {
		backgroundColor: Colors.white,
	},
	buttonContainer: {
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(28),
	},
	orText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(19),
		paddingBottom: Sizes.smartVerticalScale(27),
	},
	registerButtonContainer: {
		paddingTop: Sizes.smartVerticalScale(69),
	},
	textInputContainer: {
		width: '100%',
		// height: Sizes.smartVerticalScale(60),
		// borderTopWidth: 1,
		// borderTopColor: Colors.dustWhite,
		borderBottomWidth: 1,
		borderBottomColor: Colors.dustWhite,
		// marginBottom: 20,
		// backgroundColor: 'lime',
	},
};

export default StyleSheet.create(style);
