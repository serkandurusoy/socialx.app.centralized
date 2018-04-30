import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	scrollView: {
		backgroundColor: Colors.white,
	},
	scrollContent: {
		paddingHorizontal: Sizes.smartHorizontalScale(26),
		alignItems: 'center',
		paddingBottom: Sizes.smartVerticalScale(10),
	},
	descriptionText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		paddingTop: Sizes.smartVerticalScale(60),
		textAlign: 'center',
		paddingBottom: Sizes.smartVerticalScale(20),
	},
	inputContainer: {
		paddingBottom: Sizes.smartVerticalScale(20),
	},
};

export default StyleSheet.create(style);
