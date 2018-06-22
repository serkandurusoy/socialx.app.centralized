import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const style: any = {
	container: {
		flex: 1,
		width: '50%',
	},
	shortMessage: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.silverSand,
	},
	loadingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	messageContainer: {
		paddingVertical: Sizes.smartVerticalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
	leftLoading: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	searchIcon: {
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.silverSand,
		paddingRight: Sizes.smartHorizontalScale(10),
	},
};

export default StyleSheet.create(style);
