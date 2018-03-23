import ipfsAPI from 'ipfs-api';
import config from '../../config/ipfs';

export default ipfsAPI(config.ipfs_server, config.ipfs_port, config.opts);
