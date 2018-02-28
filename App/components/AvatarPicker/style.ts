import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const AVATAR_SIZE = Sizes.smartHorizontalScale(60);

const style: any = {
	container: {
		padding: Sizes.smartHorizontalScale(10),
	},
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	editIcon: {
		position: 'absolute',
		bottom: 5,
		right: 5,
	},
};

export default StyleSheet.create(style);
