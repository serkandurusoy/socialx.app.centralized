import {IBlobData} from '../../../lib/ipfs';
import ipfs from '../entry';

/**
 * uploads multiple files to the ipfs node and returns a promise which resolves into the ipfs path of the files/data
 * @param data the data object containing the files to be uploaded
 * @param opts the options object to control the flow of the upload
 */
export const addFiles = (files: any, opts?: any): Promise<any> => ipfs.addFiles(files, opts);
export const addFile = (file: any, opts?: any): Promise<any> => ipfs.addFile(file, opts);
export const addJson = (json: object): Promise<any> => ipfs.addJson(json);
export const addBlob = (data: any): Promise<any> => new Promise(async (resolve) => {
	const res = await ipfs.addBlob(data);
	resolve(res);
});

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
