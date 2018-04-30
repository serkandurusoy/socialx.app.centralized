import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const style: any = {
	carouselContainer: {
		height: '100%',
		width: '100%',
		backgroundColor: Colors.white,
	},
	carouselLandscapeContainer: {
		height: '100%',
		width: '100%',
		backgroundColor: Colors.white,
		position: 'absolute',
	},
	carouselImage: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.midnight,
	},
	paginationContainer: {
		zIndex: 2,
		position: 'absolute',
		bottom: Sizes.smartVerticalScale(50),
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
};

export default StyleSheet.create(style);
