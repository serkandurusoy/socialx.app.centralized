import {StyleSheet} from 'react-native';
import {Colors, Sizes} from 'theme';

const style: any = {
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: Sizes.smartVerticalScale(10),
	},
	imageContainer: {
		flex: 2,
		alignItems: 'flex-end',
	},
	dataContainer: {
		flex: 3,
		height: '100%',
		alignItems: 'center',
	},
	buttonContainer: {
		marginHorizontal: '25%',
		width: '50%',
		height: Sizes.smartVerticalScale(25),
		borderRadius: Sizes.smartHorizontalScale(4),
		backgroundColor: Colors.white,
	},
};

export default StyleSheet.create(style);
