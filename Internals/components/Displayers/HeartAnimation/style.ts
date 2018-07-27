import {StyleSheet} from 'react-native';
import {Sizes} from 'theme';

const style: any = {
	container: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	animation: {
		width: Sizes.smartHorizontalScale(100),
		height: Sizes.smartHorizontalScale(100),
	},
};

export default StyleSheet.create(style);
