import moment from 'moment';
import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

import style from './style';
import {WallPostActions} from './WallPostActions';
import {WallPostComments} from './WallPostComments';

const NUMBER_OF_TEXT_LINES = 3;

export interface IWallPostCardProp {
	text: string;
	imageSource?: string;
	smallAvatar: string;
	fullName: string;
	timestamp: Date;
	numberOfLikes: number;
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
}

export class WallPostCard extends Component<IWallPostCardProp> {
	public static defaultProps: Partial<IWallPostCardProp> = {
		imageSource: undefined,
	};

	public likeButtonPressedHandler = () => {
		alert('Like this post');
	}

	public superLikeButtonPressedHandler = () => {
		alert('Super-Like this post');
	}

	public commentsButtonPressedHandler = () => {
		alert('Show comments for this post');
	}

	public walletCoinsButtonPressedHandler = () => {
		alert('Go to my wallet');
	}

	public shareButtonPressedHandler = () => {
		alert('Share this post');
	}

	public renderWallPostImage = () => {
		if (this.props.imageSource) {
			return <Image source={{uri: this.props.imageSource}} style={style.postImage} resizeMode={'cover'} />;
		}
		return null;
	}

	public render() {
		const timeStampDate = moment(this.props.timestamp).format('MMM DD');
		const timeStampHour = moment(this.props.timestamp).format('hh:mm A');
		return (
			<View style={style.container}>
				<View style={style.topContainer}>
					<Image source={{uri: this.props.smallAvatar}} style={style.smallAvatarImage} />
					<View style={style.topRightContainer}>
						<Text style={style.fullName}>{this.props.fullName}</Text>
						<Text style={style.timestamp}>
							{timeStampDate}
							{' at '}
							<Text style={style.timestampHour}>{timeStampHour}</Text>
						</Text>
					</View>
				</View>
				<Text style={style.postText} numberOfLines={NUMBER_OF_TEXT_LINES}>
					{this.props.text}
				</Text>
				{this.renderWallPostImage()}
				<WallPostActions
					numberOfLikes={this.props.numberOfLikes}
					numberOfSuperLikes={this.props.numberOfSuperLikes}
					numberOfComments={this.props.numberOfComments}
					numberOfWalletCoins={this.props.numberOfWalletCoins}
					likeButtonPressed={this.likeButtonPressedHandler}
					superLikeButtonPressed={this.superLikeButtonPressedHandler}
					commentsButtonPressed={this.commentsButtonPressedHandler}
					walletCoinsButtonPressed={this.walletCoinsButtonPressedHandler}
					shareButtonPressed={this.shareButtonPressedHandler}
				/>
				<WallPostComments />
			</View>
		);
	}
}
