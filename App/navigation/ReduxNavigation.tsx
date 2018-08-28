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
		{/* TODO: @serkan @jake there's no prop visiblePropName on that component! */}
		<ModalActivityIndicator visiblePropName={'showActivityIndicator'} />
		<ModalConfirmation visiblePropName={'confirmActive'} />
	</Root>
);

export default ReduxNavigation;
