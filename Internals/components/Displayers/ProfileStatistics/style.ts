import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		width: '100%',
		justifyContent: 'center',
		flexDirection: 'row',
		paddingVertical: Sizes.smartVerticalScale(13),
	},
	statItem: {
		width: '25%',
		alignItems: 'center',
	},
	statValue: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		paddingBottom: Sizes.smartVerticalScale(6),
	},
	statText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
	},
};

export default StyleSheet.create(style);
