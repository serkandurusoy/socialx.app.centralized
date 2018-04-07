import React, {Component} from 'react';
import {View} from 'react-native';

import {Icons} from '../../../../theme';
import {IconButton} from '../../../Interaction';
import style from './style';

export interface IWallPostActions {
	numberOfLikes: number;
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
	likeButtonPressed: Func;
	superLikeButtonPressed: Func;
	commentsButtonPressed: Func;
	walletCoinsButtonPressed: Func;
	shareButtonPressed: Func;
}

export class WallPostActions extends Component<IWallPostActions> {
	public render() {
		return (
			<View style={style.container}>
				<IconButton
					iconSource={Icons.iconPostWalletCoins}
					onPress={this.props.walletCoinsButtonPressed}
					label={this.props.numberOfWalletCoins + ' SOCX'}
				/>
				<View style={style.rightContainer}>
					<IconButton
						iconSource={Icons.iconPostLike}
						onPress={this.props.likeButtonPressed}
						label={this.props.numberOfLikes.toString()}
					/>
					<IconButton
						iconSource={Icons.iconPostSuperLike}
						onPress={this.props.superLikeButtonPressed}
						label={this.props.numberOfSuperLikes.toString()}
					/>
					<IconButton
						iconSource={Icons.iconPostComments}
						onPress={this.props.commentsButtonPressed}
						label={this.props.numberOfComments.toString()}
					/>
					<IconButton iconSource={Icons.iconPostShare} onPress={this.props.shareButtonPressed} />
				</View>
			</View>
		);
	}
}