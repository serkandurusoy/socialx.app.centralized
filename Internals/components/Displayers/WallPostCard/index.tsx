import moment from 'moment';
import React, {Component} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import {OS_TYPES} from 'consts';
import {ModalManager} from 'hoc';
import {Colors, Sizes} from 'theme';
import {Icons} from 'theme/Icons';
import {IMediaProps, IUserQuery} from 'types';
import {getUserAvatar, getUserFullName} from 'utilities';
import {IReportData, ModalReportProblem} from '../../Modals';
import {TooltipDots, TooltipItem} from '../DotsWithTooltips';
import style from './style';
import {WallPostActions} from './WallPostActions';
import {WallPostMedia} from './WallPostMedia';

import ParsedText from 'lib/textParser';

const DESCRIPTION_TEXT_LENGTH_SHORT = 140;
const TITLE_MAX_LINES = 3;

export interface ISimpleWallPostCardProps {
	id: string;
	title?: string;
	text?: string;
	location?: string;
	taggedFriends?: Array<{
		// TODO: should be an array of IUserQuery
		fullName: string;
	}>;
	timestamp: Date;
	owner: IUserQuery;
}

export interface IWallPostCardProp extends ISimpleWallPostCardProps {
	governanceVersion?: boolean;
	numberOfLikes?: number;
	numberOfSuperLikes?: number;
	numberOfComments?: number;
	numberOfWalletCoins?: number;
	onImageClick?: (index: number) => void;
	onLikeButtonClick?: () => void;
	onDeleteClick?: (postId: string) => void;
	onUserClick?: () => void;
	onCommentClick?: () => void;
	likedByMe?: boolean;
	canDelete?: boolean;
	media: IMediaProps[];
	likes?: any;
}

export interface IWallPostCardState {
	fullTitleVisible: boolean;
	fullDescriptionVisible: boolean;
	modalVisibleReportProblem: boolean;
	hideAdvancedMenu: boolean;
	hideGoToUserProfile: boolean;
	hidePostActionsAndComments: boolean;
	disableMediaFullScreen: boolean;
}

export class WallPostCard extends Component<IWallPostCardProp, IWallPostCardState> {
	public static defaultProps: Partial<IWallPostCardProp> = {
		canDelete: false,
		likedByMe: false,
		numberOfLikes: 0,
		numberOfSuperLikes: 0,
		numberOfComments: 0,
		numberOfWalletCoins: 0,
		onLikeButtonClick: () => Function,
		onCommentClick: () => Function,
	};

	public state = {
		fullTitleVisible: false,
		fullDescriptionVisible: false,
		modalVisibleReportProblem: false,
		hideAdvancedMenu: this.props.governanceVersion || false,
		hideGoToUserProfile: this.props.governanceVersion || false,
		hidePostActionsAndComments: this.props.governanceVersion || false,
		disableMediaFullScreen: this.props.governanceVersion || false,
	};

	public shouldComponentUpdate(
		nextProps: Readonly<IWallPostCardProp>,
		nextState: Readonly<IWallPostCardState>,
	): boolean {
		return (
			this.props.id !== nextProps.id ||
			this.props.numberOfLikes !== nextProps.numberOfLikes ||
			this.props.numberOfComments !== nextProps.numberOfComments ||
			this.state.modalVisibleReportProblem !== nextState.modalVisibleReportProblem ||
			this.state.fullTitleVisible !== nextState.fullTitleVisible ||
			this.state.fullDescriptionVisible !== nextState.fullDescriptionVisible
		);
	}

	public render() {
		return (
			<View style={style.container}>
				{this.renderModalReportProblem()}
				{this.renderUserDetails()}
				{this.renderPostTitle()}
				{this.renderPostDescription()}
				{this.renderWallPostMedia()}
				{this.renderWallPostActions()}
			</View>
		);
	}

	private renderModalReportProblem = () => {
		if (!this.state.hideAdvancedMenu) {
			return (
				<ModalReportProblem
					visible={this.state.modalVisibleReportProblem}
					confirmHandler={this.reportProblemHandler}
					declineHandler={this.toggleDeclineReportModal}
				/>
			);
		}
		return null;
	};

	private renderUserDetails = () => {
		const timeStampDate = moment(this.props.timestamp).format('MMM DD');
		const timeStampHour = moment(this.props.timestamp).format('hh:mma');
		const avatarURL = getUserAvatar(this.props.owner);
		const fullName = getUserFullName(this.props.owner);
		return (
			<TouchableOpacity
				onPress={this.props.onUserClick}
				style={style.topContainer}
				disabled={this.state.hideGoToUserProfile}
			>
				<FastImage source={{uri: avatarURL}} style={style.smallAvatarImage} />
				<View style={style.topRightContainer}>
					<Text style={style.fullName}>
						{fullName}
						{this.renderTaggedFriends()}
						{this.renderLocation()}
					</Text>
					<Text style={style.timestamp}>{`${timeStampDate} at ${timeStampHour}`}</Text>
				</View>
				{!this.state.hideAdvancedMenu && <TooltipDots items={this.getTooltipItems()} />}
			</TouchableOpacity>
		);
	};

