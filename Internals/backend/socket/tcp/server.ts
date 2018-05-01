import net, {Server} from 'net';
import ServerHooks from './hooks/serverSocket';

const randomPort = () => {
	return (Math.random() * 60536) | (0 + 5000); // 60536-65536
};

const triggerCallback = () => {
	console.log('Opened server on ' + JSON.stringify(TCPServer.address()));
};

export const NetServerPort = randomPort();

export const TCPServer: Server = net.createServer(ServerHooks).listen(NetServerPort, triggerCallback);
