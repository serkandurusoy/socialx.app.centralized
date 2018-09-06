// MIGRATION: migrated to components/displayers/WallPostCard


import moment from 'moment';
import React, {Component, RefObject} from 'react';
import {Animated, Dimensions, Keyboard, Linking, Platform, Text, TouchableOpacity, View} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {compose} from 'recompose';

import {blockUserHoc} from 'backend/graphql';
import {HeartAnimation, InputSizes, ISuggestionCardItem, ParsedText, SXTextInput, TRKeyboardKeys} from 'components';
import {OS_TYPES} from 'consts';
import {ModalManager} from 'hoc';
import {Colors, Sizes} from 'theme';
import {Icons} from 'theme/Icons';
import {IMediaProps, ISimpleComment, IUserQuery} from 'types';
import {getUserAvatar, IWithTranslationProps, showToastMessage, withTranslations} from 'utilities';
import {IReportData, ModalReportProblem} from '../../Modals';
import {TooltipDots, TooltipItem} from '../DotsWithTooltips';
import style from './style';
import {WallPostActions} from './WallPostActions';
import {WallPostMedia} from './WallPostMedia';

import {AnimatedFastImage} from 'configuration';

const POST_SHORT_LENGTH = 100;
const POST_SHORT_MAX_LINES = 3;
const SCREEN_WIDTH = Dimensions.get('window').width;

export interface ISimpleWallPostCardProps {
	id: string;
	text?: string;
	location?: string;
	taggedFriends?: Array<{
		// TODO: should be an array of IUserQuery
		fullName: string;
	}>;
	timestamp: Date;
	owner: IUserQuery;
	blockUser: any;
	currentUser: IUserQuery;
}

export interface IWallPostCardProp extends ISimpleWallPostCardProps, IWithTranslationProps {
	governanceVersion?: boolean;
	numberOfLikes?: number;
	numberOfSuperLikes?: number;
	numberOfComments?: number;
	numberOfWalletCoins?: number;
	onImageClick?: (index: number) => void;
	onLikeButtonClick?: () => Promise<any>;
	onDeleteClick?: (postId: string) => void;
	onUserClick?: (userId: string) => void;
	onCommentClick: (startComment: boolean) => void;
	onAddComment: (height: number) => void;
	likedByMe?: boolean;
	canDelete?: boolean;
	Media?: IMediaProps[];
	media?: IMediaProps[];
	likes?: any;
	bestComments: ISimpleComment[];
	listLoading: boolean;
	suggested?: ISuggestionCardItem[];
	noInput: boolean;
}

export interface IWallPostCardState {
	fullTextVisible: boolean;
	modalVisibleReportProblem: boolean;
	hideAdvancedMenu: boolean;
	hideGoToUserProfile: boolean;
	hidePostActionsAndComments: boolean;
	disableMediaFullScreen: boolean;
	heartAnimation: boolean;
	comment: string;
	inputFocused: boolean;
	inputBorderWidth: Animated.Value;
	inputAvatarWidth: Animated.Value;
	inputAvatarHeight: Animated.Value;
}

class WallPostCardComp extends Component<IWallPostCardProp, IWallPostCardState> {
	public static defaultProps: Partial<IWallPostCardProp> = {
		canDelete: false,
		likedByMe: false,
		numberOfLikes: 0,
		numberOfSuperLikes: 0,
		numberOfComments: 0,
		numberOfWalletCoins: 0,
	};

	public state = {
		fullTextVisible: false,
		modalVisibleReportProblem: false,
		hideAdvancedMenu: this.props.governanceVersion || false,
		hideGoToUserProfile: this.props.governanceVersion || false,
		hidePostActionsAndComments: this.props.governanceVersion || false,
		disableMediaFullScreen: this.props.governanceVersion || false,
		heartAnimation: false,
		comment: '',
		inputFocused: false,
		inputBorderWidth: new Animated.Value(0),
		inputAvatarWidth: new Animated.Value(25),
		inputAvatarHeight: new Animated.Value(25),
	};

	private readonly containerViewRef: RefObject<View> = React.createRef();
	private keyboardDidHideListener: any;

	public componentDidMount() {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustNothing();
		}
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

