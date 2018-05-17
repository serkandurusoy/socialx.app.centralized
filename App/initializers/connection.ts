import {ConnectionInfo, ConnectionType} from 'react-native';

export default (connection: ConnectionInfo) => {
	// @ionut TODO: display to the user that their connection is lost etc..
	if (connection.type === 'NONE' || connection.type === 'unknown') {
		// no internet
	} else {
		// internet
	}
};
