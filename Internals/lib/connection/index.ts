// MIGRATION: unused
import {ConnectionInfo, ConnectionType, NetInfo} from 'react-native';

export const getConnection = async (callback: (connection: ConnectionInfo | ConnectionType) => void) => {
	const connectionInfo = await NetInfo.getConnectionInfo();
	NetInfo.addEventListener('connectionChange', callback);
	callback(connectionInfo);
};
