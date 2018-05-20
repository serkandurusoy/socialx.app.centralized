import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const style: any = {
	container: {
		flex: 1,
		margin: 0,
		paddingHorizontal: Sizes.smartHorizontalScale(32),
	},
	boxContainer: {
		backgroundColor: Colors.white,
		alignItems: 'center',
		borderRadius: Sizes.smartHorizontalScale(9),
		maxWidth: 500,
		shadowColor: Colors.black,
		shadowOffset: {width: 0, height: 4},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		width: '100%',
		overflow: 'hidden',
	},
	titleContainer: {
		width: '100%',
		backgroundColor: Colors.pink,
		alignItems: 'center',
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.white,
		paddingTop: Sizes.smartVerticalScale(14),
		paddingBottom: Sizes.smartVerticalScale(21),
	},
	postContainer: {
		paddingVertical: Sizes.smartVerticalScale(15),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
	buttonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderTopWidth: Sizes.smartHorizontalScale(1),
		borderTopColor: Colors.mercury,
	},
	button: {
		alignItems: 'center',
		paddingVertical: Sizes.smartVerticalScale(16),
		flex: 1,
	},
	leftButton: {
		borderRightColor: Colors.mercury,
		borderRightWidth: Sizes.smartHorizontalScale(1),
	},
	backContainer: {
		position: 'absolute',
		left: 0,
		justifyContent: 'center',
		height: '100%',
	},
};

export default StyleSheet.create(style);
