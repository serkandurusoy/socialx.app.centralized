import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: Sizes.smartHorizontalScale(2),
		borderBottomColor: Colors.grayNurse05,
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightContainer: {
		paddingRight: Sizes.smartHorizontalScale(10),
	},
	coinIcon: {
		width: Sizes.smartHorizontalScale(50),
		height: Sizes.smartHorizontalScale(50),
		marginVertical: Sizes.smartVerticalScale(15),
		marginRight: Sizes.smartHorizontalScale(9),
	},
	lineText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(35),
		color: Colors.postFullName,
	},
	grayText: {
		color: Colors.shuttleGray,
		opacity: 0.4,
	},
	dateText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.shuttleGray,
		opacity: 0.6,
	},
};

export default StyleSheet.create(style);

const shadows: any = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: Sizes.smartHorizontalScale(2),
		borderBottomColor: Colors.grayNurse05,
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightContainer: {
		paddingRight: Sizes.smartHorizontalScale(10),
	},
	coinIcon: {
		width: Sizes.smartHorizontalScale(50),
		height: Sizes.smartHorizontalScale(50),
		marginVertical: Sizes.smartVerticalScale(15),
		marginRight: Sizes.smartHorizontalScale(9),
		borderRadius: Sizes.smartHorizontalScale(50) / 2,
		overflow: 'hidden',
	},
	lineTextFirst: {
		height: Sizes.smartHorizontalScale(20),
		width: Sizes.smartHorizontalScale(130),
		marginVertical: Sizes.smartHorizontalScale(7),
		overflow: 'hidden',
	},
	lineTextSecond: {
		height: Sizes.smartHorizontalScale(20),
		width: Sizes.smartHorizontalScale(100),
		marginVertical: Sizes.smartHorizontalScale(7),
		overflow: 'hidden',
	},
	dateText: {
		width: Sizes.smartHorizontalScale(35),
		height: Sizes.smartHorizontalScale(16),
		marginBottom: Sizes.smartHorizontalScale(4),
		overflow: 'hidden',
	},
};

export const shadowStyle = StyleSheet.create(shadows);
