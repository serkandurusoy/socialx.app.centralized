export const onPing = (socket: SocketIO.Socket) => {
	socket.on('ping', (thisSock: any) => {
		console.log('Connected to server, responding');
		socket.emit('hey', {from: 'socialxApp'});
	});
};

export const send = (socket: SocketIO.Socket, data: any) => {
	socket.emit(data.event, data.args);
};
