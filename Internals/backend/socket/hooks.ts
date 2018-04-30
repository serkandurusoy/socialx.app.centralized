export const onPing = (socket: SocketIOClient.Socket) => {
	socket.on('ping', (thisSock: any) => {
		socket.emit('hey', {from: 'socialxApp'});
	});
};

export const send = (socket: SocketIOClient.Socket, data: any) => {
	socket.emit(data.event, data.args);
};
