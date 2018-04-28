import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const style: any = {
	container: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		paddingVertical: Sizes.smartVerticalScale(5),
	},
	containerWithBorder: {
		borderBottomColor: Colors.grayNurse,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
	},
	badgeTextContainer: {
		width: Sizes.smartHorizontalScale(36),
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: Sizes.smartVerticalScale(5),
		borderRadius: 50,
	},
	badgeText: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(10),
		color: Colors.diminishedRed,
	},
	title: {
		flex: 8,
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.postFullName,
		paddingLeft: Sizes.smartVerticalScale(10),
	},
	percentValue: {
		flex: 3,
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.postText,
	},
};

export default StyleSheet.create(style);
