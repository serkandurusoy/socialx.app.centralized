import moment from 'moment';
import React, {Component} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from 'theme';
import {Icons} from 'theme/Icons';
import {IMediaProps, IUserQuery} from 'types';
import {getURLForMediaViewerObject} from 'utilities';
import {IReportData, ModalReportProblem} from '../../Modals';
import {TooltipDots, TooltipItem} from '../DotsWithTooltips';
import style from './style';
import {WallPostActions} from './WallPostActions';
import {WallPostMedia} from './WallPostMedia';

const DESCRIPTION_TEXT_LENGTH_SHORT = 140;

export interface IWallPostCardProp {
	id: string;
	title?: string;
	text?: string;
	location?: string;
	taggedFriends?: Array<{
		// TODO: should be an array of IUserQuery
		fullName: string;
	}>;
	smallAvatar: string; // @deprecated, use instead owner!
	fullName: string; // @deprecated, use instead owner!
	timestamp: Date;
	numberOfLikes: number;
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
	onImageClick: (index: number) => void;
	onLikeButtonClick: () => void;
	onDeleteClick: (postId: string) => void;
	onUserClick: () => void;
	likedByMe?: boolean;
	canDelete: boolean;
	owner: IUserQuery;
	media: any;
	likes: any;
	navigation: NavigationScreenProp<any>;
}

export interface IWallPostCardState {
	fullDescriptionVisible: boolean;
	modalVisibleReportProblem: boolean;
}

export class WallPostCard extends Component<IWallPostCardProp, IWallPostCardState> {
	public static defaultProps: Partial<IWallPostCardProp> = {
		canDelete: false,
		title: 'Sample post title to be replace later',
	};

	public state = {
		fullDescriptionVisible: false,
		modalVisibleReportProblem: false,
	};

	public render() {
		const timeStampDate = moment(this.props.timestamp).format('MMM DD');
		const timeStampHour = moment(this.props.timestamp).format('hh:mma');
		return (
			<View style={style.container}>
				<ModalReportProblem
					visible={this.state.modalVisibleReportProblem}
					confirmHandler={this.reportProblemHandler}
					declineHandler={this.toggleDeclineReportModal}
				/>
				<TouchableOpacity onPress={this.props.onUserClick} style={style.topContainer}>
					<FastImage source={{uri: this.props.smallAvatar}} style={style.smallAvatarImage} />
					<View style={style.topRightContainer}>
						<TouchableOpacity onPress={this.showUserProfilePage}>
							<Text style={style.fullName}>
								{this.props.fullName}
								{this.renderTaggedFriends()}
								{this.renderLocation()}
							</Text>
						</TouchableOpacity>
						<Text style={style.timestamp}>{`${timeStampDate} at ${timeStampHour}`}</Text>
					</View>
					<TooltipDots items={this.getTooltipItems()} />
				</TouchableOpacity>
				{this.renderPostTitle()}
				{this.renderPostDescription()}
				<WallPostMedia mediaObjects={this.props.media} onMediaObjectView={this.onMediaObjectPressHandler} />
				<WallPostActions
					likedByMe={this.props.likedByMe}
					numberOfLikes={this.props.numberOfLikes}
					numberOfSuperLikes={this.props.numberOfSuperLikes}
					numberOfComments={this.props.numberOfComments}
					numberOfWalletCoins={this.props.numberOfWalletCoins}
					likeButtonPressed={this.props.onLikeButtonClick}
					superLikeButtonPressed={this.superLikeButtonPressedHandler}
					commentsButtonPressed={this.onCommentsButtonClickHandler}
					walletCoinsButtonPressed={this.walletCoinsButtonPressedHandler}
				/>
			</View>
		);
	}

	private renderWallPostMedia = () => {
		if (this.props.media.length > 2) {
			return this.renderMultiMediaPost(this.props.media);
		} else if (this.props.media.length > 1) {
			return this.renderDualMediaPost(this.props.media);
		} else if (this.props.media.length > 0) {
			return this.renderSingleMediaPost(this.props.media[0]);
		}
		return null;
	}

	private renderSingleMediaPost = (mediaProps: IMediaProps) => {
		const mediaURL = getURLForMediaViewerObject(mediaProps);
		return (
			<MediaObjectViewer
				onPress={() => this.props.onImageClick(0)}
				uri={mediaURL}
				style={style.postMediaContainer}
				extension={mediaProps.type}
			/>
		);
	}

