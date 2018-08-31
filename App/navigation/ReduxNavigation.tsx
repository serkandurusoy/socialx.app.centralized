import {Root} from 'native-base';
import React from 'react';

import {ModalActivityIndicator, ModalConfirmation, OfflineOverlay} from 'components';
import AppNavigation from './AppNavigation';

// just in case you question why I took helpers out, here is the explanation:
// https://reactnavigation.org/docs/en/redux-integration.html

const ReduxNavigation: React.SFC = () => (
	<Root>
		<AppNavigation />
		<OfflineOverlay />
		<ModalActivityIndicator />
		<ModalConfirmation />
	</Root>
);

export default ReduxNavigation;
