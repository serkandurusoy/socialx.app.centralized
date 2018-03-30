import {StyleSheet} from 'react-native';
import {Sizes} from '../../../../theme/';

const CHART_SIZE = Sizes.smartHorizontalScale(170);

const style: any = {
	container: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	percentageText: {
		position: 'absolute',
	},
	chart: {
		width: CHART_SIZE,
		height: CHART_SIZE,
	},
};

export default StyleSheet.create(style);
