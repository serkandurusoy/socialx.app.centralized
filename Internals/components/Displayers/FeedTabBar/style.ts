import {StyleSheet} from 'react-native';
import {Colors, Sizes} from 'theme';

const style: any = {
	container: {
		flexDirection: 'row',
		width: '100%',
		backgroundColor: Colors.white,
	},
	tabButton: {
		flex: 1,
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
	},
};

export default StyleSheet.create(style);
