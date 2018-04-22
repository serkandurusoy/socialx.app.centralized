import io from 'socket.io-client';
import backendConfig from '../../config/backend';

import * as hooks from './hooks';
const sock = io(backendConfig.socket_server);

export const Socket: SocketIO.Socket = () => {
	socketHooks(sock);
	return sock;
};

const socketHooks = (socket: SocketIO.Socket) => {
	hooks.onPing(socket);
};
