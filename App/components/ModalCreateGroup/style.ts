import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	boxContainer: {
		backgroundColor: Colors.white,
		alignItems: 'center',
		borderRadius: Sizes.smartHorizontalScale(9),
		maxWidth: 500,
		width: '100%',
		shadowColor: Colors.black,
		shadowOffset: {width: 0, height: 4},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		overflow: 'hidden',
	},
	titleContainer: {
		width: '100%',
		backgroundColor: Colors.pink,
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.white,
		textAlign: 'center',
		paddingTop: Sizes.smartVerticalScale(14),
		paddingBottom: Sizes.smartVerticalScale(21),
	},
	inputContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		paddingTop: Sizes.smartVerticalScale(40),
	},
	descriptionContainer: {
		maxHeight: 180,
		paddingTop: Sizes.smartVerticalScale(9),
		paddingBottom: Sizes.smartVerticalScale(21),
	},
	buttonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderTopColor: Colors.mercury,
		borderTopWidth: Sizes.smartVerticalScale(1),
	},
	button: {
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(16),
		flex: 1,
	},
	leftButton: {
		borderRightColor: Colors.mercury,
		borderRightWidth: Sizes.smartVerticalScale(1),
	},
	buttonText: {
		textAlign: 'center',
		...Fonts.centuryGothic,
		color: Colors.grayText,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(18),
	},
	buttonTextConfirm: {
		color: Colors.postHour,
	},
	buttonTextCancel: {
		color: Colors.postFullName,
	},
};

export default StyleSheet.create(style);
