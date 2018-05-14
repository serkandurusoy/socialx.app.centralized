import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const ICON_PADDING = Sizes.smartVerticalScale(12);
const BADGE_HEIGHT = Sizes.smartHorizontalScale(18);

const style: any = {
	container: {
		flexDirection: 'row',
		width: '100%',
		backgroundColor: Colors.tabBarBottomBg,
	},
	menuItemContainer: {
		width: '20%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		padding: ICON_PADDING,
	},
	imageSelected: {
		position: 'absolute',
		top: ICON_PADDING,
		left: ICON_PADDING,
	},
	notificationsContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	notificationBadge: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: BADGE_HEIGHT,
		color: Colors.white,
	},
	badgeBackground: {
		position: 'absolute',
		borderRadius: BADGE_HEIGHT / 2,
		minWidth: BADGE_HEIGHT,
		paddingHorizontal: Sizes.smartHorizontalScale(4),
		backgroundColor: Colors.red,
		alignItems: 'center',
		left: '55%',
		top: 0,
	},
};

export default StyleSheet.create(style);
