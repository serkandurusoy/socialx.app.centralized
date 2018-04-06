import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../theme';

const style: any = {
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		marginBottom: Sizes.smartHorizontalScale(21),
		height: Sizes.smartVerticalScale(41),
		borderRadius: 0,
	},
	labelContainer: {
		flex: 4,
	},
	inputContainer: {
		flex: 7,
	},
	rightContainer: {
		flex: 2,
	},
	leftLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.postFullName,
	},
	rightLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.tundora,
	},
};

export default StyleSheet.create(style);
