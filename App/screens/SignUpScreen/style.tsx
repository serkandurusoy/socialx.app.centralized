import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
		paddingTop: Sizes.smartVerticalScale(24),
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
		borderBottomWidth: 1,
		borderBottomColor: Colors.dustWhite,
	},
	textInputContainerFirst: {
		borderTopWidth: 1,
		borderTopColor: Colors.dustWhite,
	},
};

export default StyleSheet.create(style);
