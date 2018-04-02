import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const AVATAR_SIZE = Sizes.smartHorizontalScale(30);

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
		// backgroundColor is required for a view with shadow
		backgroundColor: Colors.white,
		borderTopLeftRadius: Sizes.smartHorizontalScale(10),
		borderTopRightRadius: Sizes.smartHorizontalScale(10),
		borderBottomLeftRadius: Sizes.smartHorizontalScale(10),
		borderBottomRightRadius: Sizes.smartHorizontalScale(2),
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
	pureEmojiText: {
		fontSize: Sizes.smartHorizontalScale(44),
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
	inputContainer: {
		borderTopWidth: 0,
		justifyContent: 'center',
	},
	sendContainer: {
		justifyContent: 'flex-end',
		paddingBottom: Sizes.smartHorizontalScale(5),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
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
	shareButton: {
		marginLeft: Sizes.smartHorizontalScale(10),
		padding: Sizes.smartHorizontalScale(5),
	},
	chatImage: {
		width: '100%',
		height: Sizes.smartVerticalScale(145),
		borderRadius: Sizes.smartHorizontalScale(8),
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	friendFullName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		color: Colors.white,
		letterSpacing: Sizes.smartHorizontalScale(1),
	},
	friendAvatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		marginRight: Sizes.smartHorizontalScale(30),
		borderRadius: AVATAR_SIZE / 2,
	},
};

export default StyleSheet.create(style);
