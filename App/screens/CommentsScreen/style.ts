import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const style: any = {
	sampleText: {
		fontSize: 24,
		lineHeight: 42,
	},
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	commentsList: {
		flex: 1,
		// backgroundColor: 'lime',
	},
	inputContainer: {
		// backgroundColor: 'orange',
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		paddingVertical: Sizes.smartVerticalScale(5),
		borderTopColor: Colors.dustWhite,
		borderTopWidth: Sizes.smartHorizontalScale(1),
		maxHeight: Sizes.smartVerticalScale(100),
		// alignItems: 'center',
		justifyContent: 'flex-end',
	},
	textInput: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		backgroundColor: 'magenta',
		paddingRight: Sizes.smartHorizontalScale(50),
	},
	sendButton: {
		// TODO: height when single line text!
		position: 'absolute',
		right: Sizes.smartHorizontalScale(10),
		backgroundColor: 'lime',
		padding: Sizes.smartHorizontalScale(5),
	},
};

export default StyleSheet.create(style);
