import {
	IShareOption,
	ModalCloseButton,
	ModalExternalShareOptions,
	ModalWallet,
	SHARE_GOOGLE_PLUS,
	SHARE_INSTAGRAM,
	SHARE_OPTION_FB,
	SHARE_TWITTER,
	SHARE_WHATS_APP,
	SHARE_YOUTUBE,
} from 'components';
import * as _ from 'lodash';
import React, {Component} from 'react';
import {findNodeHandle, Image, InteractionManager, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {IMediaProps, IUserQuery, MediaSizes, MediaTypeImage, MediaTypes} from 'types';
import MediaLicenceScreenComponent from './screen';

export interface MediaResolutionSection {
	title: string;
	order: number;
}

const MEDIA_RESOLUTION_WEB: MediaResolutionSection = {
	title: 'Web Use (72dpi)',
	order: 0,
};

const MEDIA_RESOLUTION_PRINT: MediaResolutionSection = {
	title: 'Web or Print Use (300dpi)',
	order: 1,
};

export interface IMediaSize {
	id: string | number;
	mediaSize: MediaSizes;
	extension: string;
	width: number;
	height: number;
	price: number;
	section: MediaResolutionSection;
}

export interface IMediaLicenceData {
	type: MediaTypes;
	title: string;
	mediaPreviewURI: string;
	likedByMe: boolean;
	imageID: string;
	owner: Partial<IUserQuery>;
	sizes: IMediaSize[];
}

const MEDIA_LICENCE_DATA: IMediaLicenceData = {
	type: MediaTypeImage,
	// type: MediaTypeVideo,
	title: 'Flower Cookie',
	mediaPreviewURI: 'https://placeimg.com/900/650/any',
	likedByMe: false,
	imageID: '#765334',
	owner: {
		userId: 'ae351f3gjk58',
		name: 'Marcel Füssinger',
	},
	sizes: [
		{
			id: 3,
			mediaSize: MediaSizes.MediumLarge,
			extension: 'jpg',
			width: 1678,
			height: 1119,
			price: 3,
			section: MEDIA_RESOLUTION_PRINT,
		},
		{
			id: 4,
			mediaSize: MediaSizes.Large,
			extension: 'jpg',
			width: 2508,
			height: 1672,
			price: 4,
			section: MEDIA_RESOLUTION_PRINT,
		},
		{
			id: 5,
			mediaSize: MediaSizes.XLarge,
			extension: 'jpg',
			width: 3831,
			height: 2554,
			price: 5,
			section: MEDIA_RESOLUTION_PRINT,
		},
		{
			id: 6,
			mediaSize: MediaSizes.XXLarge,
			extension: 'jpg',
			width: 6000,
			height: 4000,
			price: 6,
			section: MEDIA_RESOLUTION_PRINT,
		},
		{
			id: 7,
			mediaSize: MediaSizes.XXXLarge,
			extension: 'jpg',
			width: 7500,
			height: 5000,
			price: 10,
			section: MEDIA_RESOLUTION_PRINT,
		},
		{
			id: 1,
			mediaSize: MediaSizes.Small,
			extension: 'jpg',
			width: 450,
			height: 300,
			price: 1,
			section: MEDIA_RESOLUTION_WEB,
		},
		{
			id: 2,
			mediaSize: MediaSizes.Medium,
			extension: 'jpg',
			width: 848,
			height: 565,
			price: 2,
			section: MEDIA_RESOLUTION_WEB,
		},
	],
};

const TOTAL_SIMILAR_PHOTOS = 63;
const SIMILAR_PAGE_SIZE = 10;

interface IMediaLicenceScreenNavParams {
	params: {
		mediaLicence: IMediaLicenceData;
	};
}

export interface IMediaLicenceScreenProps {
	navigation: NavigationScreenProp<IMediaLicenceScreenNavParams>;
}

export interface IMediaLicenceScreenState extends IMediaLicenceData {
	modalVisible: boolean;
	blurViewRef: any;
	amountToSend: number;
	similarMedia: IMediaLicenceData[];
	likeToggleCounter: number;
	shareModalVisible: boolean;
}

const ENABLED_SHARE_OPTIONS = [
	SHARE_OPTION_FB,
	SHARE_GOOGLE_PLUS,
	SHARE_TWITTER,
	SHARE_WHATS_APP,
	SHARE_INSTAGRAM,
	SHARE_YOUTUBE,
];

export default class MediaLicenceScreen extends Component<IMediaLicenceScreenProps, IMediaLicenceScreenState> {
	private static navigationOptions = (props: IMediaLicenceScreenProps) => {
		const isSimilarMediaScreen = _.get(props, 'navigation.state.params.mediaLicence', undefined) !== undefined;
		const ret: Partial<NavigationStackScreenOptions> = {
			title: 'MEDIA LICENCE',
			headerRight: (
				<ModalCloseButton onClose={_.get(props, 'navigation.state.params.closeAllMediaScreens', undefined)} />
			),
		};
		if (!isSimilarMediaScreen) {
			ret.headerLeft = <View />;
		}
		return ret;
	}

	private baseScreen: any = null;
	private similarLoadIndex = 0;

	constructor(props: IMediaLicenceScreenProps) {
		super(props);
		let mediaLicenceData: Partial<IMediaLicenceScreenState> = {...MEDIA_LICENCE_DATA};
		if (_.get(props, 'navigation.state.params.mediaLicence', undefined)) {
			mediaLicenceData = {...props.navigation.state.params.mediaLicence};
		}
		mediaLicenceData.similarMedia = this.getMoreSimilarMedia(mediaLicenceData);
		this.state = {
			...mediaLicenceData,
			modalVisible: false,
			blurViewRef: null,
			amountToSend: 0,
			likeToggleCounter: 0,
			shareModalVisible: false,
		};
	}

	public componentDidMount() {
		const blurViewHandle = findNodeHandle(this.baseScreen);
		this.setState({blurViewRef: blurViewHandle});
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({closeAllMediaScreens: this.onCloseAllMediaScreensHandler});
		});
	}

	public render() {
		return (
			<View style={{flex: 1}}>
				<ModalWallet
					visible={this.state.modalVisible}
					blurViewRef={this.state.blurViewRef}
					onCloseButton={this.toggleModalHandler}
					socXInWallet={53680} // TODO update with real value here
					sendSocXAmount={this.state.amountToSend}
					destinationUser={this.state.owner}
				/>
				<ModalExternalShareOptions
					visible={this.state.shareModalVisible}
					closeHandler={this.toggleShareOptionsModal}
					enabledShareOptions={ENABLED_SHARE_OPTIONS}
					hideLabel={true}
					onOptionSelected={this.shareOptionSelectedHandler}
				/>
				<MediaLicenceScreenComponent
					{...this.state}
					onMediaLike={this.onMediaLikeHandler}
					onNavigateToFAQScreen={this.onNavigateToFAQScreenHandler}
					ref={(ref) => (this.baseScreen = ref)}
					onDownload={this.showDownloadModal}
					numberOfSimilarMedia={TOTAL_SIMILAR_PHOTOS}
					onSimilarMediaLike={this.onSimilarMediaLikeHandler}
					onSimilarMediaSelect={this.onSimilarMediaSelectHandler}
					onShowPreviewFullScreen={this.onShowPreviewFullScreenHandler}
					onNavigateToUserProfileScreen={this.onNavigateToUserProfileScreenHandler}
					onNavigateToPhotoIDScreen={this.onNavigateToMediaIDScreenHandler}
					similarMedia={this.state.similarMedia}
					onLoadMoreSimilarMedia={this.onLoadMoreSimilarMediaHandler}
					likeToggleCounter={this.state.likeToggleCounter}
					onMediaShare={this.toggleShareOptionsModal}
				/>
			</View>
		);
	}

	private getMoreSimilarMedia = (refMediaData: IMediaLicenceData) => {
		const ret: IMediaLicenceData[] = [];
		for (let i = 0; i < SIMILAR_PAGE_SIZE; i++) {
			if (this.similarLoadIndex < TOTAL_SIMILAR_PHOTOS) {
				this.similarLoadIndex++;
				const randomIndexNumber = Math.round(Math.random() * 999999);
				const mediaWidth = 400 + Math.round(Math.random() * 200);
				const mediaHeight = 300 + Math.round(Math.random() * 150);
				const newMediaData = {...refMediaData};
				newMediaData.title = newMediaData.title + ' ' + randomIndexNumber;
				newMediaData.likedByMe = Math.random() < 0.5;
				newMediaData.imageID = '#' + randomIndexNumber;
				newMediaData.mediaPreviewURI = `https://placeimg.com/${mediaWidth}/${mediaHeight}/any`;
				ret.push(newMediaData);
			}
		}
		return ret;
	}

	private onLoadMoreSimilarMediaHandler = () => {
		this.setState({
			similarMedia: this.state.similarMedia.concat(this.getMoreSimilarMedia(this.state as IMediaLicenceData)),
		});
	}

	private onSimilarMediaLikeHandler = (similarMedia: IMediaLicenceData) => {
		const updatedSimilarMedia = [...this.state.similarMedia];
		const foundIndex = _.findIndex(updatedSimilarMedia, {imageID: similarMedia.imageID});
		if (foundIndex > -1) {
			updatedSimilarMedia[foundIndex].likedByMe = !updatedSimilarMedia[foundIndex].likedByMe;
			// TODO: GQL call before updating state!
			this.setState({
				similarMedia: updatedSimilarMedia,
				likeToggleCounter: this.state.likeToggleCounter + 1,
			});
		}
	}

	private onSimilarMediaSelectHandler = (similarMedia: IMediaLicenceData) => {
		// TODO: @Ionut: find a way to close all similar screens at once!
		this.props.navigation.navigate('MediaLicenceScreen', {mediaLicence: similarMedia});
	}

	private onMediaLikeHandler = () => {
		// TODO: GQL call
		this.setState({
			likedByMe: !this.state.likedByMe,
		});
	}

	private onNavigateToFAQScreenHandler = () => {
		this.props.navigation.navigate('MediaLicenceFAQScreen');
	}

	private showDownloadModal = () => {
		const selectedItems = this.baseScreen.getSelectedItems();
		if (selectedItems.length > 0) {
			let totalPrice = 0;
			selectedItems.forEach((item: IMediaSize) => {
				totalPrice += item.price;
			});
			this.setState({
				modalVisible: true,
				amountToSend: totalPrice,
			});
		} else {
			alert('No media selected');
		}
	}

	private toggleModalHandler = () => {
		this.setState({
			modalVisible: !this.state.modalVisible,
		});
	}

	private onShowPreviewFullScreenHandler = () => {
		// TODO: update hardcoded value here
		const newMediaObject: IMediaProps = {
			id: (Math.random() * 99999).toString(),
			hash: 'QmWS5XaVeDDQAog9TcRHp7ryms4MP4a3u3gth3ZKwCvQTC',
			optimizedHash: 'QmWS5XaVeDDQAog9TcRHp7ryms4MP4a3u3gth3ZKwCvQTC',
			type: 'jpg',
			size: 123456,
		};
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects: [newMediaObject],
			startIndex: 0,
		});
	}

	private onNavigateToUserProfileScreenHandler = () => {
		this.props.navigation.navigate('UserProfileScreen');
	}

	private onNavigateToMediaIDScreenHandler = () => {
		alert('Decide later what screen will this link');
	}

	private onCloseAllMediaScreensHandler = () => {
		this.props.navigation.popToTop();
		this.props.navigation.goBack(null);
	}

	private toggleShareOptionsModal = () => {
		this.setState({
			shareModalVisible: !this.state.shareModalVisible,
		});
	}

	private shareOptionSelectedHandler = (option: IShareOption) => {
		// console.log('TODO: Share option selected ' + option.key);
		this.toggleShareOptionsModal();
	}
}
