import {Root} from 'native-base';
import React from 'react';
import {NavigationAction, NavigationActions, NavigationNavigateAction, NavigationState} from 'react-navigation';
import {connect} from 'react-redux';

import {feedTabNavigationChanged} from 'backend/actions';
import {FeedTabs, ModalActivityIndicator, ModalConfirmation, OfflineOverlay} from 'components';
import AppNavigation from './AppNavigation';

// just in case you question why I took helpers out, here is the explanation:
// https://reactnavigation.org/docs/en/redux-integration.html

const handleNavigationChange = (
	prevState: NavigationState,
	newState: NavigationState,
	action: NavigationAction,
	feedTabNavigationAction: (routeName: string) => void,
) => {
	action = action as NavigationNavigateAction;
	// TODO: @Serkan -> maybe this should be something more general?
	if (action.type === NavigationActions.NAVIGATE && Object.values(FeedTabs).includes(action.routeName)) {
		feedTabNavigationAction(action.routeName);
	}
};

interface IWithDispatchProps {
	feedTabNavigationAction: (routeName: string) => void;
}

const ReduxNavigation: React.SFC<IWithDispatchProps> = ({feedTabNavigationAction}) => (
	<Root>
		<AppNavigation onNavigationStateChange={(...args) => handleNavigationChange(...args, feedTabNavigationAction)} />
		<OfflineOverlay />
		{/* TODO: @serkan @jake there's no prop visiblePropName on that component! */}
		<ModalActivityIndicator visiblePropName={'showActivityIndicator'} />
		<ModalConfirmation visiblePropName={'confirmActive'} />
	</Root>
);

const mapDispatchToProps = (dispatch: any) => ({
	feedTabNavigationAction: (routeName: string) => dispatch(feedTabNavigationChanged(routeName)),
});

export default connect(
	null,
	mapDispatchToProps,
)(ReduxNavigation);
