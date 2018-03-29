import {StyleSheet} from 'react-native';
import {Sizes} from '../../../../theme/';

const style: any = {
	container: {
		position: 'relative',
		width: '100%',
		justifyContent: 'center',
		paddingVertical: Sizes.smartVerticalScale(13),
	},
	percentageText: {
		position: 'absolute',
		left: '47%',
	},
};

export default StyleSheet.create(style);
