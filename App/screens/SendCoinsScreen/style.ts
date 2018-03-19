import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(25),
		paddingTop: Sizes.smartVerticalScale(4),
		justifyContent: 'space-between',
		paddingBottom: Sizes.smartVerticalScale(30),
	},
	continueButtonContainer: {
		paddingTop: Sizes.smartVerticalScale(40),
	},
	middleContainer: {
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(22),
	},
	borderLine: {
		width: '100%',
		borderBottomColor: Colors.grayNurse,
		borderBottomWidth: Sizes.smartHorizontalScale(2),
	},
	firstInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: Sizes.smartVerticalScale(40),
		paddingBottom: Sizes.smartVerticalScale(32),
	},
	textInputFirst: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(22),
		color: Colors.postFullName,
		flex: 1,
	},
	secondInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: Sizes.smartVerticalScale(29),
	},
	textInputSecond: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(22),
		color: Colors.postFullName,
		flex: 1,
	},
	inputLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.tundora,
		paddingLeft: Sizes.smartHorizontalScale(15),
	},
};

export default StyleSheet.create(style);
