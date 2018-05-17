import {ConnectionInfo, ConnectionType} from 'react-native';

export default (connection: ConnectionInfo) => {
	if (connection.type === 'NONE' || connection.type === 'unknown') {
		// no internet
	} else {
		// internet
	}
};
