import {Platform, StyleSheet} from 'react-native';
import {OS_TYPES} from '../../constants';
import {Colors} from '../../theme/index';

export default StyleSheet.create({
	header: {
		backgroundColor: Colors.pink,
		height: Platform.OS === OS_TYPES.iOS ? 34 : 44,
	},
});
