import {ipfsConfig as config} from 'configuration';
import ipfsAPI from 'ipfslib';

const ipfs = new ipfsAPI({
	host: config.ipfs_server,
	port: config.ipfs_port,
	root: config.opts.root,
	protocol: config.opts.protocol,
});

export default ipfs;
