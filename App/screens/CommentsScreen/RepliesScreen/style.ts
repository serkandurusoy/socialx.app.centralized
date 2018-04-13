import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../theme';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	repliesList: {
		flex: 1,
	},
	inputContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		paddingVertical: Sizes.smartVerticalScale(5),
		borderTopColor: Colors.silverSand,
		borderTopWidth: 1,
		maxHeight: Sizes.smartVerticalScale(110),
		justifyContent: 'flex-end',
	},
	textInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		backgroundColor: Colors.dustWhite,
		borderRadius: Sizes.smartHorizontalScale(15),
		borderColor: Colors.silverSand,
		borderWidth: 1,
		paddingRight: Sizes.smartHorizontalScale(50),
		paddingLeft: Sizes.smartHorizontalScale(10),
		paddingVertical: Sizes.smartHorizontalScale(10),
	},
	sendButton: {
		position: 'absolute',
		right: Sizes.smartHorizontalScale(10),
		bottom: Sizes.smartHorizontalScale(8),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
};

export default StyleSheet.create(style);
