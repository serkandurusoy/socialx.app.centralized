import React from 'react';
import {Text, View} from 'react-native';

import styles from './style';

interface IPostLikesProps {
	likes: any[];
	numberOfLikes: number;
	getText: (value: string, ...args: any[]) => string;
}

export const PostLikes: React.SFC<IPostLikesProps> = ({likes, numberOfLikes, getText}) => {
	if (numberOfLikes && numberOfLikes > 0) {
		const lastLikeUser = likes[numberOfLikes - 1];
		const numberOfOtherLikes = numberOfLikes - 1;
		const secondLastLike = numberOfLikes >= 2 ? likes[numberOfLikes - 2] : null;
		const andText = ` ${getText('text.and')} `;

		return (
			<View style={styles.container}>
				<Text style={styles.text}>
					{getText('post.card.liked.by') + ' '}
					<Text style={styles.bold} onPress={() => {}}>
						{lastLikeUser.userName}
					</Text>
				</Text>
				{numberOfOtherLikes === 1 && (
					<Text style={styles.text}>
						{andText}
						<Text style={styles.bold} onPress={() => {}}>
							{secondLastLike.userName}
						</Text>
					</Text>
				)}
				{numberOfOtherLikes > 1 && (
					<Text style={styles.text}>
						{andText}
						<Text style={styles.bold}>{numberOfOtherLikes + ' others'}</Text>
					</Text>
				)}
			</View>
		);
	}
	return null;
};
