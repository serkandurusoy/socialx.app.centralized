import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(28),
	},
	activityHeader: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(68),
		color: Colors.postFullName,
		paddingTop: Sizes.smartVerticalScale(17),
	},
};

export default StyleSheet.create(style);
