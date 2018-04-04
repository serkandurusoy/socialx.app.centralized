// deprecate
import RNFetchBlob from 'react-native-fetch-blob';

export interface IProviderParams {
	host: string;
	port: string;
	protocol?: string;
	root?: string;
}

export interface IBlobData {
	name?: string;
	filename?: string;
	data: string;
}

export default class Ipfslib {
	private config: IProviderParams = {host: '207.154.246.128', port: '8080', protocol: 'http', root: '/api/v0'};
	private responseData: any;

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

	public addBlob = (data: any) => {
		return RNFetchBlob.fetch('POST', this.apiUrl('/add'), {'Content-Type': 'multipart/form-data'}, data);
	}

	public addFile = (file: any, opts?: any): Promise<any> =>
		new Promise((resolve) => {
			const form = new FormData();
			form.append('file', file);
			this.request({
				callback: resolve,
				method: 'post',
				uri: '/add',
				payload: form,
				accept: 'application/json',
				transform: (res: any) => (res ? JSON.parse(res) : null),
				progress: opts ? opts.progress : null,
			});
		})

	public addFiles = (files: any[], opts?: any): Promise<any> =>
		new Promise((resolve) => {
			const form = new FormData();
			files.forEach((file) => form.append('file', file));
			this.request({
				callback: resolve,
				method: 'post',
				uri: '/add',
				payload: form,
				accept: 'application/json',
				transform: (res: any) => (res ? JSON.parse(res) : null),
				progress: opts ? opts.progress : null,
			});
		})

	public add = (input: any, opts?: any): Promise<any> =>
		new Promise((resolve) => {
			const form = new FormData();
			const data = this.isBuffer(input) ? input.toString('binary') : input;
			const blob = new Blob([data]);
			form.append('file', blob);
			this.request({
				callback: resolve,
				method: 'post',
				uri: '/add',
				payload: form,
				accept: 'application/json',
				transform: (res: any) => (res ? JSON.parse(res) : null),
				progress: opts ? opts.progress : null,
			});
		})

	public cat = (ipfsHash: string): Promise<any> =>
		new Promise((resolve) => this.request({callback: resolve, uri: `/cat/${ipfsHash}`}))

	public addJson = (json: object) => this.add(JSON.stringify(json, null, 2));

	public setProvider = (opts: IProviderParams) => (this.config = opts);

	private isBuffer = (obj: any) => {
		return !!(
			obj != null &&
			(obj._isBuffer ||
				(obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)))
		);
	}

	private apiUrl = (path: string): string => {
		return `${this.config.protocol}://${this.config.host}${this.config.port ? ':' + this.config.port : ''}${
			this.config.root
		}${path}`;
	}

	private onReadyState = (req: any, transform?: any) => {
		if (req.readyState === 4) {
			if (req.status !== 200) {
				this.responseData = req.responseText;
			} else {
				if (transform) {
					this.responseData = transform(req.responseText);
				}
			}
		}
	}

	private request = (opts: any) => {
		const req = new XMLHttpRequest();
		req.onreadystatechange = () => this.onReadyState(req, opts.transform);
		req.open(opts.method || 'GET', this.apiUrl(opts.uri));

		if (opts.accept) {
			req.setRequestHeader('accept', opts.accept);
		}

		if (opts.progress) {
			req.onprogress = opts.progress;
		}

		if (opts.payload) {
			req.enctype = 'multipart/form-data';
			req.send(opts.payload);
		} else {
			req.send();
		}
	}
}
