import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	messageContainer: {
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		paddingVertical: Sizes.smartHorizontalScale(10),
	},
	ownMessageShadow: {
		shadowColor: Colors.hollywoodCerise,
		shadowOffset: {width: 0, height: 8},
		shadowOpacity: 0.3,
		shadowRadius: 25,
		elevation: 3,
		maxWidth: '60%',
	},
	ownMessageGradient: {
		paddingVertical: Sizes.smartHorizontalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		borderTopLeftRadius: Sizes.smartHorizontalScale(10),
		borderTopRightRadius: Sizes.smartHorizontalScale(10),
		borderBottomLeftRadius: Sizes.smartHorizontalScale(10),
		borderBottomRightRadius: Sizes.smartHorizontalScale(2),
		overflow: 'hidden',
	},
	ownMessageText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(22),
		color: Colors.white,
	},
	ownMessageDate: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(10),
		color: Colors.white,
		paddingTop: Sizes.smartVerticalScale(8),
	},
	friendMessageBorder: {
		borderWidth: Sizes.smartHorizontalScale(1),
		borderColor: Colors.geyser,
		paddingVertical: Sizes.smartHorizontalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		borderTopLeftRadius: Sizes.smartHorizontalScale(10),
		borderTopRightRadius: Sizes.smartHorizontalScale(10),
		borderBottomLeftRadius: Sizes.smartHorizontalScale(2),
		borderBottomRightRadius: Sizes.smartHorizontalScale(10),
		maxWidth: '60%',
	},
	friendMessageText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(22),
		color: Colors.postText,
	},
	friendMessageDate: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(10),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(8),
	},
	inputToolbar: {
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartHorizontalScale(4),
		flexDirection: 'row',
		alignItems: 'center',
		// backgroundColor: 'lime',
	},
	shareButton: {
		marginLeft: Sizes.smartHorizontalScale(11),
		padding: Sizes.smartHorizontalScale(5),
	},
	textInputStyles: {
		borderColor: Colors.chatTextInputBorder,
		borderWidth: Sizes.smartHorizontalScale(0.5),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		marginRight: Sizes.smartHorizontalScale(10),
		borderRadius: Sizes.smartHorizontalScale(5),
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		height: Sizes.smartHorizontalScale(29),
	},
};

export default StyleSheet.create(style);
