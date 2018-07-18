/// <reference types="@types/webpack-env" />
import {combineReducers} from 'redux';

import {AppUIReducers} from './AppUIReducers';
import {ConfirmationReducers} from './ConfirmationReducers';
import {CustomNavReducer, NavigationReducer} from './NavigationReducers';
import {PopupsReducers} from './PopupsReducers';

export default combineReducers({
	nav: NavigationReducer,
	popups: PopupsReducers,
	appUI: AppUIReducers,
	confirmation: ConfirmationReducers,
	customNav: CustomNavReducer,
});
