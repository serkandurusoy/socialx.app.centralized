import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		padding: Sizes.smartHorizontalScale(7),
	},
	lineContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: Sizes.smartHorizontalScale(7),
	},
	dotsIcon: {
		fontSize: Sizes.smartHorizontalScale(25),
	},
	icon: {
		marginLeft: Sizes.smartHorizontalScale(5),
		marginRight: Sizes.smartHorizontalScale(10),
	},
	fontIcon: {
		fontSize: Sizes.smartHorizontalScale(22),
	},
	label: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(22),
		color: Colors.postFullName,
		textAlign: 'left',
	},
};

export default StyleSheet.create(style);
