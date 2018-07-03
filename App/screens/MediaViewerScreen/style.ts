import {Dimensions, StyleSheet} from 'react-native';
import {Colors, colorWithAlpha, Fonts, Sizes} from 'theme';

const INFO_BUTTON_SIZE = Sizes.smartHorizontalScale(40);

const style: any = {
	safeView: {
		backgroundColor: Colors.midnight,
		flex: 1,
	},
	carouselContainer: {
		height: '100%',
		width: '100%',
	},
	carouselMediaObject: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	screenFooter: {
		zIndex: 2,
		position: 'absolute',
		width: '100%',
		bottom: Sizes.smartVerticalScale(50),
	},
	paginationContainer: {
		alignItems: 'center',
		width: '100%',
	},
	paginationText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.dustWhite,
	},
	closeIcon: {
		position: 'absolute',
		right: Sizes.smartHorizontalScale(12),
		top: Sizes.smartHorizontalScale(12),
		padding: Sizes.smartHorizontalScale(10),
		zIndex: 2,
	},
	mediaInfoSection: {
		width: '100%',
		paddingBottom: Sizes.smartVerticalScale(20),
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		flexDirection: 'row',
	},
	infoText: {
		...Fonts.centuryGothic,
		color: Colors.white,
		fontSize: Sizes.smartHorizontalScale(16),
	},
	fullScreen: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: colorWithAlpha(Colors.black, 0.5), // TODO: remove this in the end
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(20),
		alignItems: 'flex-end',
	},
	infoIcon: {
		color: Colors.white,
		fontSize: Sizes.smartHorizontalScale(30),
	},
	infoButton: {
		width: INFO_BUTTON_SIZE,
		height: INFO_BUTTON_SIZE,
		alignItems: 'center',
		justifyContent: 'center',
	},
};

export default StyleSheet.create(style);
