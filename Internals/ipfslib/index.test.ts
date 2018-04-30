import Ipfslib, {IProviderParams} from './index';

describe('constructs a valid ipfs-api', () => {
	it('passes', () => {
		const params: IProviderParams = {
			host: 'ipfs.infura.io',
			port: '5001',
			protocol: 'https',
		};
		const ipfs_client = new Ipfslib(params);
		expect(ipfs_client).toMatchSnapshot();
	});
});
