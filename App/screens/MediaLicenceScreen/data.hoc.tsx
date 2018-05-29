import * as _ from 'lodash';
import React from 'react';
import {Alert, CameraRoll, PermissionsAndroid, View} from 'react-native';

import {
	IShareOption,
	SHARE_GOOGLE_PLUS,
	SHARE_INSTAGRAM,
	SHARE_OPTION_FB,
	SHARE_TWITTER,
	SHARE_WHATS_APP,
	SHARE_YOUTUBE,
} from 'components';
import {ModalManager} from 'hoc/ManagedModal/manager';
import {ISimpleMediaObject, IUserQuery, MediaSizes, MediaTypeImage, MediaTypes, MediaTypeVideo} from 'types';
import {PHOTO_LIB_SAVE_SUCCESS, saveRemoteMediaFileToLocalPhotoLibrary} from 'utilities';

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
	url: string;
}

export interface IMediaLicenceData {
	type: MediaTypes;
	title: string;
	mediaPreviewURI: string;
	extension: string;
	likedByMe: boolean;
	imageID: string;
	owner: Partial<IUserQuery>;
	sizes: IMediaSize[];
}

const MEDIA_LICENCE_DATA: IMediaLicenceData = {
	title: 'Flower Cookie',
	type: MediaTypeImage,
	mediaPreviewURI: 'https://placeimg.com/900/650/any',
	extension: 'jpg',
	// type: MediaTypeVideo,
	// mediaPreviewURI: 'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4',
	// extension: 'mp4',
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
			url: 'https://placeimg.com/1678/1119/any',
		},
		{
			id: 4,
			mediaSize: MediaSizes.Large,
			extension: 'jpg',
			width: 2508,
			height: 1672,
			price: 4,
			section: MEDIA_RESOLUTION_PRINT,
			url: 'https://placeimg.com/2508/1672/any',
		},
		{
			id: 5,
			mediaSize: MediaSizes.XLarge,
			extension: 'jpg',
			width: 3831,
			height: 2554,
			price: 5,
			section: MEDIA_RESOLUTION_PRINT,
			url: 'https://placeimg.com/3831/2554/any',
		},
		{
			id: 6,
			mediaSize: MediaSizes.XXLarge,
			extension: 'jpg',
			width: 6000,
			height: 4000,
			price: 6,
			section: MEDIA_RESOLUTION_PRINT,
			url: 'https://placeimg.com/6000/4000/any',
		},
		{
			id: 7,
			mediaSize: MediaSizes.XXXLarge,
			extension: 'jpg',
			width: 7500,
			height: 5000,
			price: 10,
			section: MEDIA_RESOLUTION_PRINT,
			url: 'https://placeimg.com/7500/5000/any',
		},
		{
			id: 1,
			mediaSize: MediaSizes.Small,
			extension: 'jpg',
			width: 450,
			height: 300,
			price: 1,
			section: MEDIA_RESOLUTION_WEB,
			url: 'https://placeimg.com/450/300/any',
		},
		{
			id: 2,
			mediaSize: MediaSizes.Medium,
			extension: 'jpg',
			width: 848,
			height: 565,
			price: 2,
			section: MEDIA_RESOLUTION_WEB,
			url: 'https://placeimg.com/848/565/any',
		},
	],
};

const TOTAL_SIMILAR_PHOTOS = 63;
const SIMILAR_PAGE_SIZE = 10;

const ENABLED_SHARE_OPTIONS = [
	SHARE_OPTION_FB,
	SHARE_GOOGLE_PLUS,
	SHARE_TWITTER,
	SHARE_WHATS_APP,
	SHARE_INSTAGRAM,
	SHARE_YOUTUBE,
];

export interface IMediaLicenceWithDataHooksProps {
	mediaData: IMediaLicenceData;
	similarMedia: IMediaLicenceData[];
	likeToggleCounter: number;
	transactionCompleted: boolean;
	onMediaLike: () => void;
	numberOfSimilarMedia: number;
	onSimilarMediaLike: (item: IMediaLicenceData) => void;
	onLoadMoreSimilarMedia: () => void;
	shareOptions: IShareOption[];
	onMediaShare: (options: IShareOption) => void;
	onMediaDownloadPreview: () => void;
	onSendTokens: (gas: number, tokens: number) => void;
	onStartDownload: (selectedItems: IMediaSize[]) => void;
	getMediaOwner: () => Partial<IUserQuery>;
	getMediaPreviewObject: () => ISimpleMediaObject;
}

interface IMediaLicenceWithDataHooksState {
	mediaData: IMediaLicenceData;
	similarMedia: IMediaLicenceData[];
	likeToggleCounter: number;
	transactionCompleted: boolean;
}

interface IInternalProps extends IMediaLicenceWithDataHooksProps {
	mediaPreviewDownloading: () => void;
	hideProgressIndicator: () => void;
	mediaResourcesDownloading: (title: string) => void;
}

