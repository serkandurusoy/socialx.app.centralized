import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

import {StartupActions} from '../../reducers/StartupReducers';
import {Props, RootContainer} from './container';

const mapDispatchToProps = (dispatch: any): Props => ({
	startup: () => dispatch(StartupActions.startup()),
});

export default connect(null, mapDispatchToProps)(RootContainer);

// appsync config
import {appsyncConfig} from 'configuration';

import AWSAppSyncClient from 'aws-appsync';
import {AUTH_TYPE} from 'aws-appsync/lib/link/auth-link';

export {Rehydrated} from 'aws-appsync-react';

import {CurrentUserSession} from 'utilities';

export const AppsyncClient = new AWSAppSyncClient({
	url: appsyncConfig.graphqlEndpoint,
	region: appsyncConfig.region,
	auth: {
		type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
		jwtToken: async () => {
			try {
				// let currentUserJwt = await CurrentUserSession();
				// currentUserJwt = currentUserJwt.getIdToken().getJwtToken();
				// return currentUserJwt;
				const idToken = await AsyncStorage.getItem('jwtToken');
				return idToken;
			} catch (ex) {
				// const idToken = await AsyncStorage.getItem('jwtToken');
				// return idToken;
				return;
			}
		},
	},
});
