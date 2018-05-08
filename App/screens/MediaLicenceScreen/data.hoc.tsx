import {
	IShareOption,
	SHARE_GOOGLE_PLUS,
	SHARE_INSTAGRAM,
	SHARE_OPTION_FB,
	SHARE_TWITTER,
	SHARE_WHATS_APP,
	SHARE_YOUTUBE,
} from 'components';
import * as _ from 'lodash';
import React from 'react';
import {View} from 'react-native';
import {ISimpleMediaObject, IUserQuery, MediaSizes, MediaTypeImage, MediaTypes} from 'types';

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
	onMediaLike: () => void;
	numberOfSimilarMedia: number;
	onSimilarMediaLike: (item: IMediaLicenceData) => void;
	similarMedia: IMediaLicenceData[];
	onLoadMoreSimilarMedia: () => void;
	likeToggleCounter: number;
	shareOptions: IShareOption[];
	onMediaShare: (options: IShareOption) => void;
	onMediaDownloadPreview: () => void;
}

interface IMediaLicenceWithDataHooksState extends IMediaLicenceData {
	mediaData: IMediaLicenceData;
	similarMedia: IMediaLicenceData[];
	likeToggleCounter: number;
}

export const mediaLicenceWithDataHooks = (BaseComponent: React.ComponentType<IMediaLicenceWithDataHooksProps>) => {
	return class extends React.Component<any, IMediaLicenceWithDataHooksState> {
		private similarLoadIndex = 0;

		constructor(props: IMediaLicenceWithDataHooksProps) {
			super(props);
			const mediaData = props.mediaData ? props.mediaData : {...MEDIA_LICENCE_DATA};
			this.state = {
				mediaData,
				similarMedia: this.getMoreSimilarMedia(mediaData),
				likeToggleCounter: 0,
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
					/>
				</View>
			);
		}

		public getMediaPreviewObject = (): ISimpleMediaObject => {
			const {mediaData} = this.state;
			return {
				url: mediaData.mediaPreviewURI,
				type: mediaData.type,
			};
		}

		public getMediaOwner = () => {
			return this.state.mediaData.owner;
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

		private onMediaLikeHandler = () => {
			// TODO: GQL call
			this.setState({
				mediaData: {...this.state.mediaData, likedByMe: !this.state.mediaData.likedByMe},
			});
		}

		private onMediaShareHandler = (option: IShareOption) => {
			// console.log('TODO: Share option selected ' + option.key);
		}

		private onMediaDownloadPreviewHandler = () => {
			// console.log('TODO: onMediaDownloadPreviewHandler');
		}
	};
};
