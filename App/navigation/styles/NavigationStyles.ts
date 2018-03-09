import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../theme/index';

export default StyleSheet.create({
	header: {
		backgroundColor: Colors.pink,
		height: Platform.OS === 'ios' ? 34 : 44,
	},
});
