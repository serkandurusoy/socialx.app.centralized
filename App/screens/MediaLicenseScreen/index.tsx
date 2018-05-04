import {ModalWallet} from 'components';
import findIndex from 'lodash/findIndex';
import React, {Component} from 'react';
import {findNodeHandle, Image, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {IUserQuery, MediaSizes, MediaTypeImage, MediaTypes} from 'types';
import MediaLicenseScreenComponent from './screen';

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

export interface IMediaLicenseData {
	type: MediaTypes;
	title: string;
	mediaPreviewURI: string;
	likedByMe: boolean;
	imageID: string;
	owner: Partial<IUserQuery>;
	sizes: IMediaSize[];
}

const MEDIA_LICENSE_DATA: IMediaLicenseData = {
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
let similarLoadIndex = 0;

const getMoreSimilarMedia = () => {
	const ret: IMediaLicenseData[] = [];
	for (let i = 0; i < SIMILAR_PAGE_SIZE; i++) {
		if (similarLoadIndex < TOTAL_SIMILAR_PHOTOS) {
			similarLoadIndex++;
			const randomIndexNumber = Math.round(Math.random() * 999999);
			const mediaWidth = 400 + Math.round(Math.random() * 200);
			const mediaHeight = 300 + Math.round(Math.random() * 150);
			const newMediaData = {...MEDIA_LICENSE_DATA};
			newMediaData.title = newMediaData.title + ' ' + randomIndexNumber;
			newMediaData.likedByMe = Math.random() < 0.5;
			newMediaData.imageID = '#' + randomIndexNumber;
			newMediaData.mediaPreviewURI = `https://placeimg.com/${mediaWidth}/${mediaHeight}/any`;
			ret.push(newMediaData);
		}
	}
	return ret;
};

export interface IMediaLicenseScreenProps {
	navigation: NavigationScreenProp<any>;
}

export interface IMediaLicenseScreenState extends IMediaLicenseData {
	modalVisible: boolean;
	blurViewRef: any;
	amountToSend: number;
	similarMedia: IMediaLicenseData[];
	likeToggleCounter: number;
}

export default class MediaLicenseScreen extends Component<IMediaLicenseScreenProps, IMediaLicenseScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'MEDIA LICENCE',
		headerRight: <View />,
	};

	private baseScreen: any = null;

	constructor(props: IMediaLicenseScreenProps) {
		super(props);
		this.state = {
			...MEDIA_LICENSE_DATA,
			modalVisible: false,
			blurViewRef: null,
			amountToSend: 0,
			similarMedia: getMoreSimilarMedia(),
			likeToggleCounter: 0,
		};
	}

	public componentDidMount() {
		const blurViewHandle = findNodeHandle(this.baseScreen);
		this.setState({blurViewRef: blurViewHandle});
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
				<MediaLicenseScreenComponent
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
				/>
			</View>
		);
	}

	private onLoadMoreSimilarMediaHandler = () => {
		this.setState({
			similarMedia: this.state.similarMedia.concat(getMoreSimilarMedia()),
		});
	}

	private onSimilarMediaLikeHandler = (similarMedia: IMediaLicenseData) => {
		const updatedSimilarMedia = [...this.state.similarMedia];
		const foundIndex = findIndex(updatedSimilarMedia, {imageID: similarMedia.imageID});
		if (foundIndex > -1) {
			updatedSimilarMedia[foundIndex].likedByMe = !updatedSimilarMedia[foundIndex].likedByMe;
			// TODO: GQL call before updating state!
			this.setState({
				similarMedia: updatedSimilarMedia,
				likeToggleCounter: this.state.likeToggleCounter + 1,
			});
		}
	}

	private onSimilarMediaSelectHandler = (similarMedia: IMediaLicenseData) => {
		// TODO: @Ionut: number 8 in the acc. criteria list.
		// console.log('onSimilarMediaSelectHandler: ' + similarMedia.imageID);
	}

	private onMediaLikeHandler = () => {
		// TODO: GQL call
		this.setState({
			likedByMe: !this.state.likedByMe,
		});
	}

	private onNavigateToFAQScreenHandler = () => {
		this.props.navigation.navigate('MediaLicenseFAQScreen');
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
		this.props.navigation.navigate('MediaViewerScreen', {
			photos: [{url: this.state.mediaPreviewURI}],
			startIndex: 0,
		});
	}

	private onNavigateToUserProfileScreenHandler = () => {
		this.props.navigation.navigate('UserProfileScreen');
	}

	private onNavigateToMediaIDScreenHandler = () => {
		alert('Decide later what screen will this link');
	}
}
