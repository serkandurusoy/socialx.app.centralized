import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../../theme/';

const style: any = {
	container: {
		width: Sizes.smartHorizontalScale(22),
		justifyContent: 'center',
		height: Sizes.smartVerticalScale(110),
		paddingVertical: Sizes.smartVerticalScale(13),
	},
	labelStyle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(8),
		color: Colors.postFullName,
	},
};

export default StyleSheet.create(style);
