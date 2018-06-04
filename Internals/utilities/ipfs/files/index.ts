import {IBlobData} from 'ipfslib';
import ipfs from '../entry';

interface MediaObject {
	path: string;
	type: string;
	size: number;
	name: string;
	content: any;
	contentOptimized?: any;
}

/**
 * uploads multiple files to the ipfs node and returns a promise which resolves into the ipfs path of the files/data
 * @param data the data object containing the files to be uploaded
 * @param opts the options object to control the flow of the upload
 */
export const addFiles = (files: any, opts?: any): Promise<any> => ipfs.addFiles(files, opts);
export const addFile = (file: any, opts?: any): Promise<any> => ipfs.addFile(file, opts);
export const addJson = (json: object): Promise<any> => ipfs.addJson(json);
export const addBlob = (data: any): Promise<any> =>
	new Promise(async (resolve) => {
		const res = await ipfs.addBlob(data);
		resolve(res);
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

export const addBlobFiles = async (mediaObjects: MediaObject[]): Promise<any> => {
	const ipfsHashes: object[] = [];
	if (mediaObjects.length <= 0) {
		return ipfsHashes;
	}

	// todo @serkan @jake let's test this
	const {source: blobSource, optimized: blobOptimized} = mediaObjects.reduce(
		({source, optimized}, media: MediaObject) => ({
			source: [...source, {filename: media.name, data: media.content, name: media.name.split('.')[0]}],
			optimized: [
				...optimized,
				{
					filename: media.name,
					data: media.contentOptimized || media.content,
					name: media.name.split('.')[0] + '-optimized',
				},
			],
		}),
		{source: [] as IBlobData[], optimized: [] as IBlobData[]},
	);

	try {
		let ipfsSourceResp = await addBlob(blobSource);
		ipfsSourceResp = ipfsSourceResp.data.split('\n');

		let ipfsOptimizedResp = await addBlob(blobOptimized);
		ipfsOptimizedResp = ipfsOptimizedResp.data.split('\n');

		console.log('sourceResp', ipfsSourceResp);
		console.log('optimizedResp', ipfsOptimizedResp);

		// todo @serkan @jake I think we can optimize this iteration
		ipfsSourceResp.forEach((sourceResp: string) => {
			if (sourceResp !== '') {
				const parsedSource = JSON.parse(sourceResp);
				ipfsOptimizedResp.forEach((optimizedResp: string) => {
					if (optimizedResp !== '') {
						const parsedOptimized = JSON.parse(optimizedResp);
						if (parsedSource.Name === parsedOptimized.Name) {
							ipfsHashes.push({
								size: parsedSource.Size,
								hash: parsedSource.Hash,
								type: parsedSource.Name.split('.')[1],
								optimizedHash: parsedOptimized.Hash,
							});
						}
					}
				});
			}
		});
		return ipfsHashes;
	} catch (ex) {
		//
		console.log(ex);
	}
};

/**
 * adds anything to the ipfs node and returns a promise which resolves into the ipfs path of the data
 * @param data can be a handler, stream, string, or anything
 * @param opts the options object to control the flow of the upload
 */
export const add = (data: any, opts?: any): Promise<any> => ipfs.add(data, opts);

/**
 * returns a promise which resolves to a file/s addressed by a valid ipfs path
 * @param cid the ipfs path handler to be receieved, can be an CID instance, Buffer,
 * Base58 encoded CID, ipfs handler path
 */
export const cat = (cid: any): Promise<any> => ipfs.cat(cid);
