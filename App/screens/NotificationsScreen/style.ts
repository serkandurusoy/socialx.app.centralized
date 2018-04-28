import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	emptyContainer: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	noNotificationsScrollContainer: {
		flex: 1,
	},
	noNotificationsText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(24),
		textAlign: 'center',
		color: Colors.silverSand,
	},
	noNotificationsIcon: {
		width: Sizes.smartHorizontalScale(37),
		height: Sizes.smartHorizontalScale(33),
		marginBottom: Sizes.smartVerticalScale(15),
	},
	bottomLoadingContainer: {
		paddingVertical: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(style);
