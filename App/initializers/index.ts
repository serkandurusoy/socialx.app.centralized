import {getConnection} from 'lib/connection';

import connection from './connection';

export default () => {
	// initialize connection check and connection change events
	getConnection(connection as any);
};
