import React from 'react';
import {View} from 'react-native';

import {IconButton, LikeAnimatingButton} from 'components';
import styles from './style';

interface IPostActionsProps {
	likedByMe: boolean;
	onLikePress: (likedByMe?: boolean, postId?: string) => Promise<any>;
}

export const PostActions: React.SFC<IPostActionsProps> = ({likedByMe, onLikePress}) => (
	<View style={styles.container}>
		<LikeAnimatingButton onPress={onLikePress} likedByMe={likedByMe} />
		<IconButton iconSource='comment-o' iconType='fa' onPress={() => {}} iconStyle={styles.icon} />
	</View>
);
