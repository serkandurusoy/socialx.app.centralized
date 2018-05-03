import {backendConfig} from 'configuration';
import io from 'socket.io-client';

import * as hooks from './hooks';
export const Socket = io(backendConfig.socket_server);

const socketHooks = (socket: SocketIOClient.Socket) => {
	hooks.onPing(socket);
};

socketHooks(Socket); // hook all events
