import {StyleSheet} from 'react-native';
import {Sizes} from 'theme';

export const AVATAR_SIZE = Sizes.smartHorizontalScale(90);

const style: any = {
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
};

export default StyleSheet.create(style);
