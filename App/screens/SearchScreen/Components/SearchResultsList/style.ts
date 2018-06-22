import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const style: any = {
	resultsContainer: {
		flex: 1,
		width: '100%',
	},
	bottomLoadingContainer: {
		paddingVertical: Sizes.smartVerticalScale(20),
	},
};

export default StyleSheet.create(style);
