import {Socket} from 'net';

const onData = (data: any, cb?: any) => {
	if (cb) cb(JSON.parse(data.toString()));
};

const onErr = () => {
	//
};

const onClose = () => {
	//
};

export default (socket: Socket, datacb?: any) => {
	socket.on('data', (buffer: any) => onData(buffer, datacb));
	socket.on('error', onErr);
	socket.on('close', onClose);
};