	// todo @serkan @jake what???
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
	};

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
	};

	private tooltipsReportPressedHandler = () => {
		// @ionut TODO not working?
		ModalManager.safeRunAfterModalClosed(() => {
			this.setState({
				modalVisibleReportProblem: true,
			});
		});
	};

	private renderWallPostMedia = () => {
		return (
			<WallPostMedia
				mediaObjects={this.props.media}
				onMediaObjectView={this.props.onImageClick}
				noInteraction={this.state.disableMediaFullScreen}
			/>
		);
	};

	private renderPostDescription = () => {
		const {text, title} = this.props;
		if (text && title) {
			// if post has both title and text show here the text part!
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
	};

	private renderPostTitle = () => {
		let title = this.props.title || this.props.text;
		// if no title present use the text part as title!
		if (title) {
			try {
				title = atob(title);
			} catch (ex) {
				// console.log('Base64 decode failed', ex);
			}
			if (Platform.OS === OS_TYPES.Android) {
				return (
					<View style={style.postTitlePadding}>
						<ParsedText
							style={style.postTitle}
							childrenProps={{allowFontScaling: false}}
							parse={[
								{
									type: 'hashtag',
									style: style.hashtag,
									onPress: () => {
										console.log('Hashtags!! Coming soon..');
									},
								},
								{
									type: 'tags',
									style: style.tag,
									onPress: () => {
										console.log('Tags!!! Coming soon..');
									},
								},
							]}
						>
							{title}
						</ParsedText>
					</View>
				);
			} else {
				const numberOfLines = title.split('\n').length;

				const hasMore =
					(title.length > DESCRIPTION_TEXT_LENGTH_SHORT || numberOfLines > TITLE_MAX_LINES) &&
					!this.state.fullTitleVisible;

				let textToRender = title;

				if (hasMore) {
					if (numberOfLines > TITLE_MAX_LINES) {
						textToRender = textToRender
							.split('\n')
							.slice(0, TITLE_MAX_LINES)
							.join('\n');
					}

					if (title.length > DESCRIPTION_TEXT_LENGTH_SHORT) {
						textToRender = textToRender.substr(0, DESCRIPTION_TEXT_LENGTH_SHORT);
					}

					textToRender = textToRender + '...';
				}

				const showMoreButton = hasMore ? (
					<TouchableOpacity onPress={this.toggleShowFullTitle}>
						<Text style={style.showMoreText}>{'More'}</Text>
					</TouchableOpacity>
				) : null;

				return (
					<View style={style.postTitlePadding}>
						<ParsedText
							style={style.postTitle}
							childrenProps={{allowFontScaling: false}}
							parse={[
								{
									type: 'hashtag',
									style: style.hashtag,
									onPress: console.log('Hashtags!! Coming soon..'),
								},
								{
									type: 'tag',
									style: style.tag,
									onPress: console.log('Tags!!! Coming soon..'),
								},
							]}
						>
							{textToRender}
							{showMoreButton}
						</ParsedText>
					</View>
				);
			}
		}
		return null;
	};

	private renderWallPostActions = () => {
		if (!this.state.hidePostActionsAndComments) {
			return (
				<WallPostActions
					likedByMe={this.props.likedByMe}
					numberOfLikes={this.props.numberOfLikes}
					numberOfSuperLikes={this.props.numberOfSuperLikes}
					numberOfComments={this.props.numberOfComments}
					numberOfWalletCoins={this.props.numberOfWalletCoins}
					likeButtonPressed={this.props.onLikeButtonClick}
					superLikeButtonPressed={this.superLikeButtonPressedHandler}
					commentsButtonPressed={this.props.onCommentClick}
					walletCoinsButtonPressed={this.walletCoinsButtonPressedHandler}
				/>
			);
		}
		return null;
	};

	private toggleShowFullDescription = () => {
		this.setState({
			fullDescriptionVisible: true,
		});
	};

	private toggleShowFullTitle = () => {
		this.setState({
			fullTitleVisible: true,
		});
	};

	private toggleDeclineReportModal = () => {
		this.setState({
			modalVisibleReportProblem: !this.state.modalVisibleReportProblem,
		});
	};

	private getTooltipItems = (): TooltipItem[] => [
		{
			label: 'Block',
			icon: Icons.redRoundCross,
			actionHandler: () => {
				ModalManager.safeRunAfterModalClosed(() => {
					alert('Coming soon..');
				});
			},
		},
		{
			label: 'Report a Problem',
			icon: Icons.iconReport,
			actionHandler: this.tooltipsReportPressedHandler,
		},
		...(this.props.canDelete
			? [
					{
						label: 'Delete Post',
						icon: Icons.iconDelete,
						actionHandler: this.tooltipsDeletePressedHandler,
					},
			  ]
			: []),
	];

	private tooltipsDeletePressedHandler = () => {
		this.props.onDeleteClick(this.props.id);
		// console.log('Delete this post');
	};

	private reportProblemHandler = (data: IReportData) => {
		this.toggleDeclineReportModal();
		// console.log('Report a problem', data);
	};

	private superLikeButtonPressedHandler = () => {
		alert('Super-Like this post');
	};

	private walletCoinsButtonPressedHandler = () => {
		alert('Go to my wallet');
	};
}
