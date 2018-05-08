import {IMediaProps} from 'types';

export interface MediaTypes {
	key: string;
	name: string;
	category: string;
}

export const MediaTypeImage: MediaTypes = {
	key: 'image',
	name: 'Photo',
	category: 'Photography',
};

export const MediaTypeVideo: MediaTypes = {
	key: 'video',
	name: 'Video',
	category: 'Videos',
};

export enum MediaSizes {
	Small = 'S',
	Medium = 'M',
	MediumLarge = 'ML',
	Large = 'L',
	XLarge = 'XL',
	XXLarge = 'XXL',
	XXXLarge = 'XXXL',
}

export interface ISimpleMediaObject {
	url: string;
	type: MediaTypes;
}

export type IMediaViewerObject = IMediaProps | ISimpleMediaObject;
