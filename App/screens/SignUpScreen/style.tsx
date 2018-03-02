import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		width: '100%',
		alignItems: 'center',
		backgroundColor: Colors.white,
		paddingBottom: Sizes.smartVerticalScale(78),
	},
	keyboardView: {
		backgroundColor: Colors.white,
	},
	buttonContainer: {
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(24),
		paddingBottom: Sizes.smartVerticalScale(19),
		paddingHorizontal: Sizes.smartHorizontalScale(28),
	},
	orText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
	},
	registerButtonContainer: {
		paddingTop: Sizes.smartVerticalScale(55),
	},
	textInputContainer: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: Colors.dustWhite,
	},
	textInputContainerFirst: {
		borderTopWidth: 1,
		borderTopColor: Colors.dustWhite,
	},
};

export default StyleSheet.create(style);
