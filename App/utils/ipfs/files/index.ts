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

export const addFiles = (data: IFileParam[]): Promise<any> => ipfs.files.add(data);
