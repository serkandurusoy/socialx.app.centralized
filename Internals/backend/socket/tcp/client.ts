import net, {Socket} from 'react-native-tcp';

export class TCPClient {
	private client: Socket;

	constructor(port: number, host?: string, cb?: any) {
		this.client = net.createConnection(port, host, () => {
			if (cb) {
				cb(this.client);
			}
		});
	}

	public getClient() {
		return this.client;
	}

	public emit(event: string, data: string) { // eoxic
		this.client.emit(event, data);
	}

	public write(data: string) {
		this.client.write(data);
	}

	public destroy() {
		this.client.destroy();
	}
}
