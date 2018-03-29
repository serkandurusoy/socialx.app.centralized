import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../../theme/';

const style: any = {
	container: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		paddingVertical: Sizes.smartVerticalScale(5),
		borderBottomColor: Colors.grayNurse,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
	},
	leftTextContainer: {
		width: Sizes.smartHorizontalScale(36),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.grayNurse,
		paddingVertical: Sizes.smartVerticalScale(5),
		borderRadius: 50,
	},
	leftText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(10),
		fontWeight: 'bold',
		color: Colors.diminishedRed,
	},
	centerText: {
		flex: 8,
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.postFullName,
		paddingLeft: Sizes.smartVerticalScale(10),
	},
	rightText: {
		flex: 3,
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.postText,
	},
};

export default StyleSheet.create(style);
