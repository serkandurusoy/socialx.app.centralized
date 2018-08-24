import {WallPostPhotoOptimized} from 'types';
import {addFileBN, addFilesBN} from 'utilities/ipfs';

interface MediaUploadCompleteResponse {
	responseCode: number;
	responseBody: any;
}

type MultipleMediaUploadCompleteResponse = Array<{
	index: number;
	data: MediaUploadCompleteResponse;
}>;

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
