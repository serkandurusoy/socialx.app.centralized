import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	repliesList: {
		flex: 1,
	},
	noRepliesContainer: {
		paddingTop: Sizes.smartVerticalScale(30),
		alignItems: 'center',
	},
	noRepliesText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(20),
		textAlign: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
};

export default StyleSheet.create(style);