	private renderDualMediaPost = (mediaProps: IMediaProps[], splitVertical = false, startIndex = 0) => {
		const firstMediaURL = getURLForMediaViewerObject(mediaProps[startIndex]);
		const secondMediaURL = getURLForMediaViewerObject(mediaProps[startIndex + 1]);
		const containerStyle = [style.postMediaContainer, !splitVertical ? {flexDirection: 'row'} : {}];
		const mediaContainerStyle = splitVertical ? style.halfMediaContainerVertical : style.halfMediaContainerHorizontal;
		return (
			<View style={containerStyle}>
				<View style={mediaContainerStyle}>
					<MediaObjectViewer
						onPress={() => this.props.onImageClick(startIndex)}
						thumbOnly={true}
						uri={firstMediaURL}
						style={style.halfMediaObject}
						extension={mediaProps[startIndex].type}
					/>
				</View>
				<View style={mediaContainerStyle}>
					<MediaObjectViewer
						onPress={() => this.props.onImageClick(startIndex + 1)}
						thumbOnly={true}
						uri={secondMediaURL}
						style={style.halfMediaObject}
						extension={mediaProps[startIndex + 1].type}
					/>
				</View>
			</View>
		);
	}

	private renderMultiMediaPost = (mediaProps: IMediaProps[]) => {
		const firstMediaURL = getURLForMediaViewerObject(mediaProps[0]);
		return (
			<View style={style.postMediaContainer}>
				<View style={style.halfMediaContainerHorizontal}>
					<MediaObjectViewer
						onPress={() => this.props.onImageClick(0)}
						thumbOnly={true}
						uri={firstMediaURL}
						style={style.halfMediaObject}
						extension={mediaProps[0].type}
					/>
				</View>
				<View style={style.halfMediaContainerHorizontal}>{this.renderDualMediaPost(mediaProps, true, 1)}</View>
				{this.renderDualMediaPost(mediaProps)}
			</View>
		);
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
					<Icon
						name={'md-pin'}
						size={Sizes.smartHorizontalScale(12)}
						color={Colors.postText}
						style={style.locationPin}
						key={1}
					/>
				),
				<Text key={2}>{' ' + this.props.location}</Text>,
			];
		}
		return null;
	}

	private tooltipsReportPressedHandler = () => {
		ModalManager.safeRunAfterModalClosed(() => {
			this.setState({
				modalVisibleReportProblem: true,
			});
		});
	}

	private renderPostDescription = () => {
		const {text} = this.props;
		if (text) {
			// due to an android limitation nesting a button in the end of the text is not possible, see
			// https://facebook.github.io/react-native/docs/text.html#nested-views-ios-only
			const hasMore =
				text.length > DESCRIPTION_TEXT_LENGTH_SHORT &&
				!this.state.fullDescriptionVisible &&
				Platform.OS === OS_TYPES.IOS;
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

	private getTooltipItems = (): TooltipItem[] => {
		const ret = [
			{
				label: 'Report a Problem',
				icon: Icons.iconReport,
				actionHandler: this.tooltipsReportPressedHandler,
			},
		];
		if (this.props.canDelete) {
			ret.push({
				label: 'Delete Post',
				icon: Icons.iconDelete,
				actionHandler: this.tooltipsDeletePressedHandler,
			});
		}
		return ret;
	}

	private tooltipsDeletePressedHandler = () => {
		this.props.onDeleteClick(this.props.id);
		// console.log('Delete this post');
	}

	private reportProblemHandler = (data: IReportData) => {
		this.toggleDeclineReportModal();
		// console.log('Report a problem', data);
	}

	private superLikeButtonPressedHandler = () => {
		alert('Super-Like this post');
	}

	private walletCoinsButtonPressedHandler = () => {
		alert('Go to my wallet');
	}

	private showUserProfilePage = () => {
		this.props.navigation.navigate('UserProfileScreen', {userId: this.props.owner.userId});
	}

	private onMediaObjectPressHandler = (index: number) => {
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects: this.props.media,
			startIndex: index,
		});
	}

	private onCommentsButtonClickHandler = () => {
		this.props.navigation.navigate('CommentsStack', {postId: this.props.id, userId: this.props.owner.userId});
	}
}
