// MIGRATION: IpfsLib needs to go into api-storage, but the uploader belongs to RN app (whereever we don't yet know)
import {ipfsConfig} from 'configuration';
import Upload from 'react-native-background-upload';
import {WallPostPhotoOptimized} from 'types';

interface MediaUploadCompleteResponse {
	responseCode: number;
	responseBody: any;
}

type MultipleMediaUploadCompleteResponse = Array<{
	index: number;
	data: MediaUploadCompleteResponse;
}>;

interface IProviderParams {
	host: string;
	port: string;
	protocol?: string;
	root?: string;
}

class Ipfslib {
	private config: IProviderParams = {host: '0.0.0.0', port: '8080', protocol: 'http', root: '/api/v0'};

	constructor(params?: IProviderParams) {
		if (params) {
			if (!params.protocol || !params.root) {
				this.config.host = params.host;
				this.config.port = params.port;
			} else {
				this.config = params;
			}
		}
	}

	public addFileBN = async (
		path: string,
		onStart: any,
		onProgress: any,
		onError: any,
		onCompleted: (data: {responseCode: number; responseBody: any}) => void,
	) => {
		const opts = {
			url: this.apiUrl('/add'),
			path: path.replace('file://', ''),
			method: 'POST',
			type: 'multipart',
			field: 'file',
			notification: {enabled: false},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};

		try {
			const uploadId = await Upload.startUpload(opts);
			onStart();

			Upload.addListener('progress', uploadId, (data: any) => {
				onProgress(data.progress);
			});
			Upload.addListener('error', uploadId, (data: any) => {
				onError(data.error);
			});
			Upload.addListener('completed', uploadId, (data: {responseCode: number; responseBody: any}) => {
				// data includes responseCode: number and responseBody: Object
				onCompleted(data);
			});
		} catch (ex) {
			console.log('from ipfs BN upload:', ex);
		}
	};

	public addFilesBN = async (
		paths: string[],
		onStart: any,
		onProgress: any,
		onError: any,
		onCompleted: (data: Array<{index: number; data: {responseCode: number; responseBody: any}}>) => void,
	) => {
		const opts = {
			url: this.apiUrl('/add'),
			method: 'POST',
			type: 'multipart',
			field: 'file',
			notification: {enabled: false},
		};

		paths[0] = paths[0].replace('file://', '');
		paths[1] = paths[1].replace('file://', '');

		const mediaOpfs = {
			...opts,
			path: paths[0],
		};

		const optimizedMediaOpfs = {
			...opts,
			path: paths[1],
		};

		try {
			const originalFileSize = (await Upload.getFileInfo(paths[0])).size;
			const optimizedFileSize = (await Upload.getFileInfo(paths[1])).size;
			const totalUploadSize = originalFileSize + optimizedFileSize;

			const mediaUploadId = await Upload.startUpload(mediaOpfs);
			const optimizedMediaUId = await Upload.startUpload(optimizedMediaOpfs);
			const resData: any = [];

			console.log(mediaUploadId, optimizedMediaUId);
			onStart();

			let mediaProgress = 0;
			let optimizedMediaProgress = 0;

			const originalProgressHandler = (data: any) => {
				mediaProgress = data.progress;
				const updatedProgress =
					(mediaProgress * originalFileSize + optimizedMediaProgress * optimizedFileSize) / totalUploadSize;
				onProgress(updatedProgress, mediaUploadId);
			};

			const optimizedProgressHandler = (data: any) => {
				optimizedMediaProgress = data.progress;
				const updatedProgress =
					(mediaProgress * originalFileSize + optimizedMediaProgress * optimizedFileSize) / totalUploadSize;
				onProgress(updatedProgress, optimizedMediaUId);
			};

			// media events
			Upload.addListener('progress', mediaUploadId, originalProgressHandler);
			Upload.addListener('error', mediaUploadId, (data: any) => {
				onError(data.error, mediaUploadId);
			});
			Upload.addListener('completed', mediaUploadId, async (data: {responseCode: number; responseBody: any}) => {
				// data includes responseCode: number and responseBody: Object
				resData.push({index: 0, data});
				if (resData.length === 2) {
					onCompleted(resData);
				}
			});

			// optimized media events
			// @iont: TODO -> the progress here is not accurate, the optimized
			// image finishes really quick so it doesnt actually adds up to the progress
			Upload.addListener('progress', optimizedMediaUId, optimizedProgressHandler);
			Upload.addListener('error', optimizedMediaUId, (data: any) => {
				onError(data.error, optimizedMediaUId);
			});
			Upload.addListener('completed', optimizedMediaUId, (data: {responseCode: number; responseBody: any}) => {
				// data includes responseCode: number and responseBody: Object
				resData.push({index: 1, data});
				if (resData.length === 2) {
					onCompleted(resData);
				}
			});
		} catch (ex) {
			console.log('from ipfs BN upload:', ex);
		}
	};

