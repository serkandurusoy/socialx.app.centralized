import {OS_TYPES} from 'consts';
import {Platform, StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

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
		flexDirection: 'row',
	},
	textInputContainerFirst: {
		borderTopWidth: 1,
		borderTopColor: Colors.dustWhite,
	},
	avatarPickerContainer: {
		padding: Sizes.smartHorizontalScale(10),
	},
	phoneInputIconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: Sizes.smartHorizontalScale(40),
	},
	phoneNumberInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		color: Colors.shuttleGray,
		flex: 1,
		maxHeight: '100%',
		paddingVertical: Platform.OS === OS_TYPES.Android ? Sizes.smartHorizontalScale(10) : Sizes.smartHorizontalScale(16),
	},
	countryPickerContainer: {
		maxHeight: '100%',
		paddingLeft: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
		flexDirection: 'row',
	},
	countryCode: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		paddingLeft: Sizes.smartHorizontalScale(10),
		color: Colors.shuttleGray,
	},
	termContainer: {
		flexDirection: 'row',
		paddingBottom: Sizes.smartVerticalScale(15),
		alignItems: 'center',
	},
	acceptText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
	},
	acceptTextLink: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postHour,
		padding: Sizes.smartHorizontalScale(5),
	},
	acceptCheckbox: {
		left: 0,
		marginLeft: Sizes.smartHorizontalScale(5),
	},
};

export default StyleSheet.create(style);
