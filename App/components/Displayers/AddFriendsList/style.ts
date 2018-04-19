import {StyleSheet} from 'react-native';
import {Sizes} from '../../../theme';

const FRIEND_AVATAR_SIZE = Sizes.smartHorizontalScale(22);

const style: any = {
	tagFriendsContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	taggedFriendsScroll: {
		flex: 1,
		borderRadius: Sizes.smartHorizontalScale(30),
		marginRight: Sizes.smartHorizontalScale(15),
	},
	tagFriendsButton: {
		padding: Sizes.smartHorizontalScale(5),
	},
	taggedFriendIcon: {
		width: FRIEND_AVATAR_SIZE,
		height: FRIEND_AVATAR_SIZE,
		borderRadius: FRIEND_AVATAR_SIZE / 2,
		marginRight: Sizes.smartHorizontalScale(10),
		marginVertical: Sizes.smartHorizontalScale(10),
	},
};

export default StyleSheet.create(style);
