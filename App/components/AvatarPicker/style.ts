import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const AVATAR_SIZE = Sizes.smartHorizontalScale(80);

const style: any = {
	container: {
		padding: Sizes.smartHorizontalScale(10),
	},
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		borderWidth: 2,
		borderColor: Colors.pink,
	},
	editIcon: {
		position: 'absolute',
		padding: Sizes.smartHorizontalScale(5),
		bottom: Sizes.smartHorizontalScale(7),
		right: Sizes.smartHorizontalScale(7),
	},
};

export default StyleSheet.create(style);
