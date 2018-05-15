import {Alert, CameraRoll, PermissionsAndroid} from 'react-native';
import RNFS, {DownloadProgressCallbackResult} from 'react-native-fs';

import {IMediaObjectViewerProps} from 'components';
import {ipfsConfig as base} from 'configuration';
import {IMediaProps, IMediaPropsWithIndex, IMediaViewerObject, ISimpleMediaObject} from 'types';
import {requestResourcePermission} from 'utilities';

const REQUEST_SAVE_MEDIA_TITLE = 'Photo library save..';
const REQUEST_SAVE_MEDIA_MESSAGE = 'Please allow application to save media object to your photo library';

export const PHOTO_LIB_SAVE_SUCCESS = 'Media saved to local photo library';
const PHOTO_LIB_SAVE_ACCESS_DENIED = 'Save to photo library denied :(';
const PHOTO_LIB_SAVE_DOWNLOAD_ERROR = 'Save to photo library denied :(';
const PHOTO_LIB_SAVE_MOVE_TO_PHOTO_LIB_FAILED = 'Media object was downloaded but moving to photo library failed';

export const getURLForMediaViewerObject = (object: IMediaViewerObject) => {
	let mediaURL;
	if ('url' in object) {
		mediaURL = (object as ISimpleMediaObject).url;
	} else {
		object = object as IMediaPropsWithIndex;
		mediaURL = base.ipfs_URL;
		mediaURL += object.optimizedHash ? object.optimizedHash : object.hash;
	}
	return mediaURL;
};

export const getTypePropsForMediaViewerObject = (object: IMediaViewerObject) => {
	const typeProps: Partial<IMediaObjectViewerProps> = {};
	if ('url' in object) {
		typeProps.type = (object as ISimpleMediaObject).type;
	} else {
		typeProps.extension = (object as IMediaProps).type;
	}
	return typeProps;
};

export const saveRemoteMediaFileToLocalPhotoLibrary = async (
	remoteURL: string,
	fileName: string,
	progressCallback?: (value: number) => void,
): Promise<string> => {
	let ret = PHOTO_LIB_SAVE_SUCCESS;
	const granted = await requestResourcePermission(
		PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
		REQUEST_SAVE_MEDIA_TITLE,
		REQUEST_SAVE_MEDIA_MESSAGE,
	);
	if (granted) {
		const tempSavePath = `file://${RNFS.CachesDirectoryPath}/${fileName}`;
		// console.log('Will save to cache location', tempSavePath);
		const downloadDescriptor = RNFS.downloadFile({
			fromUrl: remoteURL,
			toFile: tempSavePath,
			progress: (progress: DownloadProgressCallbackResult) => onMediaDownloadProgress(progress, progressCallback),
			progressDivider: 10,
			// background: true, // only for iOS and requires setup
		});
		const result: RNFS.DownloadResult = await downloadDescriptor.promise;
		// console.log('Download finished', result.bytesWritten, result.statusCode);
		if (result.statusCode < 400) {
			const localURI = await CameraRoll.saveToCameraRoll(tempSavePath);
			if (localURI) {
				// console.log('Downloaded file moved to', localURI);
				await RNFS.unlink(tempSavePath);
				// console.log('File deleted from temp location');
			} else {
				ret = PHOTO_LIB_SAVE_MOVE_TO_PHOTO_LIB_FAILED;
			}
		} else {
			ret = PHOTO_LIB_SAVE_DOWNLOAD_ERROR;
		}
	} else {
		ret = PHOTO_LIB_SAVE_ACCESS_DENIED;
	}
	return ret;
};

const onMediaDownloadProgress = (progress: DownloadProgressCallbackResult, callback?: (value: number) => void) => {
	if (callback) {
		const progressPercentage = Math.round(progress.bytesWritten * 100 / progress.contentLength);
		callback(progressPercentage);
	}
};
