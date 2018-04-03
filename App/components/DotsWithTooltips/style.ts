import {StyleSheet} from 'react-native';
import {Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
	},
	lineContainer: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		flex: 1,
		flexDirection: 'row',
	},
	dots: {
		height: Sizes.smartVerticalScale(15),
		width: Sizes.smartHorizontalScale(15),
	},
	icon: {
		height: Sizes.smartVerticalScale(15),
		width: Sizes.smartHorizontalScale(15),
		marginLeft: Sizes.smartHorizontalScale(5),
		marginRight: Sizes.smartHorizontalScale(10),
	},
	label: {
		...Fonts.centuryGothic,
		textAlign: 'left',
	},
};

export default StyleSheet.create(style);
