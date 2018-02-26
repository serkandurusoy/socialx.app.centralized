import React from 'react';

import * as ReactNavigation from 'react-navigation';
import {connect} from 'react-redux';
import AppNavigation from './AppNavigation';

// for react-navigation 1.0.0-beta.30
import {createReactNavigationReduxMiddleware, createReduxBoundAddListener} from 'react-navigation-redux-helpers';

const middleware: any = createReactNavigationReduxMiddleware('root', (state: any) => state.nav);
const addListener: any = createReduxBoundAddListener('root');

// end for react-navigation 1.0.0-beta.30

function ReduxNavigation(props: any) {
	const {dispatch, nav} = props;

	const navigation: any = ReactNavigation.addNavigationHelpers({
		dispatch,
		state: nav,
		addListener,
	});

	return <AppNavigation navigation={navigation} />;
}

const mapStateToProps: any = (state: any) => ({nav: state.nav});
export default connect(mapStateToProps)(ReduxNavigation);
