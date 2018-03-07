import {Platform, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme/';

const style: any = {
	headerContainer: {
		paddingTop: Platform.OS === 'ios' ? 27 : 10,
		paddingBottom: 7,
		height: Metrics.navBarHeight,
		width: '100%',
		backgroundColor: Colors.pink,
		paddingHorizontal: 8,
	},
};

export default StyleSheet.create(style);
