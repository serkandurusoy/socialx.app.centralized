import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const style: any = {
	filterButtonsContainer: {
		flexDirection: 'row',
		width: '100%',
		borderBottomWidth: Sizes.smartHorizontalScale(1),
		borderBottomColor: Colors.iron2,
	},
	searchButton: {
		flex: 1,
	},
};

export default StyleSheet.create(style);