	private apiUrl = (path: string): string => {
		return `${this.config.protocol}://${this.config.host}${this.config.port ? ':' + this.config.port : ''}${
			this.config.root
			}${path}`;
	};

}

const ipfs = new Ipfslib({
	host: ipfsConfig.ipfs_server,
	port: ipfsConfig.ipfs_port,
	root: ipfsConfig.opts.root,
	protocol: ipfsConfig.opts.protocol,
});

export const addFileBN = async (
	path: string,
	onStart: any,
	onProgress: any,
	onError: any,
	onCompleted: (data: {responseCode: number; responseBody: any}) => void,
) => {
	await ipfs.addFileBN(path, onStart, onProgress, onError, onCompleted);
};

export const addFilesBN = async (
	paths: string[],
	onStart: any,
	onProgress: any,
	onError: any,
	onCompleted: (data: Array<{index: number; data: {responseCode: number; responseBody: any}}>) => void,
) => {
	await ipfs.addFilesBN(paths, onStart, onProgress, onError, onCompleted);
};

// tslint:disable-next-line
export class MediaUploader {
	private readonly mediaObjectsUploading: WallPostPhotoOptimized[];
	private readonly onMediaUploadProgress: (fileProgress: number, globalProgress: string) => void;
	private readonly onUploadComplete: (mediaIDs: string[]) => void;
	private readonly onUploadError: (error: any) => void;
	private readonly addMedia: (args: any) => Promise<any>;
	private readonly numberOfMediaFiles: number;

	private mediaObjectsUploadedIDs: string[] = [];

	constructor(
		mediaObjects: WallPostPhotoOptimized[],
		onUploadComplete: any,
		onUploadError: any,
		addMedia: any,
		onMediaUploadProgress: any,
	) {
		this.mediaObjectsUploading = [...mediaObjects]; // shallow copy is ok here!
		this.onUploadComplete = onUploadComplete;
		this.onUploadError = onUploadError;
		this.addMedia = addMedia;
		this.onMediaUploadProgress = onMediaUploadProgress;
		this.numberOfMediaFiles = mediaObjects.length;
	}

	public startUpload = () => {
		this.uploadNextMediaObject();
	};

	private uploadNextMediaObject = () => {
		if (this.mediaObjectsUploading.length > 0) {
			const mediaObject = this.mediaObjectsUploading[0];
			const {pathx, contentOptimizedPath} = mediaObject;
			if (contentOptimizedPath) {
				addFilesBN(
					[pathx, contentOptimizedPath],
					this.onMediaFileUploadStart,
					this.onMediaFileUploadProgress,
					this.onMediaFileUploadError,
					this.onMediaFileUploadComplete,
				);
			} else {
				addFileBN(
					pathx,
					this.onMediaFileUploadStart,
					this.onMediaFileUploadProgress,
					this.onMediaFileUploadError,
					this.onMediaFileUploadComplete,
				);
			}
		} else {
			this.onUploadComplete(this.mediaObjectsUploadedIDs);
		}
	};

	private getGlobalProgress = () => {
		return `${this.numberOfMediaFiles - this.mediaObjectsUploading.length + 1}/${this.numberOfMediaFiles}`;
	};

	private onMediaFileUploadStart = () => {
		this.onMediaUploadProgress(0, this.getGlobalProgress());
	};

	private onMediaFileUploadProgress = (progress: any, id: any) => {
		console.log('Upload progress:', progress, id);
		this.onMediaUploadProgress(Math.round(progress), this.getGlobalProgress());
	};

	private onMediaFileUploadError = (err: any, id: any) => {
		console.log(err, id);
		this.onUploadError(err);
	};

	private onMediaFileUploadComplete = async (
		data: MultipleMediaUploadCompleteResponse | MediaUploadCompleteResponse,
	) => {
		try {
			let mediaOb: any = null;
			let optimizedMediaOb: any = null;

			console.log('Upload completed', data);
			if (Array.isArray(data)) {
				for (let i = 0; i < data.length; i++) {
					const current = data[i];
					if (current.index === 0) {
						mediaOb = JSON.parse(current.data.responseBody);
					} else {
						optimizedMediaOb = JSON.parse(current.data.responseBody);
					}
				}
			} else {
				// TODO: @Jake: this needs better handling!
				mediaOb = JSON.parse(data.responseBody);
			}

			this.createMediaObjectOnAWS(mediaOb, optimizedMediaOb);
		} catch (ex) {
			this.onUploadError(ex);
		}
	};

	private createMediaObjectOnAWS = async (mediaOb: any, optimizedMediaOb: any) => {
		const addResp = await this.addMedia({
			variables: {
				hash: mediaOb.Hash,
				size: parseInt(mediaOb.Size, undefined),
				type: this.mediaObjectsUploading[0].mime,
				optimizedHash: optimizedMediaOb !== null ? optimizedMediaOb.Hash : mediaOb.Hash,
			},
		});

		this.mediaObjectsUploadedIDs.push(addResp.data.addMedia.id);
		this.mediaObjectsUploading.shift();
		this.uploadNextMediaObject();
	};
}
