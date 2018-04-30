import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const DOT_COLOR_SIZE = Sizes.smartHorizontalScale(13);

const style: any = {
	container: {
		width: '100%',
		flexDirection: 'row',
	},
	eventDotColor: {
		width: DOT_COLOR_SIZE,
		height: DOT_COLOR_SIZE,
		borderRadius: DOT_COLOR_SIZE / 2,
		margin: Sizes.smartHorizontalScale(18),
	},
	rightContainer: {
		flex: 1,
		marginRight: Sizes.smartHorizontalScale(15),
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.postFullName,
		marginTop: Sizes.smartHorizontalScale(10),
	},
	spanning: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
		letterSpacing: 0.23,
		paddingVertical: Sizes.smartVerticalScale(11),
	},
};

export default StyleSheet.create(style);
