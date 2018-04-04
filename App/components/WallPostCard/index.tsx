import moment from 'moment';
import React, {Component} from 'react';
import {findNodeHandle, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from '../../theme';
import Icons from '../../theme/Icons';
import {TooltipDots} from '../DotsWithTooltips';
import {ModalReportProblem} from '../ModalReportProblem';
import style from './style';
import {WallPostActions} from './WallPostActions';
import {WallPostComments} from './WallPostComments';

const DESCRIPTION_TEXT_LENGTH_SHORT = 140;

export interface IWallPostCardProp {
	title?: string;
	text?: string;
	imageSource?: string;
	location?: string;
	taggedFriends?: Array<{
		fullName: string;
	}>;
	smallAvatar: string;
	fullName: string;
	timestamp: Date;
	numberOfLikes: number;
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
}

export interface IWallPostCardState {
	fullDescriptionVisible: boolean;
	modalVisibleReportProblem: boolean;
	blurViewRef: any;
}

export class WallPostCard extends Component<IWallPostCardProp, IWallPostCardState> {
	public state = {
		fullDescriptionVisible: false,
		modalVisibleReportProblem: true,
		blurViewRef: null,
	};

	private blurView = null;

	public componentDidMount() {
		const blurViewHandle = findNodeHandle(this.blurView);
		this.setState({blurViewRef: blurViewHandle});
	}

	public render() {
		const timeStampDate = moment(this.props.timestamp).format('MMM DD');
		const timeStampHour = moment(this.props.timestamp).format('hh:mma');
		return (
			<View style={style.container}>
				<ModalReportProblem
					visible={this.state.modalVisibleReportProblem}
					// confirmHandler={() => this.toggleGroupInfoModal(true)}
					declineHandler={this.toggleDeclineReportModal}
					blurViewRef={this.state.blurViewRef}
				/>
				<View style={style.topContainer}>
					<Image source={{uri: this.props.smallAvatar}} style={style.smallAvatarImage} />
					<View style={style.topRightContainer}>
						<Text style={style.fullName}>
							{this.props.fullName}
							{this.renderTaggedFriends()}
							{this.renderLocation()}
						</Text>
						<Text style={style.timestamp}>{`${timeStampDate} at ${timeStampHour}`}</Text>
					</View>
					<TooltipDots
						items={this.getTooltipLines()}
						deleteHandler={this.tooltipsDeletePressedHandler}
						reportHandler={this.tooltipsReportPressedHandler}
					/>
				</View>
				{this.renderPostTitle()}
				{this.renderPostDescription()}
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

	private renderWallPostImage = () => {
		if (this.props.imageSource) {
			return <Image source={{uri: this.props.imageSource}} style={style.postImage} resizeMode={'cover'} />;
		}
		return null;
	}
	private shareButtonPressedHandler = () => {
		return <Image source={{uri: this.props.imageSource}} style={style.postImage} resizeMode={'cover'} />;
	}

	private renderTaggedFriends = () => {
		if (this.props.taggedFriends && this.props.taggedFriends.length > 0) {
			// prettier-ignore
			const ret = [
				(
					<Text style={style.grayText} key={0}>
						{' with '}
					</Text>
				),
				<Text key={1}>{this.props.taggedFriends[0].fullName}</Text>,
			];
			if (this.props.taggedFriends.length > 1) {
				ret.push(
					<Text style={style.grayText} key={2}>
						{' and '}
					</Text>,
				);
				ret.push(<Text key={3}>{`${this.props.taggedFriends.length - 1} others`}</Text>);
			}
			return ret;
		}
		return null;
	}

	private renderLocation = () => {
		if (this.props.location) {
			// prettier-ignore
			return [
				(
					<Text style={style.grayText} key={0}>
						{' at '}
					</Text>
				),
				(
					<View style={style.locationPin} key={1}>
						<Icon name={'md-pin'} size={Sizes.smartHorizontalScale(12)} color={Colors.postText}/>
					</View>
				),
				<Text key={2}>{' ' + this.props.location}</Text>,
			];
		}
		return null;
	}

	private tooltipsReportPressedHandler = () => {
		setTimeout(() => {
			this.setState({
				modalVisibleReportProblem: true,
			});
		}, 1000);
	}

	private renderPostDescription = () => {
		const {text} = this.props;
		if (text) {
			const hasMore = text.length > DESCRIPTION_TEXT_LENGTH_SHORT && !this.state.fullDescriptionVisible;
			const textToRender = hasMore ? text.substr(0, DESCRIPTION_TEXT_LENGTH_SHORT) + '...' : text;
			const showMoreButton = hasMore ? (
				<TouchableOpacity onPress={this.toggleShowFullDescription}>
					<Text style={style.showMoreText}>{'More'}</Text>
				</TouchableOpacity>
			) : null;
			return (
				<View style={style.postTextContainer}>
					<Text style={style.postText}>
						{textToRender}
						{showMoreButton}
					</Text>
				</View>
			);
		}
		return null;
	}

	private toggleShowFullDescription = () => {
		this.setState({
			fullDescriptionVisible: true,
		});
	}

	private renderPostTitle = () => {
		if (this.props.title) {
			return (
				<Text style={style.postTitle} numberOfLines={1}>
					{this.props.title}
				</Text>
			);
		}
		return null;
	}
	private toggleDeclineReportModal = () => {
		this.setState({
			modalVisibleReportProblem: !this.state.modalVisibleReportProblem,
		});
	}
	private getTooltipLines = () => {
		return [
			{
				label: 'Report a Problem',
				icon: Icons.iconReport,
				actionHandler: () => this.tooltipsReportPressedHandler(),
			},
			{
				label: 'Delete Post',
				icon: Icons.iconDelete,
				actionHandler: () => this.tooltipsDeletePressedHandler(),
			},
		];
	}
	private tooltipsDeletePressedHandler = () => {
		console.log('Delete this post');
	}

	private likeButtonPressedHandler = () => {
		alert('Like this post');
	}

	private superLikeButtonPressedHandler = () => {
		alert('Super-Like this post');
	}

	private commentsButtonPressedHandler = () => {
		alert('Show comments for this post');
	}

	private walletCoinsButtonPressedHandler = () => {
		alert('Go to my wallet');
	}
}
