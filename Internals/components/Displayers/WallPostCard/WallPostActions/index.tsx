import React from 'react';
import {Text, View} from 'react-native';

import {IconButton} from 'components';
import {Colors, Icons} from 'theme';
import style from './style';

export interface IWallPostActions {
	likedByMe: boolean;
	numberOfSuperLikes: number;
	numberOfWalletCoins: number;
	likeButtonPressed?: Func;
	superLikeButtonPressed: Func;
	commentsButtonPressed: Func;
	walletCoinsButtonPressed: Func;
}

export const WallPostActions: React.SFC<IWallPostActions> = (props) => {
	const likeIconSource = props.likedByMe ? 'md-heart' : 'md-heart-outline';

	const likeColor = props.likedByMe ? Colors.red : Colors.black;
	const likeButtonStyles = [style.likeButton, {color: likeColor}];

	return (
		<View style={style.container}>
			{/* Text component for the container alignment, causes padding issues if empty */}
			<Text />
			{/* TODO: add when implmented: Socx Wallet / Post Total Rewards
				 <IconButton
					iconSource={Icons.iconPostWalletCoins}
					onPress={props.walletCoinsButtonPressed}
					label={props.numberOfWalletCoins + ' SOCX'}
				/> */}
			<View style={style.rightContainer}>
				<IconButton
					iconSource={likeIconSource}
					onPress={props.likeButtonPressed}
					changeWithAnimation={true}
					iconStyle={likeButtonStyles}
				/>

				{/* TODO: add when implemented: SuperLikes
					 <IconButton
						iconSource={Icons.iconPostSuperLike}
						onPress={props.superLikeButtonPressed}
						label={props.numberOfSuperLikes.toString()}
					/> */}
				<IconButton iconSource={Icons.iconPostComments} onPress={props.commentsButtonPressed} />
			</View>
		</View>
	);
};
