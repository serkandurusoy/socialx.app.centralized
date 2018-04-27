import React, {Component} from 'react';
import {findNodeHandle, Image, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {ModalWallet} from '../../components/Modals/Wallet';
import {MediaSizes, MediaTypeImage, MediaTypes, MediaTypeVideo} from '../../types/global';
import {IUserQuery} from '../../types/gql';
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

const getMoreSimilarPhotos = () => {
	// TODO: move this to state
	const ret: IMediaLicenseData[] = [];
	for (let i = 0; i < SIMILAR_PAGE_SIZE; i++) {
		if (similarLoadIndex < TOTAL_SIMILAR_PHOTOS) {
			similarLoadIndex++;
			const randomIndexNumber = Math.round(Math.random() * 999999);
			const mediaWidth = 400 + Math.round(Math.random() * 200);
			const mediaHeight = 300 + Math.round(Math.random() * 150);
			const newMediaData = MEDIA_LICENSE_DATA;
			newMediaData.title = newMediaData.title + ' ' + randomIndexNumber;
			newMediaData.likedByMe = Math.random() < 0.5;
			newMediaData.imageID = '#' + randomIndexNumber;
			newMediaData.mediaPreviewURI = `https://placeimg.com/${mediaWidth}/${mediaHeight}/any`;
			ret.push(newMediaData);
		}
	}
	// console.log('Last load index', similarLoadIndex);
	return ret;
};

export interface IMediaLicenseScreenProps {
	navigation: NavigationScreenProp<any>;
}

export interface IMediaLicenseScreenState extends IMediaLicenseData {
	modalVisible: boolean;
	blurViewRef: any;
	amountToSend: number;
}

export default class MediaLicenseScreen extends Component<IMediaLicenseScreenProps, IMediaLicenseScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'MEDIA LICENCE',
		headerRight: <View />,
	};

	public state = {
		...MEDIA_LICENSE_DATA,
		modalVisible: false,
		blurViewRef: null,
		amountToSend: 0,
	};

	private baseScreen: any = null;

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
					loadMoreSimilarMedia={getMoreSimilarPhotos}
					numberOfSimilarMedia={TOTAL_SIMILAR_PHOTOS}
					onSimilarMediaLike={this.onSimilarMediaLikeHandler}
					onSimilarMediaSelect={this.onSimilarMediaSelectHandler}
					onShowPreviewFullScreen={this.onShowPreviewFullScreenHandler}
					onNavigateToUserProfileScreen={this.onNavigateToUserProfileScreenHandler}
					onNavigateToPhotoIDScreen={this.onNavigateToPhotoIDScreenHandler}
				/>
			</View>
		);
	}

	private onSimilarMediaLikeHandler = () => {
		alert('onSimilarMediaLikeHandler');
	}

	private onSimilarMediaSelectHandler = () => {
		alert('onSimilarMediaSelectHandler');
	}

	private onMediaLikeHandler = () => {
		// TODO: GQL call
		this.setState({
			likedByMe: !this.state.likedByMe,
		});
	}

	private onNavigateToFAQScreenHandler = () => {
		alert('onNavigateToFAQScreenHandler');
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

	private onNavigateToPhotoIDScreenHandler = () => {
		alert('Decide later what screen will this link');
	}
}