export const mediaLicenceWithDataHooks = (BaseComponent: React.ComponentType<IMediaLicenceWithDataHooksProps>) => {
	return class extends React.Component<IInternalProps, IMediaLicenceWithDataHooksState> {
		private similarLoadIndex = 0;

		constructor(props: IInternalProps) {
			super(props);
			const mediaData = props.mediaData ? props.mediaData : {...MEDIA_LICENCE_DATA};
			this.state = {
				mediaData,
				similarMedia: this.getMoreSimilarMedia(mediaData),
				likeToggleCounter: 0,
				transactionCompleted: false,
			};
		}

		public render() {
			return (
				<View style={{flex: 1}}>
					<BaseComponent
						{...this.props}
						{...this.state}
						shareOptions={ENABLED_SHARE_OPTIONS}
						onMediaLike={this.onMediaLikeHandler}
						numberOfSimilarMedia={TOTAL_SIMILAR_PHOTOS}
						onSimilarMediaLike={this.onSimilarMediaLikeHandler}
						similarMedia={this.state.similarMedia}
						onLoadMoreSimilarMedia={this.onLoadMoreSimilarMediaHandler}
						likeToggleCounter={this.state.likeToggleCounter}
						onMediaShare={this.onMediaShareHandler}
						onMediaDownloadPreview={this.onMediaDownloadPreviewHandler}
						transactionCompleted={this.state.transactionCompleted}
						onSendTokens={this.onSendTokensHandler}
						onStartDownload={this.onStartDownloadHandler}
						getMediaOwner={this.getMediaOwner}
						getMediaPreviewObject={this.getMediaPreviewObject}
					/>
				</View>
			);
		}

		private getMediaOwner = (): Partial<IUserQuery> => {
			return this.state.mediaData.owner;
		}

		private getMediaPreviewObject = (): ISimpleMediaObject => {
			const {mediaData} = this.state;
			return {
				url: mediaData.mediaPreviewURI,
				type: mediaData.type,
			};
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
					if (i % 5 === 0) {
						newMediaData.mediaPreviewURI = `https://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_10mb.mp4`;
						newMediaData.type = MediaTypeVideo;
						newMediaData.extension = 'mp4';
					} else {
						newMediaData.mediaPreviewURI = `https://placeimg.com/${mediaWidth}/${mediaHeight}/any`;
						newMediaData.type = MediaTypeImage;
						newMediaData.extension = 'jpg';
					}
					ret.push(newMediaData);
				}
			}
			return ret;
		}

		private onLoadMoreSimilarMediaHandler = () => {
			this.setState({
				similarMedia: [...this.state.similarMedia, ...this.getMoreSimilarMedia(this.state.mediaData)],
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

		private onMediaLikeHandler = () => {
			// TODO: GQL call
			this.setState({
				mediaData: {...this.state.mediaData, likedByMe: !this.state.mediaData.likedByMe},
			});
		}

		private onMediaShareHandler = (option: IShareOption) => {
			// console.log('TODO: Share option selected ' + option.key);
		}

		private onMediaDownloadPreviewHandler = async () => {
			const {mediaData} = this.state;
			const fileName = mediaData.title + '.' + mediaData.extension;
			this.props.mediaPreviewDownloading();
			const saveRes = await saveRemoteMediaFileToLocalPhotoLibrary(
				mediaData.mediaPreviewURI,
				fileName,
				// this.mediaPreviewDownloadProgress, // later we can add per file progress for now
			);
			this.props.hideProgressIndicator();
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert('Success', saveRes);
			});
		}

		// private mediaPreviewDownloadProgress = (progressPercentage: number) => {
		// 	// server should provide header Content-Length for this to work!
		// 	console.log('Download progress', progressPercentage);
		// }

		private onSendTokensHandler = (gas: number, tokens: number) => {
			// TODO: send 'tokens' to user this.getMediaOwner() with fee 'gas'
			setTimeout(() => {
				this.setState({
					transactionCompleted: true,
				});
			}, 2000);
		}

		private onStartDownloadHandler = async (selectedItems: IMediaSize[]) => {
			this.setState({
				transactionCompleted: false,
			});
			const itemsCopy = [...selectedItems];
			let failedDownloads = 0;
			while (itemsCopy.length > 0) {
				const nextItem = itemsCopy.shift();
				if (nextItem) {
					this.props.mediaResourcesDownloading(`size ${nextItem.mediaSize}`);
					const saveRes = await saveRemoteMediaFileToLocalPhotoLibrary(
						nextItem.url,
						`${nextItem.id}.${nextItem.extension}`,
					);
					if (saveRes !== PHOTO_LIB_SAVE_SUCCESS) {
						failedDownloads++;
					}
				}
			}
			this.props.hideProgressIndicator();
			ModalManager.safeRunAfterModalClosed(() => {
				const confirmMessage =
					failedDownloads > 0
						? `Some media objects failed to download ${failedDownloads}`
						: 'All media object were saved to your photo library';
				Alert.alert('Success', confirmMessage);
			});
		}
	};
};
