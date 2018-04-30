import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, Sizes} from 'theme/';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	searchContainer: {
		paddingTop: Sizes.smartHorizontalScale(11),
		paddingBottom: Sizes.smartHorizontalScale(15),
		paddingRight: Sizes.smartHorizontalScale(30),
		paddingLeft: Sizes.smartHorizontalScale(17),
		flexDirection: 'row',
	},
	friendsText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(24),
		lineHeight: Sizes.smartHorizontalScale(29),
		color: Colors.postFullName,
		paddingRight: Sizes.smartHorizontalScale(32),
	},
	inputContainer: {
		flex: 1,
	},
	tabButtonsContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: Sizes.smartHorizontalScale(17),
		paddingBottom: Sizes.smartVerticalScale(21),
		borderBottomWidth: Sizes.smartHorizontalScale(1),
		borderBottomColor: Colors.dustWhite,
	},
	animatedView: {
		flex: 1,
		width: '200%',
		flexDirection: 'row',
	},
	fullWidth: {
		width: '50%',
		flex: 1,
	},
};

export default StyleSheet.create(style);
