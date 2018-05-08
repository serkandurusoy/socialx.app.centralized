import { Server, Socket } from 'net';
import net from 'react-native-tcp';
import ServerHooks from './hooks/serverSocket';

const randomPort = () => {
	return (Math.random() * 60536) | (0 + 5000); // 60536-65536
};

const triggerCallback = (cb?: any) => {
	console.log('Opened server on ' + NetServerPort);
	cb();
};

export const NetServerPort = randomPort();

export const TCPServer = (hooks?: (data: any) => void, cb?: any): Server => {
	return net.createServer((serverSocket: Socket) => {
		ServerHooks(serverSocket, hooks);
	}).listen(NetServerPort, () => triggerCallback(cb));
};