	public shouldComponentUpdate(
		nextProps: Readonly<IWallPostCardProp>,
		nextState: Readonly<IWallPostCardState>,
	): boolean {
		return (
			this.props.id !== nextProps.id ||
			this.props.numberOfLikes !== nextProps.numberOfLikes ||
			this.props.numberOfComments !== nextProps.numberOfComments ||
			this.state.modalVisibleReportProblem !== nextState.modalVisibleReportProblem ||
			this.state.fullTextVisible !== nextState.fullTextVisible ||
			this.state.heartAnimation !== nextState.heartAnimation ||
			this.state.comment !== nextState.comment ||
			this.state.inputFocused !== nextState.inputFocused ||
			this.state.inputBorderWidth !== nextState.inputBorderWidth ||
			this.state.inputAvatarWidth !== nextState.inputAvatarHeight ||
			this.state.inputAvatarHeight !== nextState.inputAvatarHeight ||
			this.props.listLoading !== nextProps.listLoading
		);
	}

	public componentWillUnmount() {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
		this.keyboardDidHideListener.remove();
	}

	public render() {
		return (
			<View style={style.container} ref={this.containerViewRef}>
				{this.renderModalReportProblem()}
				{this.renderUserDetails()}
				{this.renderPostText()}
				{this.renderWallPostMedia()}
				{this.renderWallPostActions()}
				{this.renderRecentLikes()}
				{this.renderNumberOfComments()}
				{this.renderTwoBestComments()}
				{this.renderCommentInput()}
				{this.renderPostedTime()}
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
		const avatarURL = getUserAvatar({user: this.props.owner});
		const fullName = this.props.owner.name;
		return (
			<TouchableOpacity
				onPress={() => this.navigateToUserProfilePage(this.props.owner.userId)}
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

	private onDoubleTapLikeHandler = async () => {
		if (this.props.onLikeButtonClick) {
			if (this.props.likedByMe) {
				this.setState({heartAnimation: true});
			} else {
				this.setState({heartAnimation: true});
				await this.props.onLikeButtonClick();
			}
		}
	};

	private renderWallPostMedia = () => (
		<View>
			{this.state.heartAnimation && <HeartAnimation ended={(status) => this.setState({heartAnimation: !status})} />}
			<WallPostMedia
				mediaObjects={this.props.Media || this.props.media}
				onMediaObjectView={this.props.onImageClick}
				onLikeButtonPressed={this.onDoubleTapLikeHandler}
				noInteraction={this.state.disableMediaFullScreen}
			/>
		</View>
	);

	private renderPostText = () => {
		const postText = this.props.text;
		if (postText) {
			const numberOfLines = postText.split('\n').length;

			const hasMore =
				(postText.length > POST_SHORT_LENGTH || numberOfLines > POST_SHORT_MAX_LINES) && !this.state.fullTextVisible;

			let textToRender = postText;

			if (hasMore) {
				if (numberOfLines > POST_SHORT_MAX_LINES) {
					textToRender = textToRender
						.split('\n')
						.slice(0, POST_SHORT_MAX_LINES)
						.join('\n');
				}

				if (postText.length > POST_SHORT_LENGTH) {
					textToRender = textToRender.substr(0, POST_SHORT_LENGTH);
				}

				textToRender = textToRender + '...';
			}

			const showMoreButton = hasMore ? (
				<Text style={style.showMoreText} onPress={this.toggleShowFullText}>
					{'More'}
				</Text>
			) : null;

			return (
				<View style={style.postTextPadding}>
					<Text style={style.postText}>
						<ParsedText
							style={style.postText}
							childrenProps={{allowFontScaling: false}}
							parse={[
								{
									type: 'hashtag',
									style: style.hashtag,
									onPress: this.handleHashTag,
								},
								{
									type: 'tags',
									style: style.tag,
									onPress: this.handleUserTag,
								},
								{
									type: 'url',
									style: style.url,
									onPress: this.launchExternalURL,
								},
							]}
						>
							{textToRender}
						</ParsedText>
						{showMoreButton}
					</Text>
				</View>
			);
		}
		return null;
	};

	private renderWallPostActions = () => {
		if (!this.state.hidePostActionsAndComments) {
			return (
				<WallPostActions
					likedByMe={this.props.likedByMe}
					numberOfSuperLikes={this.props.numberOfSuperLikes}
					numberOfWalletCoins={this.props.numberOfWalletCoins}
					likeButtonPressed={this.props.onLikeButtonClick}
					superLikeButtonPressed={this.superLikeButtonPressedHandler}
					commentsButtonPressed={() => this.props.onCommentClick(false)}
					walletCoinsButtonPressed={this.walletCoinsButtonPressedHandler}
				/>
			);
		}
		return null;
	};

	private renderRecentLikes = () => {
		if (this.props.numberOfLikes && this.props.numberOfLikes > 0) {
			const {getText} = this.props;
			const lastLikeUser = this.props.likes[this.props.numberOfLikes - 1];
			const numberOfOtherLikes = this.props.numberOfLikes - 1;
			const secondLastLike = this.props.numberOfLikes >= 2 ? this.props.likes[this.props.numberOfLikes - 2] : null;
			const andText = ` ${getText('text.and')} `;
			return (
				<View style={style.recentLikesContainer}>
					<Text style={style.likedText}>
						{getText('post.card.liked.by') + ' '}
						<Text style={style.likeTextBold} onPress={() => this.navigateToUserProfilePage(lastLikeUser.userId)}>
							{lastLikeUser.userName}
						</Text>
					</Text>
					{numberOfOtherLikes === 1 && (
						<Text style={style.likedText}>
							{andText}
							<Text style={style.likeTextBold} onPress={() => this.navigateToUserProfilePage(secondLastLike.userId)}>
								{secondLastLike.userName}
							</Text>
						</Text>
					)}
					{numberOfOtherLikes > 1 && (
						<Text style={style.likedText}>
							{andText}
							<Text style={style.likeTextBold}>{numberOfOtherLikes + ' others'}</Text>
						</Text>
					)}
				</View>
			);
		}
		return null;
	};

	private blockUserHandler = async () => {
		const {userId} = this.props.owner;
		const {blockUser} = this.props;
		try {
			await blockUser({
				variables: {
					userId,
				},
			});
			showToastMessage('This user has been blocked..');
		} catch (ex) {
			showToastMessage(`There was a problem blocking this friend.  Please try again later... ${ex}`);
			console.log(`exception: ${ex}`);
		}
	};

	private renderNumberOfComments = () => {
		const {numberOfComments, getText} = this.props;
		if (numberOfComments && numberOfComments > 0) {
			return (
				<TouchableOpacity style={style.numCommentsContainer} onPress={() => this.props.onCommentClick(false)}>
					<Text style={style.viewAllCommentsText}>
						{getText('post.card.view.all.comments', this.props.numberOfComments)}
					</Text>
				</TouchableOpacity>
			);
		}
	};

	private renderTwoBestComments = () => {
		if (this.props.numberOfComments && this.props.numberOfComments > 0) {
			return (
				<View style={style.bestCommentsContainer}>
					{this.props.bestComments.map((comment: ISimpleComment, index: number) => (
						<Text style={style.commentContainer} numberOfLines={2} key={index}>
							<Text
								style={style.commentUserName}
								onPress={() => this.navigateToUserProfilePage(comment.owner.userId)}
								suppressHighlighting={true}
							>
								{comment.owner.username + '  '}
							</Text>
							<Text onPress={() => this.props.onCommentClick(false)}>{comment.text}</Text>
						</Text>
					))}
				</View>
			);
		}
	};

	private renderPostedTime = () => {
		const formatedTimestamp = this.getFormatedPostTime(this.props.timestamp);
		return (
			<View style={style.postedTimeContainer}>
				<Text style={style.postedTime}>{formatedTimestamp}</Text>
			</View>
		);
	};

	private keyboardDidHide = () => {
		if (this.state.inputFocused) {
			Animated.parallel([
				Animated.timing(this.state.inputBorderWidth, {
					toValue: 0,
					duration: 250,
				}),
				Animated.timing(this.state.inputAvatarWidth, {
					toValue: 25,
					duration: 250,
				}),
				Animated.timing(this.state.inputAvatarHeight, {
					toValue: 25,
					duration: 250,
				}),
			]).start();
			this.setState({inputFocused: false});
		}
	};

	private onCommentInputPress = () => {
		if (!this.props.listLoading && this.containerViewRef.current) {
			this.containerViewRef.current.measure((x: number, y: number, width: number, height: number) => {
				this.props.onAddComment(height);
			});
			if (!this.state.inputFocused) {
				Animated.parallel([
					Animated.timing(this.state.inputBorderWidth, {
						toValue: 2,
						duration: 350,
					}),
					Animated.timing(this.state.inputAvatarWidth, {
						toValue: 35,
						duration: 350,
					}),
					Animated.timing(this.state.inputAvatarHeight, {
						toValue: 35,
						duration: 350,
					}),
				]).start();
				this.setState({inputFocused: true});
			}
		}
	};

	private onCommentInputChange = (comment: string) => {
		if (!this.props.listLoading) {
			this.setState({comment});
		}
	};

	private renderCommentInput = () => {
		if (this.props.noInput) {
			return null;
		} else {
			const avatarURL = getUserAvatar({user: this.props.currentUser});
			return (
				<TouchableOpacity onPress={this.onCommentInputPress} activeOpacity={1} style={style.commentInputContainer}>
					<AnimatedFastImage
						source={{uri: avatarURL}}
						style={[
							style.commentInputAvatar,
							{width: this.state.inputAvatarWidth, height: this.state.inputAvatarHeight},
						]}
					/>
					<Animated.View style={[style.commentInputView, {borderWidth: this.state.inputBorderWidth}]}>
						<SXTextInput
							width={SCREEN_WIDTH - 90}
							borderWidth={0}
							size={InputSizes.Small}
							placeholder='Add a comment...'
							value={this.state.comment}
							onChangeText={this.onCommentInputChange}
							focusUpdateHandler={this.onCommentInputPress}
							returnKeyType={TRKeyboardKeys.done}
							onSubmitPressed={Keyboard.dismiss}
							blurOnSubmit={true}
							disabled={this.props.listLoading}
						/>
					</Animated.View>
				</TouchableOpacity>
			);
		}
	};

	private getFormatedPostTime = (timestamp: Date) => {
		const diff = moment(timestamp).fromNow();
		const split = diff.split(/([0-9]+)/).filter(Boolean);
		const value = split[0];
		let type = split[1];

		switch (type) {
			case 's': {
				type = +value === 1 ? 'SECOND' : 'SECONDS';
				break;
			}
			case 'm': {
				type = +value === 1 ? 'MINUTE' : 'MINUTES';
				break;
			}
			case 'h': {
				type = +value === 1 ? 'HOUR' : 'HOURS';
				break;
			}
			case 'd': {
				type = +value === 1 ? 'DAY' : 'DAYS';
				break;
			}
			case 'month': {
				type = +value === 1 ? 'MONTH' : 'MONTHS';
				break;
			}
			default:
				break;
		}

		split[0] = value;
		split[1] = type;
		return split.join(' ').concat(' AGO');
	};

	private toggleShowFullText = () => {
		this.setState({
			fullTextVisible: true,
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
				ModalManager.safeRunAfterModalClosed(this.blockUserHandler);
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
		if (this.props.onDeleteClick) {
			this.props.onDeleteClick(this.props.id);
			// console.log('Delete this post');
		}
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

	private navigateToUserProfilePage = (userId: string) => {
		if (this.props.onUserClick) {
			this.props.onUserClick(userId);
		}
	};

	private handleHashTag = (hashtag: string) => {
		alert('Hashtags!! Coming soon..' + hashtag);
	};

	private handleUserTag = (tag: string) => {
		alert('Tags!!! Coming soon..' + tag);
	};

	private launchExternalURL = async (url: string) => {
		try {
			const supported = await Linking.canOpenURL(url);
			if (!supported) {
				alert('Cannot open link, link not supported');
			} else {
				return Linking.openURL(url);
			}
		} catch (ex) {
			console.log(ex);
		}
	};
}

export const WallPostCard = compose(
	withTranslations,
	blockUserHoc,
)(WallPostCardComp as any);
