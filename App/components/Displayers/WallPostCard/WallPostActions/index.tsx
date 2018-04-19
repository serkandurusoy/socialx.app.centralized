import React, {Component} from 'react';
import {View} from 'react-native';

import {Icons} from '../../../../theme';
import {IconButton} from '../../../Interaction';
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
		return (
			<View style={style.container}>
				<IconButton
					iconSource={Icons.iconPostWalletCoins}
					onPress={this.props.walletCoinsButtonPressed}
					label={this.props.numberOfWalletCoins + ' SOCX'}
				/>
				<View style={style.rightContainer}>
					{this.props.likedByMe ? (
						// TODO: create a proper liked icon
						<IconButton
							iconSource={Icons.iconTabBarNotificationsSelected}
							onPress={this.props.likeButtonPressed}
							label={this.props.numberOfLikes.toString()}
						/>
					) : (
						<IconButton
							iconSource={Icons.iconPostLike}
							onPress={this.props.likeButtonPressed}
							label={this.props.numberOfLikes.toString()}
						/>
					)}

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
				</View>
			</View>
		);
	}
}
