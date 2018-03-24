import ipfs from '../entry';

const mineTypes = {
	html: 'text/html',
	jpeg: 'image/jpeg',
	jpg: 'image/jpeg',
	png: 'image/png',
	gif: 'image/gif',
	js: 'text/javascript',
	css: 'text/css',
	pdf: 'application/pdf',
	doc: 'application/msword',
	docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	zip: 'application/zip, application/x-compressed-zip',
	txt: 'text/plain',
	mp4: 'video/mp4',
};

export interface IFileParam {
	path: string;
	content: any;
}

/**
 * uploads multiple files to the ipfs node and returns a promise which resolves into the ipfs path of the files/data
 * @param data the data object containing the files to be uploaded
 * @param opts the options object to control the flow of the upload
 */
export const addFiles = (data: IFileParam[], opts?: any): Promise<any> => ipfs.files.add(data, opts);

/**
 * adds anything to the ipfs node and returns a promise which resolves into the ipfs path of the data
 * @param data can be a handler, stream, string, or anything
 * @param opts the options object to control the flow of the upload
 */
export const add = (data: any, opts?: any): Promise<any> => ipfs.files.add(data, opts);

/**
 * returns a promise which resolves to a file/s addressed by a valid ipfs path
 * @param cid the ipfs path handler to be receieved, can be an CID instance, Buffer,
 * Base58 encoded CID, ipfs handler path
 */
export const cat = (cid: any): Promise<any> => ipfs.files.cat(cid);

/**
 * returns a promise which resolves to a file/s addressed by a valid ipfs path
 * @param ipfspath a valid ipfs file
 */
export const get = (ipfspath: any): Promise<any> => ipfs.files.get(ipfspath);
