import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

export const STATS_HEIGHT = Sizes.smartVerticalScale(60);

const style: any = {
	container: {
		width: '100%',
		justifyContent: 'center',
		flexDirection: 'row',
		height: STATS_HEIGHT,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	statItem: {
		flex: 1,
		width: '25%',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	statValue: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
	},
	statText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
	},
};

export default StyleSheet.create(style);
