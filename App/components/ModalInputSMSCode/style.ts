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
		width: '100%',
		maxWidth: 500,
		shadowColor: Colors.black,
		shadowOffset: {width: 0, height: 4},
		shadowOpacity: 0.3,
		shadowRadius: 8,
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.rhino,
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		paddingTop: Sizes.smartVerticalScale(14),
		paddingBottom: Sizes.smartVerticalScale(21),
	},
	message: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(21),
		color: Colors.postFullName,
		paddingHorizontal: Sizes.smartHorizontalScale(24),
		paddingVertical: Sizes.smartVerticalScale(15),
		textAlign: 'center',
	},
	borderContainer: {
		width: '100%',
		borderTopWidth: Sizes.smartVerticalScale(1),
		borderTopColor: Colors.mercury,
	},
	buttonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderTopWidth: Sizes.smartVerticalScale(1),
		borderTopColor: Colors.mercury,
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
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(18),
	},
	buttonTextConfirm: {
		color: Colors.postHour,
	},
	buttonTextCancel: {
		color: Colors.postFullName,
	},
	inputCellsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	digitInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(28),
		color: Colors.postFullName,
		width: Sizes.smartHorizontalScale(45),
		height: Sizes.smartHorizontalScale(55),
		borderRadius: Sizes.smartHorizontalScale(5),
		borderWidth: Sizes.smartHorizontalScale(1),
		borderColor: Colors.cadetBlue,
		textAlign: 'center',
		marginHorizontal: Sizes.smartHorizontalScale(5),
		marginBottom: Sizes.smartVerticalScale(10),
	},
	buttonDisabled: {
		opacity: 0.3,
	},
	digitInputWithValue: {
		borderColor: Colors.pink,
	},
};

export default StyleSheet.create(style);
