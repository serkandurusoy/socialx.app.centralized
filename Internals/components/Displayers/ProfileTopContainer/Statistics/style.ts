import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const styles: any = {
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: Sizes.smartHorizontalScale(10),
	},
	value: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.white,
		marginBottom: Sizes.smartVerticalScale(7.5),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
	},
};

export default StyleSheet.create(styles);
