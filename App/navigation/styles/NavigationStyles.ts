import {OS_TYPES} from 'consts';
import {Platform, StyleSheet} from 'react-native';
import {Colors} from 'theme/index';

export default StyleSheet.create({
	header: {
		backgroundColor: Colors.pink,
		height: Platform.OS === OS_TYPES.IOS ? 34 : 44,
	},
});
