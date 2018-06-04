import React from 'react';
import {StatusBar, View} from 'react-native';

import Amplify from 'aws-amplify';

import {awsconfig} from 'configuration';
import ReduxNavigation from '../../navigation/ReduxNavigation';

// Styles
import styles from './styles';

Amplify.configure(awsconfig);

export default () => (
	<View style={styles.applicationView}>
		<StatusBar barStyle={'light-content'} />
		<ReduxNavigation />
	</View>
);
