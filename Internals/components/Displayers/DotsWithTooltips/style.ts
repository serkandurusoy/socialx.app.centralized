import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		padding: Sizes.smartHorizontalScale(7),
	},
	lineContainer: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	dots: {
		height: Sizes.smartVerticalScale(5),
		width: Sizes.smartHorizontalScale(19),
	},
	icon: {
		marginLeft: Sizes.smartHorizontalScale(5),
		marginRight: Sizes.smartHorizontalScale(10),
	},
	label: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		textAlign: 'left',
	},
};

export default StyleSheet.create(style);
