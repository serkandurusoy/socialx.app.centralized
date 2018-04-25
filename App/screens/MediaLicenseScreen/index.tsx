import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {MediaSizes, MediaTypeImage, MediaTypes, MediaTypeVideo} from '../../types/global';
import {IUserQuery} from '../../types/gql';
import MediaLicenseScreenComponent from './screen';

export interface IMediaSize {
	id: string | number;
	mediaSize: MediaSizes;
	extension: string;
	width: number;
	height: number;
	price: number;
}

interface ISimilarMedia {
	mediaThumbURI: string;
	likedByMe: boolean;
}

export interface IMediaLicenseData {
	type: MediaTypes;
	title: string;
	mediaPreviewURI: string;
	likedByMe: boolean;
	imageID: string;
	owner: Partial<IUserQuery>;
	webSizes: IMediaSize[];
	printSizes: IMediaSize[];
	similarImages: ISimilarMedia[];
}

const MEDIA_LICENSE_DATA: IMediaLicenseData = {
	type: MediaTypeImage,
	// type: MediaTypeVideo,
	title: 'Flower Cookie',
	mediaPreviewURI: 'https://placeimg.com/900/650/any',
	likedByMe: false,
	imageID: '#765334',
	owner: {
		name: 'Marcel Füssinger',
	},
	webSizes: [
		{
			id: 1,
			mediaSize: MediaSizes.Small,
			extension: 'jpg',
			width: 450,
			height: 300,
			price: 1,
		},
		{
			id: 2,
			mediaSize: MediaSizes.Medium,
			extension: 'jpg',
			width: 848,
			height: 565,
			price: 2,
		},
	],
	printSizes: [
		{
			id: 3,
			mediaSize: MediaSizes.MediumLarge,
			extension: 'jpg',
			width: 1678,
			height: 1119,
			price: 3,
		},
		{
			id: 4,
			mediaSize: MediaSizes.Large,
			extension: 'jpg',
			width: 2508,
			height: 1672,
			price: 4,
		},
		{
			id: 5,
			mediaSize: MediaSizes.XLarge,
			extension: 'jpg',
			width: 3831,
			height: 2554,
			price: 5,
		},
		{
			id: 6,
			mediaSize: MediaSizes.XXLarge,
			extension: 'jpg',
			width: 6000,
			height: 4000,
			price: 6,
		},
		{
			id: 7,
			mediaSize: MediaSizes.XXXLarge,
			extension: 'jpg',
			width: 7500,
			height: 5000,
			price: 10,
		},
	],
	similarImages: [], // TODO: handle load more for this
};

export interface IMediaLicenseScreenProps {
	navigation: NavigationScreenProp<any>;
}

export interface IMediaLicenseScreenState extends IMediaLicenseData {}

export default class MediaLicenseScreen extends Component<IMediaLicenseScreenProps, IMediaLicenseScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'MEDIA LICENCE',
		headerRight: <View />,
	};

	public state = {...MEDIA_LICENSE_DATA};

	public render() {
		return (
			<MediaLicenseScreenComponent
				{...this.state}
				onMediaLike={this.onMediaLikeHandler}
				onNavigateToFAQScreen={this.onNavigateToFAQScreenHandler}
			/>
		);
	}

	private onMediaLikeHandler = () => {
		this.setState({
			likedByMe: !this.state.likedByMe,
		});
	}

	private onNavigateToFAQScreenHandler = () => {
		alert('onNavigateToFAQScreenHandler');
	}
}
