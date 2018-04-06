import {StyleSheet} from 'react-native';
import {Sizes} from '../../../theme';

const DEFAULT_AVATAR_SIZE = Sizes.smartHorizontalScale(90);

const style: any = {
	avatarImage: {
		width: DEFAULT_AVATAR_SIZE,
		height: DEFAULT_AVATAR_SIZE,
		borderRadius: DEFAULT_AVATAR_SIZE / 2,
	},
};

export default StyleSheet.create(style);
