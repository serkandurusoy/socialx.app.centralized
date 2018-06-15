import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme/';

const style: any = {
	mainContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	image: {
		width: 320,
		height: 320,
	},
	text: {
		color: 'rgba(255, 255, 255, 0.8)',
		backgroundColor: 'transparent',
		textAlign: 'center',
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 22,
		color: 'white',
		backgroundColor: 'transparent',
		textAlign: 'center',
		marginBottom: 16,
	},
	buttonCircle: {
		width: 40,
		height: 40,
		backgroundColor: 'rgba(0, 0, 0, .2)',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	nextIcon: {
		backgroundColor: 'transparent',
		color: 'rgba(255, 255, 255, .9)',
		fontSize: 24,
	},
};

export default StyleSheet.create(style);
