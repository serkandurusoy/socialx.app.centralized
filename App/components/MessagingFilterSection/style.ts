import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const ICON_SIZE = Sizes.smartHorizontalScale(49);

const style: any = {
	container: {
		paddingHorizontal: Sizes.smartHorizontalScale(12),
		flexDirection: 'row',
		width: '100%',
		paddingTop: Sizes.smartHorizontalScale(10),
		paddingBottom: Sizes.smartHorizontalScale(13),
		borderTopColor: Colors.dustWhite,
		borderTopWidth: Sizes.smartHorizontalScale(1),
		borderBottomColor: Colors.dustWhite,
		borderBottomWidth: Sizes.smartHorizontalScale(1),
	},
	buttonContainer: {
		flex: 1,
		alignItems: 'center',
	},
	button: {
		alignItems: 'center',
	},
	buttonLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
	},
	buttonLabelInactive: {
		opacity: 0.5,
	},
	buttonIcon: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		marginBottom: Sizes.smartVerticalScale(4),
	},
};

export default StyleSheet.create(style);
