import {Socket} from 'net';

const onData = (dat: any) => {
	// console.log(data);
};

const onErr = () => {
	//
};

const onClose = () => {
	//
};

export default (socket: Socket) => {
	socket.on('data', onData);
	socket.on('error', onErr);
	socket.on('close', onClose);
};
