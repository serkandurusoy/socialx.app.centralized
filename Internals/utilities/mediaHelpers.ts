import {ipfsConfig as base} from 'configuration';
import {IMediaProps, IMediaViewerObject, ISimpleMediaObject} from 'types';

export const getURLForMediaViewerObject = (object: IMediaViewerObject) => {
	let mediaURL;
	if ('url' in object) {
		mediaURL = (object as ISimpleMediaObject).url;
	} else {
		object = object as IMediaProps;
		mediaURL = base.ipfs_URL;
		mediaURL += object.optimizedHash ? object.optimizedHash : object.hash;
	}
	return mediaURL;
};
