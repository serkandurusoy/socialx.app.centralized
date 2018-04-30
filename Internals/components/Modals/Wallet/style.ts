import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	container: {
		flex: 1,
		margin: 0,
		bottom: 0,
		position: 'relative',
	},
	boxContainer: {
		justifyContent: 'space-around',
		width: Sizes.smartHorizontalScale(350),
		position: 'absolute',
		marginHorizontal: Sizes.smartHorizontalScale(12),
		marginVertical: Sizes.smartHorizontalScale(10),
		backgroundColor: Colors.white,
		bottom: Sizes.smartVerticalScale(-90),
		borderRadius: Sizes.smartVerticalScale(8),
	},
	closeModalButtonContainer: {
		position: 'absolute',
		right: 0,
		paddingVertical: Sizes.smartHorizontalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	closeModalButton: {
		width: Sizes.smartHorizontalScale(15),
		height: Sizes.smartHorizontalScale(15),
	},
	topContainer: {
		alignItems: 'center',
	},
	topText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(24),
		color: Colors.postFullName,
		paddingBottom: Sizes.smartVerticalScale(36),
	},
	socialXIconContainer: {
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	socialXIcon: {
		height: Sizes.smartVerticalScale(60),
		width: Sizes.smartHorizontalScale(60),
	},
	blurView: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	containerSelected: {
		backgroundColor: Colors.catskillWhite,
	},
	isSendSelected: {
		width: Sizes.smartHorizontalScale(23),
		height: Sizes.smartHorizontalScale(23),
		alignSelf: 'center',
	},
	sendButtonContainer: {
		marginHorizontal: Sizes.smartHorizontalScale(15),
		marginBottom: Sizes.smartHorizontalScale(10),
		marginTop: Sizes.smartHorizontalScale(10),
	},
};

export default StyleSheet.create(style);
