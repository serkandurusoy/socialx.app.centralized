import {Action} from 'redux';
import {SagaIterator} from 'redux-saga';
import {select} from 'redux-saga/effects';

// exported to make available for tests
export const selectSomething = (state: any) => state.nav.location;

// process STARTUP actions
export function* startup(action?: Action): SagaIterator {
	if (__DEV__) {
		const subObject = {a: 1, b: [1, 2, 3], c: true, circularDependency: undefined as any};
		subObject.circularDependency = subObject;
	}
	yield select(selectSomething);
	// apply on a state =>
	// yield put(action.something({location: newlocation}))
}
