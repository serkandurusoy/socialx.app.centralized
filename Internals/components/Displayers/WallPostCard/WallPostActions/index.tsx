import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {IconButton} from 'components';
import {Icons} from 'theme';
import style from './style';

export interface IWallPostActions {
	likedByMe: boolean;
	numberOfLikes: number;
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
	likeButtonPressed: Func;
	superLikeButtonPressed: Func;
	commentsButtonPressed: Func;
	walletCoinsButtonPressed: Func;
}

export class WallPostActions extends Component<IWallPostActions> {
	public render() {
		const likeIconSource = this.props.likedByMe ? Icons.likeIconBlueFilled : Icons.likeIconBlueOutline;
		return (
			<View style={style.container}>
				{/* Text component for the container alignment, causes padding issues if empty */}
				<Text />
				{/* TODO: add when implmented: Socx Wallet / Post Total Rewards
				 <IconButton
					iconSource={Icons.iconPostWalletCoins}
					onPress={this.props.walletCoinsButtonPressed}
					label={this.props.numberOfWalletCoins + ' SOCX'}
				/> */}
				<View style={style.rightContainer}>
					<IconButton
						iconSource={likeIconSource}
						onPress={this.props.likeButtonPressed}
						changeWithAnimation={true}
						label={this.props.numberOfLikes.toString()}
					/>

					{/* TODO: add when implemented: SuperLikes
					 <IconButton
						iconSource={Icons.iconPostSuperLike}
						onPress={this.props.superLikeButtonPressed}
						label={this.props.numberOfSuperLikes.toString()}
					/> */}
					<IconButton
						iconSource={Icons.iconPostComments}
						onPress={this.props.commentsButtonPressed}
						label={this.props.numberOfComments.toString()}
					/>
				</View>
			</View>
		);
	}
}
