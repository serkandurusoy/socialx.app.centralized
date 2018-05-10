import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		marginBottom: Sizes.smartHorizontalScale(21),
	},
	inputContainer: {
		flex: 5,
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
	leftLabel: {
		flex: 3.4,
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.postFullName,
	},
	rightLabel: {
		flex: 1.6,
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.tundora,
	},
	valueText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(22),
		color: Colors.postFullName,
	},
};

export default StyleSheet.create(style);
