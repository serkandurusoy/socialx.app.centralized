import net, {Server} from 'react-native-tcp';
import ServerHooks from './hooks/serverSocket';

const randomPort = () => {
	return (Math.random() * 60536) | (0 + 5000); // 60536-65536
};

const triggerCallback = () => {
	console.log('Opened server on ' + NetServerPort);
};

export const NetServerPort = randomPort();

export const TCPServer = (): Server => {
	return net.createServer(ServerHooks).listen(NetServerPort, triggerCallback);
};
