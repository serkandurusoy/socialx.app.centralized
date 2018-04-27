import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../theme/';

const style: any = {
	container: {
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(30),
		paddingTop: Sizes.smartHorizontalScale(10),
		borderBottomWidth: Sizes.smartHorizontalScale(0.5),
		borderBottomColor: Colors.dustWhite,
		alignItems: 'center',
	},
	containerPaddingBottom: {
		paddingBottom: Sizes.smartHorizontalScale(18),
	},
	dataRow: {
		flexDirection: 'row',
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(22),
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.postFullName,
		paddingRight: '3%',
		width: '70%',
	},
	valueAndUnit: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.postText,
		width: '30%',
		paddingLeft: '2%',
		textAlign: 'center',
	},
	moreDetailsContainer: {
		height: Sizes.smartHorizontalScale(27),
		justifyContent: 'center',
		width: '100%',
	},
	moreDetailsLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(10),
		color: Colors.postHour,
	},
};

export default StyleSheet.create(style);
