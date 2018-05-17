import {StyleSheet} from 'react-native';
import {Colors, Sizes} from 'theme';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	topBar: {
		flexDirection: 'row',
	},
	topBarContent: {
		minWidth: '100%',
	},
	tabButton: {
		flex: 1,
		paddingHorizontal: Sizes.smartHorizontalScale(10),
	},
};

export default StyleSheet.create(style);
