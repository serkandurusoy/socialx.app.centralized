import {all, takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';

/* ------------- Types ------------- */

import {StartupActions} from '../reducers/StartupReducers';

/* ------------- Sagas ------------- */

import {startup} from './StartupSagas';

/* ------------- API ------------- */

// none

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
	yield all([takeLatest(getType(StartupActions.startup), startup)]);
}
